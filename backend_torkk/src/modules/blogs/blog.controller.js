const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const blogService = require("./blog.service");
const auditService = require("../audit/audit.service");

// ─── Public Controllers ───────────────────────────────────────

// GET /api/blogs
const getPublishedBlogs = asyncHandler(async (req, res) => {
  const result = await blogService.getPublishedBlogs(req.query);
  return sendResponse(res, 200, "Blogs retrieved.", result.blogs, null, result.meta);
});

// GET /api/blogs/:slug
const getPublishedBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await blogService.getPublishedBlogBySlug(req.params.slug);
  return sendResponse(res, 200, "Blog retrieved.", blog);
});

// ─── Admin Controllers ────────────────────────────────────────

// GET /api/admin/blogs
const getAllBlogsAdmin = asyncHandler(async (req, res) => {
  const result = await blogService.getAllBlogsAdmin(req.query);
  return sendResponse(res, 200, "All blogs retrieved.", result.blogs, null, result.meta);
});

// GET /api/admin/blogs/:id
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  return sendResponse(res, 200, "Blog retrieved.", blog);
});

// POST /api/admin/blogs
const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.createBlog(req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "CREATE_BLOG",
    blog.id,
    "BLOG",
    { title: blog.title, slug: blog.slug }
  );

  return sendResponse(res, 201, "Blog created.", blog);
});

// PUT /api/admin/blogs/:id
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.updateBlog(req.params.id, req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UPDATE_BLOG",
    blog.id,
    "BLOG",
    req.body
  );

  return sendResponse(res, 200, "Blog updated.", blog);
});

// DELETE /api/admin/blogs/:id
const deleteBlog = asyncHandler(async (req, res) => {
  await blogService.deleteBlog(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "DELETE_BLOG_SOFT",
    req.params.id,
    "BLOG"
  );

  return sendResponse(res, 200, "Blog deleted (soft delete).");
});

// POST /api/admin/blogs/:id/restore
const restoreBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.restoreBlog(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "RESTORE_BLOG",
    blog.id,
    "BLOG"
  );

  return sendResponse(res, 200, "Blog restored successfully.", blog);
});

// PATCH /api/admin/blogs/:id/publish
const publishBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.togglePublishBlog(req.params.id, true);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "PUBLISH_BLOG",
    blog.id,
    "BLOG"
  );

  return sendResponse(res, 200, "Blog published.", blog);
});

// PATCH /api/admin/blogs/:id/unpublish
const unpublishBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.togglePublishBlog(req.params.id, false);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UNPUBLISH_BLOG",
    blog.id,
    "BLOG"
  );

  return sendResponse(res, 200, "Blog unpublished.", blog);
});

module.exports = {
  getPublishedBlogs,
  getPublishedBlogBySlug,
  getAllBlogsAdmin,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  restoreBlog,
  publishBlog,
  unpublishBlog,
};
