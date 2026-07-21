const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { validateUpdateSettings } = require("./settings.validator");
const ctrl = require("./settings.controller");

const router = express.Router();

// Public route to fetch settings
router.get("/", ctrl.getSettings);

module.exports = router;

// Admin routes to modify settings
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.put("/", authorize("SUPER_ADMIN", "ADMIN"), validateUpdateSettings, ctrl.updateSettings);

module.exports.adminRouter = adminRouter;
