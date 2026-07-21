/**
 * Audit Logging Service
 */

const prisma = require("../../config/prisma");
const paginate = require("../../utils/paginate");

const createLog = async (adminId, adminEmail, action, targetId = null, targetType = null, details = {}) => {
  try {
    return await prisma.auditLog.create({
      data: {
        adminId,
        adminEmail,
        action,
        targetId,
        targetType,
        details,
      },
    });
  } catch (err) {
    console.error("❌ Failed to write audit log:", err.message);
  }
};

const getLogs = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.auditLog.count(),
  ]);

  return { logs, meta: buildMeta(total) };
};

module.exports = { createLog, getLogs };
