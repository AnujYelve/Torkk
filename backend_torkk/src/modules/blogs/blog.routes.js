/**
 * Blog Routes
 *
 * Public:
 *   GET /api/blogs             — published blogs (paginated)
 *   GET /api/blogs/:slug       — single published blog
 *
 * Admin (protected):
 *   GET    /api/admin/blogs          — all blogs incl. drafts
 *   GET    /api/admin/blogs/:id      — single blog
 *   POST   /api/admin/blogs          — create
 *   PUT    /api/admin/blogs/:id      — update
 *   DELETE /api/admin/blogs/:id      — delete
 *   POST   /api/admin/blogs/:id/restore — restore soft deleted blog
 *   PATCH  /api/admin/blogs/:id/publish
 *   PATCH  /api/admin/blogs/:id/unpublish
 */

const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { validateCreateBlog, validateUpdateBlog } = require("./blog.validator");
const ctrl = require("./blog.controller");

const router = express.Router();

// ─── Public ───────────────────────────────────────────────────
router.get("/", ctrl.getPublishedBlogs);
router.get("/:slug", ctrl.getPublishedBlogBySlug);

module.exports = router;

// Admin router (mounted separately at /api/admin/blogs)
const adminRouter = express.Router();
adminRouter.use(protect);

adminRouter.get("/", ctrl.getAllBlogsAdmin);
adminRouter.get("/:id", ctrl.getBlogById);
adminRouter.post("/", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), validateCreateBlog, ctrl.createBlog);
adminRouter.put("/:id", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), validateUpdateBlog, ctrl.updateBlog);
adminRouter.delete("/:id", authorize("SUPER_ADMIN", "ADMIN"), ctrl.deleteBlog);
adminRouter.post("/:id/restore", authorize("SUPER_ADMIN", "ADMIN"), ctrl.restoreBlog);
adminRouter.patch("/:id/publish", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), ctrl.publishBlog);
adminRouter.patch("/:id/unpublish", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), ctrl.unpublishBlog);

module.exports.adminRouter = adminRouter;
