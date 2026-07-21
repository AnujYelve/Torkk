/**
 * FAQ — Service Layer
 */

const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const paginate = require("../../utils/paginate");

// Public
const getActiveFAQs = async (query) => {
  const { category } = query;
  const where = {
    isActive: true,
    deletedAt: null,
    ...(category && { category: { equals: category, mode: "insensitive" } }),
  };

  const faqs = await prisma.fAQ.findMany({
    where,
    orderBy: { displayOrder: "asc" },
    select: { id: true, question: true, answer: true, category: true, displayOrder: true },
  });

  return faqs;
};

// Admin
const getAllFAQsAdmin = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { category, isActive, showDeleted } = query;

  const where = {
    deletedAt: showDeleted === "true" ? { not: null } : null,
    ...(category && { category: { equals: category, mode: "insensitive" } }),
    ...(isActive !== undefined && { isActive: isActive === "true" }),
  };

  const [faqs, total] = await Promise.all([
    prisma.fAQ.findMany({ where, skip, take, orderBy: { displayOrder: "asc" } }),
    prisma.fAQ.count({ where }),
  ]);

  return { faqs, meta: buildMeta(total) };
};

const getFAQById = async (id) => {
  const faq = await prisma.fAQ.findFirst({
    where: { id, deletedAt: null },
  });
  if (!faq) throw new AppError("FAQ not found.", 404);
  return faq;
};

const createFAQ = async (data) => {
  // Default displayOrder = max + 1
  if (!data.displayOrder) {
    const last = await prisma.fAQ.findFirst({
      where: { deletedAt: null },
      orderBy: { displayOrder: "desc" },
    });
    data.displayOrder = (last?.displayOrder || 0) + 1;
  }
  return prisma.fAQ.create({ data });
};

const updateFAQ = async (id, data) => {
  const existing = await prisma.fAQ.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("FAQ not found.", 404);
  return prisma.fAQ.update({ where: { id }, data });
};

const deleteFAQ = async (id) => {
  const existing = await prisma.fAQ.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("FAQ not found.", 404);

  await prisma.fAQ.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return true;
};

const restoreFAQ = async (id) => {
  const existing = await prisma.fAQ.findUnique({ where: { id } });
  if (!existing) throw new AppError("FAQ not found.", 404);
  if (!existing.deletedAt) throw new AppError("FAQ is not deleted.", 400);

  return prisma.fAQ.update({
    where: { id },
    data: { deletedAt: null },
  });
};

const reorderFAQs = async (orderedIds) => {
  // orderedIds: array of { id, displayOrder }
  const updates = orderedIds.map(({ id, displayOrder }) =>
    prisma.fAQ.update({
      where: { id },
      data: { displayOrder },
    })
  );
  await Promise.all(updates);
  return true;
};

const toggleFAQ = async (id, active) => {
  const existing = await prisma.fAQ.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("FAQ not found.", 404);
  return prisma.fAQ.update({ where: { id }, data: { isActive: active } });
};

module.exports = {
  getActiveFAQs,
  getAllFAQsAdmin,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  restoreFAQ,
  reorderFAQs,
  toggleFAQ,
};
