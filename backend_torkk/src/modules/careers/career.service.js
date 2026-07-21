/**
 * Careers — Service Layer
 */

const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const { createBaseSlug } = require("../../utils/slugify");
const paginate = require("../../utils/paginate");
const { sendEmail, emailTemplates } = require("../../services/email.service");
const { COMPANY_EMAIL } = require("../../config/env");

// ─── Helpers ──────────────────────────────────────────────────

const generateUniqueSlug = async (title, excludeId = null) => {
  const base = createBaseSlug(title);
  let slug = base;
  let counter = 0;

  while (true) {
    const existing = await prisma.career.findFirst({
      where: { slug, deletedAt: null },
    });
    if (!existing || existing.id === excludeId) break;
    counter++;
    slug = `${base}-${counter}`;
  }
  return slug;
};

// ─── Public ───────────────────────────────────────────────────

const getOpenCareers = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { department, location, search } = query;

  const where = {
    status: "OPEN",
    deletedAt: null,
    ...(department && { department: { equals: department, mode: "insensitive" } }),
    ...(location && { location: { contains: location, mode: "insensitive" } }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [careers, total] = await Promise.all([
    prisma.career.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        department: true,
        location: true,
        employmentType: true,
        experience: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.career.count({ where }),
  ]);

  return { careers, meta: buildMeta(total) };
};

const getCareerBySlug = async (slug) => {
  const career = await prisma.career.findFirst({
    where: { slug, status: "OPEN", deletedAt: null },
  });
  if (!career) throw new AppError("Job posting not found.", 404);
  return career;
};

// ─── Public: Submit Application ───────────────────────────────

const submitApplication = async (careerId, data, resumeUrl) => {
  const career = await prisma.career.findFirst({
    where: { id: careerId, deletedAt: null },
  });
  if (!career) throw new AppError("Job posting not found.", 404);
  if (career.status === "CLOSED") throw new AppError("This position is no longer accepting applications.", 400);

  // Check for duplicate application
  const existing = await prisma.careerApplication.findFirst({
    where: { careerId, email: data.email.toLowerCase() },
  });
  if (existing) throw new AppError("You have already applied for this position.", 409);

  const application = await prisma.careerApplication.create({
    data: {
      careerId,
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      resumeUrl: resumeUrl || null,
      coverLetter: data.coverLetter || null,
      status: "NEW",
    },
  });

  // Send notifications (fire-and-forget, don't block response)
  const emailData = { ...data, jobTitle: career.title, resumeUrl };

  sendEmail({
    to: COMPANY_EMAIL,
    ...emailTemplates.applicationNotification(emailData),
  }).catch(() => {}); // silent fail

  sendEmail({
    to: data.email,
    ...emailTemplates.applicationConfirmation({ name: data.name, jobTitle: career.title }),
  }).catch(() => {}); // silent fail

  return application;
};

// ─── Admin ────────────────────────────────────────────────────

const getAllCareersAdmin = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { status, search, showDeleted } = query;

  const where = {
    deletedAt: showDeleted === "true" ? { not: null } : null,
    ...(status && { status }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { department: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [careers, total] = await Promise.all([
    prisma.career.findMany({ where, skip, take, orderBy: { createdAt: "desc" } }),
    prisma.career.count({ where }),
  ]);

  return { careers, meta: buildMeta(total) };
};

const getCareerById = async (id) => {
  const career = await prisma.career.findFirst({
    where: { id, deletedAt: null },
  });
  if (!career) throw new AppError("Job posting not found.", 404);
  return career;
};

const createCareer = async (data) => {
  const slug = await generateUniqueSlug(data.title);
  return prisma.career.create({ data: { ...data, slug } });
};

const updateCareer = async (id, data) => {
  const existing = await prisma.career.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Job posting not found.", 404);

  let slug = existing.slug;
  if (data.title && data.title !== existing.title) {
    slug = await generateUniqueSlug(data.title, id);
  }

  return prisma.career.update({ where: { id }, data: { ...data, slug } });
};

const deleteCareer = async (id) => {
  const existing = await prisma.career.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Job posting not found.", 404);

  await prisma.career.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return true;
};

const restoreCareer = async (id) => {
  const existing = await prisma.career.findUnique({ where: { id } });
  if (!existing) throw new AppError("Job posting not found.", 404);
  if (!existing.deletedAt) throw new AppError("Job posting is not deleted.", 400);

  const conflict = await prisma.career.findFirst({
    where: { slug: existing.slug, deletedAt: null },
  });
  let slug = existing.slug;
  if (conflict) {
    slug = await generateUniqueSlug(existing.title, id);
  }

  return prisma.career.update({
    where: { id },
    data: { deletedAt: null, slug },
  });
};

const toggleCareerStatus = async (id, open) => {
  const existing = await prisma.career.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Job posting not found.", 404);
  return prisma.career.update({
    where: { id },
    data: { status: open ? "OPEN" : "CLOSED" },
  });
};

// ─── Admin: Applications ──────────────────────────────────────

const getApplications = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { status, careerId, search } = query;

  const where = {
    ...(status && { status }),
    ...(careerId && { careerId }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [applications, total] = await Promise.all([
    prisma.careerApplication.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: { career: { select: { id: true, title: true, slug: true } } },
    }),
    prisma.careerApplication.count({ where }),
  ]);

  return { applications, meta: buildMeta(total) };
};

const getApplicationById = async (id) => {
  const application = await prisma.careerApplication.findUnique({
    where: { id },
    include: { career: true },
  });
  if (!application) throw new AppError("Application not found.", 404);
  return application;
};

const updateApplicationStatus = async (id, status) => {
  const existing = await prisma.careerApplication.findUnique({ where: { id } });
  if (!existing) throw new AppError("Application not found.", 404);
  return prisma.careerApplication.update({ where: { id }, data: { status } });
};

module.exports = {
  getOpenCareers,
  getCareerBySlug,
  submitApplication,
  getAllCareersAdmin,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
  restoreCareer,
  toggleCareerStatus,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
};
