/**
 * Homepage Content Service
 */

const prisma = require("../../config/prisma");

const getHomepage = async () => {
  let homepage = await prisma.homepageContent.findUnique({ where: { id: "homepage" } });
  if (!homepage) {
    homepage = await prisma.homepageContent.create({
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
  }
  return homepage;
};

const updateHomepage = async (data) => {
  return prisma.homepageContent.upsert({
    where: { id: "homepage" },
    create: { id: "homepage", ...data },
    update: data,
  });
};

module.exports = { getHomepage, updateHomepage };
