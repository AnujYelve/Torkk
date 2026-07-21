/**
 * Admin Management — Service Layer
 * SUPER_ADMIN can manage other admin accounts.
 */

const bcrypt = require("bcrypt");
const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const { BCRYPT_ROUNDS } = require("../../config/env");
const paginate = require("../../utils/paginate");

const getAdmins = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const [admins, total] = await Promise.all([
    prisma.admin.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, name: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
    }),
    prisma.admin.count(),
  ]);
  return { admins, meta: buildMeta(total) };
};

const getAdminById = async (id) => {
  const admin = await prisma.admin.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
  });
  if (!admin) throw new AppError("Admin not found.", 404);
  return admin;
};

const createAdmin = async (data) => {
  const existing = await prisma.admin.findUnique({ where: { email: data.email.toLowerCase() } });
  if (existing) throw new AppError("An admin with this email already exists.", 409);

  const passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

  return prisma.admin.create({
    data: {
      email: data.email.toLowerCase(),
      name: data.name,
      role: data.role || "ADMIN",
      passwordHash,
      isActive: true,
    },
    select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
  });
};

const updateAdmin = async (id, data, requesterId) => {
  const existing = await prisma.admin.findUnique({ where: { id } });
  if (!existing) throw new AppError("Admin not found.", 404);

  // Cannot demote/modify own role
  if (id === requesterId && data.role && data.role !== existing.role) {
    throw new AppError("You cannot change your own role.", 403);
  }

  const updateData = {
    ...(data.name && { name: data.name }),
    ...(data.role && { role: data.role }),
    ...(data.isActive !== undefined && { isActive: data.isActive }),
  };

  if (data.password) {
    updateData.passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);
  }

  return prisma.admin.update({
    where: { id },
    data: updateData,
    select: { id: true, email: true, name: true, role: true, isActive: true, updatedAt: true },
  });
};

const deleteAdmin = async (id, requesterId) => {
  if (id === requesterId) throw new AppError("You cannot delete your own account.", 403);
  const existing = await prisma.admin.findUnique({ where: { id } });
  if (!existing) throw new AppError("Admin not found.", 404);
  await prisma.admin.delete({ where: { id } });
  return true;
};

const updateOwnProfile = async (adminId, data) => {
  const updateData = {
    ...(data.name && { name: data.name }),
  };

  if (data.email) {
    const emailExists = await prisma.admin.findFirst({
      where: { email: data.email.toLowerCase(), NOT: { id: adminId } },
    });
    if (emailExists) throw new AppError("Email already in use.", 409);
    updateData.email = data.email.toLowerCase();
  }

  return prisma.admin.update({
    where: { id: adminId },
    data: updateData,
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });
};

module.exports = { getAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin, updateOwnProfile };
