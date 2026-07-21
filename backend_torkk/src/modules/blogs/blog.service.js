/**
 * Blog — Service Layer
 */

const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const { createBaseSlug } = require("../../utils/slugify");
const paginate = require("../../utils/paginate");

// ─── Helpers ──────────────────────────────────────────────────

const generateUniqueSlug = async (title, excludeId = null) => {
  const base = createBaseSlug(title);
  let slug = base;
  let counter = 0;

  while (true) {
    const existing = await prisma.blog.findFirst({
      where: { slug, deletedAt: null },
    });
    if (!existing || existing.id === excludeId) break;
    counter++;
    slug = `${base}-${counter}`;
  }

  return slug;
};

// ─── Public: List Published Blogs ────────────────────────────

const getPublishedBlogs = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { search, category } = query;

  const where = {
    status: "PUBLISHED",
    deletedAt: null,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(category && { category: { equals: category, mode: "insensitive" } }),
  };

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      skip,
      take,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        author: true,
        category: true,
        tags: true,
        publishedAt: true,
        createdAt: true,
        metaTitle: true,
        metaDescription: true,
        canonicalUrl: true,
        ogImage: true,
        keywords: true,
      },
    }),
    prisma.blog.count({ where }),
  ]);

  return { blogs, meta: buildMeta(total) };
};

// ─── Public: Single Published Blog by Slug ────────────────────

const getPublishedBlogBySlug = async (slug) => {
  const blog = await prisma.blog.findFirst({
    where: { slug, status: "PUBLISHED", deletedAt: null },
  });

  if (!blog) throw new AppError("Blog post not found.", 404);
  return blog;
};

// ─── Admin: List All Blogs (including drafts and soft-deleted conditionally or default filter out soft-deleted) ───

const getAllBlogsAdmin = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { search, status, category, showDeleted } = query;

  const where = {
    deletedAt: showDeleted === "true" ? { not: null } : null,
    ...(status && { status }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(category && { category: { equals: category, mode: "insensitive" } }),
  };

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.blog.count({ where }),
  ]);

  return { blogs, meta: buildMeta(total) };
};

// ─── Admin: Get Single Blog by ID ─────────────────────────────

const getBlogById = async (id) => {
  const blog = await prisma.blog.findFirst({
    where: { id, deletedAt: null },
  });
  if (!blog) throw new AppError("Blog post not found.", 404);
  return blog;
};

// ─── Admin: Create Blog ───────────────────────────────────────

const createBlog = async (data) => {
  let slug = data.slug;
  if (slug) {
    const conflict = await prisma.blog.findFirst({
      where: { slug, deletedAt: null },
    });
    if (conflict) {
      throw new AppError("Slug is already in use by another blog post.", 400);
    }
  } else {
    slug = await generateUniqueSlug(data.title);
  }

  const blog = await prisma.blog.create({
    data: {
      ...data,
      slug,
      publishedAt:
        data.status === "PUBLISHED" ? data.publishedAt || new Date() : null,
    },
  });

  return blog;
};

// ─── Admin: Update Blog ───────────────────────────────────────

const updateBlog = async (id, data) => {
  const existing = await prisma.blog.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Blog post not found.", 404);

  // Custom slug update or regenerate slug if title changed
  let slug = existing.slug;
  if (data.slug && data.slug !== existing.slug) {
    const conflict = await prisma.blog.findFirst({
      where: { slug: data.slug, deletedAt: null },
    });
    if (conflict && conflict.id !== id) {
      throw new AppError("Slug is already in use by another blog post.", 400);
    }
    slug = data.slug;
  } else if (data.title && data.title !== existing.title) {
    slug = await generateUniqueSlug(data.title, id);
  }

  // Set publishedAt when publishing for the first time
  let publishedAt = existing.publishedAt;
  if (data.status === "PUBLISHED" && !existing.publishedAt) {
    publishedAt = new Date();
  }
  if (data.status === "DRAFT" || data.status === "ARCHIVED") {
    publishedAt = null;
  }

  const blog = await prisma.blog.update({
    where: { id },
    data: { ...data, slug, publishedAt },
  });

  return blog;
};

// ─── Admin: Soft Delete Blog ───────────────────────────────────

const deleteBlog = async (id) => {
  const existing = await prisma.blog.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Blog post not found.", 404);

  await prisma.blog.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return true;
};

// ─── Admin: Restore Blog ───────────────────────────────────────

const restoreBlog = async (id) => {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) throw new AppError("Blog post not found.", 404);
  if (!existing.deletedAt) throw new AppError("Blog post is not deleted.", 400);

  // Check slug conflict before restoring
  const conflict = await prisma.blog.findFirst({
    where: { slug: existing.slug, deletedAt: null },
  });
  let slug = existing.slug;
  if (conflict) {
    slug = await generateUniqueSlug(existing.title, id);
  }

  return prisma.blog.update({
    where: { id },
    data: { deletedAt: null, slug },
  });
};

// ─── Admin: Publish/Unpublish ────────────────────────────────

const togglePublishBlog = async (id, publish) => {
  const existing = await prisma.blog.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError("Blog post not found.", 404);

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      status: publish ? "PUBLISHED" : "DRAFT",
      publishedAt: publish ? existing.publishedAt || new Date() : null,
    },
  });

  return blog;
};

module.exports = {
  getPublishedBlogs,
  getPublishedBlogBySlug,
  getAllBlogsAdmin,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  restoreBlog,
  togglePublishBlog,
};
