/**
 * Database connection helper.
 * Tests the Prisma/PostgreSQL connection on startup.
 */

const prisma = require("./prisma");

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL (Neon)");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectToDB;