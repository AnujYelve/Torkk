const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { validateCreatePress, validateUpdatePress } = require("./press.validator");
const ctrl = require("./press.controller");

const router = express.Router();

// Public
router.get("/", ctrl.getPublishedPress);
router.get("/:slug", ctrl.getPublishedPressBySlug);

module.exports = router;

// Admin
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get("/", ctrl.getAllPressAdmin);
adminRouter.get("/:id", ctrl.getPressById);
adminRouter.post("/", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), validateCreatePress, ctrl.createPress);
adminRouter.put("/:id", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), validateUpdatePress, ctrl.updatePress);
adminRouter.delete("/:id", authorize("SUPER_ADMIN", "ADMIN"), ctrl.deletePress);
adminRouter.post("/:id/restore", authorize("SUPER_ADMIN", "ADMIN"), ctrl.restorePress);
adminRouter.patch("/:id/publish", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), ctrl.publishPress);
adminRouter.patch("/:id/unpublish", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), ctrl.unpublishPress);

module.exports.adminRouter = adminRouter;
