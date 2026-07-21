/**
 * Prisma Client singleton (Prisma 6 — standard connection via DATABASE_URL).
 * Import this everywhere instead of instantiating PrismaClient directly.
 */

const { PrismaClient } = require("@prisma/client");

const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["warn", "error"],
  });
}

const prisma = globalForPrisma.prisma;

module.exports = prisma;
