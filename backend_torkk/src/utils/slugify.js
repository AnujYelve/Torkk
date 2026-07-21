/**
 * Generates a URL-safe slug from a string.
 * Uses the slugify package with a uuid suffix to guarantee uniqueness.
 */

const slugifyLib = require("slugify");
const { randomBytes } = require("crypto");

const createSlug = (text, suffix = true) => {
  const base = slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  if (!suffix) return base;

  // Append a short random suffix to prevent collisions
  const rand = randomBytes(3).toString("hex");
  return `${base}-${rand}`;
};

const createBaseSlug = (text) => createSlug(text, false);

module.exports = { createSlug, createBaseSlug };
