/**
 * Reusable pagination helper.
 * Returns { skip, take, page, limit, meta } from query params.
 */

const paginate = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;

  const buildMeta = (total) => ({
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  });

  return { skip, take: limit, page, limit, buildMeta };
};

module.exports = paginate;
