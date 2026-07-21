/**
 * Subscription Plans — Service Layer (marketing display only, no payments)
 */

const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const paginate = require("../../utils/paginate");

// Public
const getActivePlans = async () => {
  return prisma.subscriptionPlan.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: { displayOrder: "asc" },
  });
};

// Admin
const getAllPlansAdmin = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { showDeleted } = query;

  const where = {
    deletedAt: showDeleted === "true" ? { not: null } : null,
  };

  const [plans, total] = await Promise.all([
    prisma.subscriptionPlan.findMany({ where, skip, take, orderBy: { displayOrder: "asc" } }),
    prisma.subscriptionPlan.count({ where }),
  ]);
  return { plans, meta: buildMeta(total) };
};

const getPlanById = async (id) => {
  const plan = await prisma.subscriptionPlan.findFirst({
    where: { id, deletedAt: null },
  });
  if (!plan) throw new AppError("Subscription plan not found.", 404);
  return plan;
};

const createPlan = async (data) => {
  if (!data.displayOrder) {
    const last = await prisma.subscriptionPlan.findFirst({
      where: { deletedAt: null },
      orderBy: { displayOrder: "desc" },
    });
    data.displayOrder = (last?.displayOrder || 0) + 1;
  }
  return prisma.subscriptionPlan.create({ data });
};

const updatePlan = async (id, data) => {
  const existing = await prisma.subscriptionPlan.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Subscription plan not found.", 404);
  return prisma.subscriptionPlan.update({ where: { id }, data });
};

const deletePlan = async (id) => {
  const existing = await prisma.subscriptionPlan.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Subscription plan not found.", 404);

  await prisma.subscriptionPlan.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return true;
};

const restorePlan = async (id) => {
  const existing = await prisma.subscriptionPlan.findUnique({ where: { id } });
  if (!existing) throw new AppError("Subscription plan not found.", 404);
  if (!existing.deletedAt) throw new AppError("Subscription plan is not deleted.", 400);

  return prisma.subscriptionPlan.update({
    where: { id },
    data: { deletedAt: null },
  });
};

const togglePlan = async (id, active) => {
  const existing = await prisma.subscriptionPlan.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Subscription plan not found.", 404);
  return prisma.subscriptionPlan.update({ where: { id }, data: { isActive: active } });
};

module.exports = {
  getActivePlans,
  getAllPlansAdmin,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  restorePlan,
  togglePlan,
};
