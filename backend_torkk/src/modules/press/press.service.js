/**
 * Press & Media — Service Layer
 */

const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const { createBaseSlug } = require("../../utils/slugify");
const paginate = require("../../utils/paginate");

const generateUniqueSlug = async (title, excludeId = null) => {
  const base = createBaseSlug(title);
  let slug = base;
  let counter = 0;
  while (true) {
    const existing = await prisma.pressRelease.findFirst({
      where: { slug, deletedAt: null },
    });
    if (!existing || existing.id === excludeId) break;
    counter++;
    slug = `${base}-${counter}`;
  }
  return slug;
};

// Public
const getPublishedPress = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { type, search } = query;

  const where = {
    status: "PUBLISHED",
    deletedAt: null,
    ...(type && { type: { equals: type, mode: "insensitive" } }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [press, total] = await Promise.all([
    prisma.pressRelease.findMany({
      where,
      skip,
      take,
      orderBy: { publicationDate: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        coverImage: true,
        publicationDate: true,
        externalLink: true,
        type: true,
        metaTitle: true,
        metaDescription: true,
        canonicalUrl: true,
        ogImage: true,
        keywords: true,
      },
    }),
    prisma.pressRelease.count({ where }),
  ]);

  return { press, meta: buildMeta(total) };
};

const getPublishedPressBySlug = async (slug) => {
  const press = await prisma.pressRelease.findFirst({
    where: { slug, status: "PUBLISHED", deletedAt: null },
  });
  if (!press) throw new AppError("Press release not found.", 404);
  return press;
};

// Admin
const getAllPressAdmin = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { status, type, search, showDeleted } = query;
  const where = {
    deletedAt: showDeleted === "true" ? { not: null } : null,
    ...(status && { status }),
    ...(type && { type: { equals: type, mode: "insensitive" } }),
    ...(search && { title: { contains: search, mode: "insensitive" } }),
  };
  const [press, total] = await Promise.all([
    prisma.pressRelease.findMany({ where, skip, take, orderBy: { createdAt: "desc" } }),
    prisma.pressRelease.count({ where }),
  ]);
  return { press, meta: buildMeta(total) };
};

const getPressById = async (id) => {
  const press = await prisma.pressRelease.findFirst({
    where: { id, deletedAt: null },
  });
  if (!press) throw new AppError("Press release not found.", 404);
  return press;
};

const createPress = async (data) => {
  let slug = data.slug;
  if (slug) {
    const conflict = await prisma.pressRelease.findFirst({
      where: { slug, deletedAt: null },
    });
    if (conflict) {
      throw new AppError("Slug is already in use by another press release.", 400);
    }
  } else {
    slug = await generateUniqueSlug(data.title);
  }

  return prisma.pressRelease.create({
    data: {
      ...data,
      slug,
      publicationDate: data.publicationDate ? new Date(data.publicationDate) : null,
    },
  });
};

const updatePress = async (id, data) => {
  const existing = await prisma.pressRelease.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Press release not found.", 404);

  let slug = existing.slug;
  if (data.slug && data.slug !== existing.slug) {
    const conflict = await prisma.pressRelease.findFirst({
      where: { slug: data.slug, deletedAt: null },
    });
    if (conflict && conflict.id !== id) {
      throw new AppError("Slug is already in use by another press release.", 400);
    }
    slug = data.slug;
  } else if (data.title && data.title !== existing.title) {
    slug = await generateUniqueSlug(data.title, id);
  }

  return prisma.pressRelease.update({
    where: { id },
    data: {
      ...data,
      slug,
      publicationDate: data.publicationDate ? new Date(data.publicationDate) : existing.publicationDate,
    },
  });
};

const deletePress = async (id) => {
  const existing = await prisma.pressRelease.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Press release not found.", 404);

  await prisma.pressRelease.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return true;
};

const restorePress = async (id) => {
  const existing = await prisma.pressRelease.findUnique({ where: { id } });
  if (!existing) throw new AppError("Press release not found.", 404);
  if (!existing.deletedAt) throw new AppError("Press release is not deleted.", 400);

  const conflict = await prisma.pressRelease.findFirst({
    where: { slug: existing.slug, deletedAt: null },
  });
  let slug = existing.slug;
  if (conflict) {
    slug = await generateUniqueSlug(existing.title, id);
  }

  return prisma.pressRelease.update({
    where: { id },
    data: { deletedAt: null, slug },
  });
};

const togglePublishPress = async (id, publish) => {
  const existing = await prisma.pressRelease.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Press release not found.", 404);
  return prisma.pressRelease.update({
    where: { id },
    data: {
      status: publish ? "PUBLISHED" : "DRAFT",
      publicationDate: publish ? existing.publicationDate || new Date() : existing.publicationDate,
    },
  });
};

module.exports = {
  getPublishedPress,
  getPublishedPressBySlug,
  getAllPressAdmin,
  getPressById,
  createPress,
  updatePress,
  deletePress,
  restorePress,
  togglePublishPress,
};
