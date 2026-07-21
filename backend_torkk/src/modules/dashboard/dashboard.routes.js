/**
 * Dashboard — aggregated statistics for Admin CMS overview
 */

const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const prisma = require("../../config/prisma");
const { protect } = require("../../middlewares/auth.middleware");
const express = require("express");

const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    openCareers,
    totalApplications,
    newApplications,
    unreadContacts,
    activeSubscribers,
    publishedPress,
    activeFAQs,
    activePlans,
  ] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { status: "PUBLISHED" } }),
    prisma.blog.count({ where: { status: "DRAFT" } }),
    prisma.career.count({ where: { status: "OPEN" } }),
    prisma.careerApplication.count(),
    prisma.careerApplication.count({ where: { status: "NEW" } }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.newsletterSubscriber.count({ where: { status: "ACTIVE" } }),
    prisma.pressRelease.count({ where: { status: "PUBLISHED" } }),
    prisma.fAQ.count({ where: { isActive: true } }),
    prisma.subscriptionPlan.count({ where: { isActive: true } }),
  ]);

  return sendResponse(res, 200, "Dashboard stats retrieved.", {
    blogs: { total: totalBlogs, published: publishedBlogs, drafts: draftBlogs },
    careers: { openPositions: openCareers, totalApplications, newApplications },
    contact: { unreadMessages: unreadContacts },
    newsletter: { activeSubscribers },
    press: { publishedReleases: publishedPress },
    faqs: { activeFAQs },
    subscriptionPlans: { activePlans },
  });
});

const router = express.Router();
router.use(protect);
router.get("/stats", getDashboardStats);

module.exports = router;
