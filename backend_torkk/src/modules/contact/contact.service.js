/**
 * Contact — Service Layer
 */

const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const { sendEmail, emailTemplates } = require("../../services/email.service");
const { COMPANY_EMAIL } = require("../../config/env");
const paginate = require("../../utils/paginate");

// Public: Submit contact form
const submitContact = async (data) => {
  // 1. Save to DB first (always)
  const submission = await prisma.contactSubmission.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
      inquiryType: data.inquiryType || null,
    },
  });

  // 2. Send email notification (fire-and-forget)
  sendEmail({
    to: COMPANY_EMAIL,
    ...emailTemplates.contactNotification(data),
  }).catch((err) => {
    console.error("[Contact] Email notification failed:", err.message);
  });

  return { id: submission.id };
};

// Admin: List submissions
const getSubmissions = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { isRead, isResolved, search } = query;

  const where = {
    ...(isRead !== undefined && { isRead: isRead === "true" }),
    ...(isResolved !== undefined && { isResolved: isResolved === "true" }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  return { submissions, meta: buildMeta(total) };
};

const getSubmissionById = async (id) => {
  const submission = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!submission) throw new AppError("Submission not found.", 404);

  // Mark as read when viewed
  if (!submission.isRead) {
    await prisma.contactSubmission.update({
      where: { id },
      data: { isRead: true },
    });
    submission.isRead = true;
  }

  return submission;
};

const updateSubmission = async (id, data) => {
  const existing = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!existing) throw new AppError("Submission not found.", 404);

  return prisma.contactSubmission.update({
    where: { id },
    data: {
      ...(data.isRead !== undefined && { isRead: data.isRead }),
      ...(data.isResolved !== undefined && { isResolved: data.isResolved }),
    },
  });
};

const deleteSubmission = async (id) => {
  const existing = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!existing) throw new AppError("Submission not found.", 404);
  await prisma.contactSubmission.delete({ where: { id } });
  return true;
};

module.exports = {
  submitContact,
  getSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
};
