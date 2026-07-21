/**
 * Torkkk — Database Seed Script
 * ─────────────────────────────────────────────────────────────
 * Creates the initial SUPER_ADMIN account and default CMS contents.
 * Run: node prisma/seed.js
 *
 * Credentials are read from environment variables:
 *   SEED_ADMIN_EMAIL
 *   SEED_ADMIN_PASSWORD
 *   SEED_ADMIN_NAME
 *
 * NEVER hardcode credentials here.
 */

require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME || "Super Admin";
  const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;

  if (!email || !password) {
    console.error("❌ Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  console.log(`\n🌱 Seeding Torkkk database...`);

  // ─── SUPER_ADMIN ─────────────────────────────────────────────

  const existing = await prisma.admin.findUnique({ where: { email } });

  if (existing) {
    console.log(`⚠️  Admin already exists: ${email} (role: ${existing.role})`);
    console.log("   Skipping creation. To reset, delete the account manually.");
  } else {
    const passwordHash = await bcrypt.hash(password, rounds);

    const admin = await prisma.admin.create({
      data: {
        email,
        name,
        role: "SUPER_ADMIN",
        passwordHash,
        isActive: true,
      },
    });

    console.log(`✅ SUPER_ADMIN created:`);
    console.log(`   ID:    ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name:  ${admin.name}`);
    console.log(`   Role:  ${admin.role}`);
  }

  // ─── Site Settings Singleton ──────────────────────────────────

  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        id: "global",
        companyName: "Torkkk",
        supportEmail: "support@torkkk.com",
        supportPhone: "+2348000TORKKK",
        address: "123 Mobility Way, Lekki, Lagos, Nigeria",
        socialFacebook: "https://facebook.com/torkkk",
        socialTwitter: "https://twitter.com/torkkk",
        socialInstagram: "https://instagram.com/torkkk",
        socialLinkedin: "https://linkedin.com/company/torkkk",
        appStoreIos: "https://apps.apple.com/app/torkkk",
        playStoreAndroid: "https://play.google.com/store/apps/details?id=com.torkkk",
        logoUrlLight: "/assets/logo-light.png",
        logoUrlDark: "/assets/logo-dark.png",
        faviconUrl: "/favicon.ico",
        customJson: {},
      },
    });
    console.log("✅ Default Site Settings seeded.");
  }

  // ─── Homepage Content Singleton ───────────────────────────────

  const homepageCount = await prisma.homepageContent.count();
  if (homepageCount === 0) {
    await prisma.homepageContent.create({
      data: {
        id: "homepage",
        heroTitle: "Move Smarter with Torkkk",
        heroSubtitle: "Reliable, safe and affordable rides at your fingertips.",
        heroCtaText: "Download Now",
        heroCtaLink: "#download",
        bannerImageUrl: "/assets/hero-banner.jpg",
        features: [
          { icon: "ShieldCheck", title: "Safety First", description: "All drivers are verified and rides are monitored in real-time." },
          { icon: "Zap", title: "Fast Booking", description: "Get a ride in minutes with our advanced dispatch system." },
          { icon: "Tag", title: "Affordable Pricing", description: "No hidden charges, clear upfront pricing on every ride." }
        ],
      },
    });
    console.log("✅ Default Homepage Content seeded.");
  }

  // ─── Sample FAQ Data ──────────────────────────────────────────

  const faqCount = await prisma.fAQ.count();
  if (faqCount === 0) {
    await prisma.fAQ.createMany({
      data: [
        {
          question: "What is Torkkk?",
          answer: "Torkkk is a modern ride-booking platform designed to make transportation safe, affordable, and accessible.",
          category: "General",
          displayOrder: 1,
          isActive: true,
        },
        {
          question: "How do I download the Torkkk app?",
          answer: "The Torkkk app is available on both iOS (App Store) and Android (Google Play Store). Search for 'Torkkk' to download.",
          category: "General",
          displayOrder: 2,
          isActive: true,
        },
        {
          question: "Is Torkkk available in my city?",
          answer: "Torkkk is expanding rapidly. Check our app or website for the latest list of available cities.",
          category: "General",
          displayOrder: 3,
          isActive: true,
        },
        {
          question: "How does Torkkk ensure passenger safety?",
          answer: "We verify all drivers through background checks, provide in-app emergency features, and monitor rides in real-time for passenger safety.",
          category: "Safety",
          displayOrder: 4,
          isActive: true,
        },
      ],
    });
    console.log("✅ Sample FAQs seeded.");
  }

  // ─── Sample Subscription Plans ────────────────────────────────

  const planCount = await prisma.subscriptionPlan.count();
  if (planCount === 0) {
    await prisma.subscriptionPlan.createMany({
      data: [
        {
          name: "Basic",
          type: "DRIVER",
          displayPrice: "₦5,000/month",
          description: "Perfect for new drivers getting started on the platform.",
          features: ["Up to 50 rides/month", "Standard support", "Basic analytics"],
          displayOrder: 1,
          isActive: true,
        },
        {
          name: "Professional",
          type: "DRIVER",
          displayPrice: "₦12,000/month",
          description: "For established drivers looking to grow their earnings.",
          features: ["Unlimited rides", "Priority support", "Advanced analytics", "Promotional tools"],
          displayOrder: 2,
          isActive: true,
        },
        {
          name: "Student",
          type: "STUDENT",
          displayPrice: "₦3,000/month",
          description: "Affordable rides designed for students and campus commuters.",
          features: ["Discounted rates", "Campus-friendly routes", "Student verification benefits"],
          displayOrder: 3,
          isActive: true,
        },
      ],
    });
    console.log("✅ Sample subscription plans seeded.");
  }

  console.log("\n🎉 Seeding complete!\n");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
