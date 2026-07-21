const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { authLimiter } = require("../../middlewares/rateLimiter");
const { validateContact } = require("./contact.validator");
const ctrl = require("./contact.controller");

const router = express.Router();

// Public
router.post("/", authLimiter, validateContact, ctrl.submitContact);

module.exports = router;

// Admin router
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get("/", ctrl.getSubmissions);
adminRouter.get("/:id", ctrl.getSubmissionById);
adminRouter.patch("/:id", ctrl.updateSubmission);
adminRouter.delete("/:id", authorize("SUPER_ADMIN", "ADMIN"), ctrl.deleteSubmission);

module.exports.adminRouter = adminRouter;
