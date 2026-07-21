/**
 * Newsletter — Service Layer
 */

const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const paginate = require("../../utils/paginate");

const subscribe = async (email) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Check for existing subscriber
  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email: normalizedEmail },
  });

  if (existing) {
    if (existing.status === "ACTIVE") {
      throw new AppError("This email is already subscribed.", 409);
    }
    // Re-activate if previously unsubscribed
    return prisma.newsletterSubscriber.update({
      where: { email: normalizedEmail },
      data: { status: "ACTIVE" },
    });
  }

  return prisma.newsletterSubscriber.create({
    data: { email: normalizedEmail },
  });
};

const unsubscribe = async (email) => {
  const normalizedEmail = email.toLowerCase().trim();
  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email: normalizedEmail },
  });

  if (!existing) throw new AppError("Email not found.", 404);
  if (existing.status === "UNSUBSCRIBED") throw new AppError("Email is already unsubscribed.", 400);

  return prisma.newsletterSubscriber.update({
    where: { email: normalizedEmail },
    data: { status: "UNSUBSCRIBED" },
  });
};

const getSubscribers = async (query) => {
  const { skip, take, buildMeta } = paginate(query);
  const { status, search } = query;

  const where = {
    ...(status && { status }),
    ...(search && { email: { contains: search, mode: "insensitive" } }),
  };

  const [subscribers, total] = await Promise.all([
    prisma.newsletterSubscriber.findMany({ where, skip, take, orderBy: { createdAt: "desc" } }),
    prisma.newsletterSubscriber.count({ where }),
  ]);

  return { subscribers, meta: buildMeta(total) };
};

const deleteSubscriber = async (id) => {
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { id } });
  if (!existing) throw new AppError("Subscriber not found.", 404);
  await prisma.newsletterSubscriber.delete({ where: { id } });
  return true;
};

module.exports = { subscribe, unsubscribe, getSubscribers, deleteSubscriber };
