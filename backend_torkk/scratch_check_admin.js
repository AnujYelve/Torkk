const prisma = require("./src/config/prisma");
const bcrypt = require("bcrypt");

async function main() {
  const admins = await prisma.admin.findMany();
  console.log("Found admins in DB:", admins);
  
  // Create or reset superadmin if needed
  const email = "superadmin@torkkk.com";
  const password = "ChangeMe@2026!";
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, isActive: true },
    create: {
      email,
      name: "Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("Super admin synced successfully:", admin);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
