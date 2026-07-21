const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { validateUpdateHomepage } = require("./homepage.validator");
const ctrl = require("./homepage.controller");

const router = express.Router();

// Public route to fetch homepage content
router.get("/", ctrl.getHomepage);

module.exports = router;

// Admin routes to modify homepage content
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.put("/", authorize("SUPER_ADMIN", "ADMIN"), validateUpdateHomepage, ctrl.updateHomepage);

module.exports.adminRouter = adminRouter;
