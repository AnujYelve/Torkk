const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { authLimiter } = require("../../middlewares/rateLimiter");
const ctrl = require("./newsletter.controller");

const router = express.Router();

// Public
router.post("/subscribe", authLimiter, ctrl.validateEmail, ctrl.subscribe);
router.post("/unsubscribe", ctrl.validateEmail, ctrl.unsubscribe);

module.exports = router;

// Admin
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get("/", ctrl.getSubscribers);
adminRouter.delete("/:id", authorize("SUPER_ADMIN", "ADMIN"), ctrl.deleteSubscriber);

module.exports.adminRouter = adminRouter;
