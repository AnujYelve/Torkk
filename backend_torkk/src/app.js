/**
 * Torkkk Marketing Backend — Express Application
 * PostgreSQL + Prisma | Node.js + Express
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const { generalLimiter } = require("./middlewares/rateLimiter");
const { CORS_ORIGIN, NODE_ENV } = require("./config/env");

// ─── Route Imports ────────────────────────────────────────────

// Public routes
const blogPublicRoutes = require("./modules/blogs/blog.routes");
const careerPublicRoutes = require("./modules/careers/career.routes");
const contactRoutes = require("./modules/contact/contact.routes");
const pressPublicRoutes = require("./modules/press/press.routes");
const faqPublicRoutes = require("./modules/faqs/faq.routes");
const newsletterRoutes = require("./modules/newsletter/newsletter.routes");
const subscriptionPublicRoutes = require("./modules/subscriptions/subscription.routes");
const settingsPublicRoutes = require("./modules/settings/settings.routes");
const homepagePublicRoutes = require("./modules/homepage/homepage.routes");

// Admin routes
const authRoutes = require("./modules/auth/auth.routes");
const { adminRouter: blogAdminRoutes } = require("./modules/blogs/blog.routes");
const { adminRouter: careerAdminRoutes } = require("./modules/careers/career.routes");
const { adminRouter: contactAdminRoutes } = require("./modules/contact/contact.routes");
const { adminRouter: pressAdminRoutes } = require("./modules/press/press.routes");
const { adminRouter: faqAdminRoutes } = require("./modules/faqs/faq.routes");
const { adminRouter: newsletterAdminRoutes } = require("./modules/newsletter/newsletter.routes");
const { adminRouter: subscriptionAdminRoutes } = require("./modules/subscriptions/subscription.routes");
const { adminRouter: settingsAdminRoutes } = require("./modules/settings/settings.routes");
const { adminRouter: homepageAdminRoutes } = require("./modules/homepage/homepage.routes");
const adminManagementRoutes = require("./modules/admins/admin.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const auditRoutes = require("./modules/audit/audit.routes");

// Error handling
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// ─── App Initialization ───────────────────────────────────────

const app = express();

// Trust proxy for rate limiting (needed behind Railway, Heroku, Vercel, Cloudflare, etc.)
app.set("trust proxy", 1);

// ─── Security Middleware ──────────────────────────────────────

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

const allowedOrigins = CORS_ORIGIN.split(",").map(o => o.trim().replace(/\/$/, ""));
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if explicitly allowed or wildcard is set
    if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      return callback(null, true);
    }
    
    // Dynamically allow vercel.app, railway.app, and localhost subdomains
    try {
      const parsedOrigin = new URL(origin);
      const hostname = parsedOrigin.hostname;
      
      if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.endsWith(".vercel.app") ||
        hostname.endsWith(".railway.app")
      ) {
        return callback(null, true);
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
    
    callback(new Error(`Origin ${origin} not allowed by CORS.`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ─── Request Parsing ──────────────────────────────────────────

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ─── Logging ──────────────────────────────────────────────────

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ─── Rate Limiting ────────────────────────────────────────────

app.use("/api", generalLimiter);

// ─── Static Files (uploads) ───────────────────────────────────

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ─── Health Check ─────────────────────────────────────────────

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Torkkk API is running.",
    data: { version: "2.0.0", db: "PostgreSQL", timestamp: new Date().toISOString() },
  });
});

// ─── Public API Routes ────────────────────────────────────────

app.use("/api/blogs", blogPublicRoutes);
app.use("/api/careers", careerPublicRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/press", pressPublicRoutes);
app.use("/api/faqs", faqPublicRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/subscriptions", subscriptionPublicRoutes);
app.use("/api/settings", settingsPublicRoutes);
app.use("/api/homepage", homepagePublicRoutes);

// ─── Auth Routes (Admin Login) ────────────────────────────────

app.use("/api/admin/auth", authRoutes);
app.use("/api/auth", authRoutes);

// ─── Admin API Routes (protected) ────────────────────────────

app.use("/api/admin/blogs", blogAdminRoutes);
app.use("/api/admin/careers", careerAdminRoutes);
app.use("/api/admin/contact", contactAdminRoutes);
app.use("/api/admin/press", pressAdminRoutes);
app.use("/api/admin/faqs", faqAdminRoutes);
app.use("/api/admin/newsletter", newsletterAdminRoutes);
app.use("/api/admin/subscriptions", subscriptionAdminRoutes);
app.use("/api/admin/admins", adminManagementRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin/settings", settingsAdminRoutes);
app.use("/api/admin/homepage", homepageAdminRoutes);
app.use("/api/admin/audit", auditRoutes);

// ─── 404 + Global Error Handler ──────────────────────────────

app.use(notFound);
app.use(errorHandler);

module.exports = app;