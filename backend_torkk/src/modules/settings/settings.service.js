/**
 * Site Settings Service
 */

const prisma = require("../../config/prisma");

const getSettings = async () => {
  let settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  if (!settings) {
    settings = await prisma.siteSettings.create({
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
  }
  return settings;
};

const updateSettings = async (data) => {
  return prisma.siteSettings.upsert({
    where: { id: "global" },
    create: { id: "global", ...data },
    update: data,
  });
};

module.exports = { getSettings, updateSettings };
