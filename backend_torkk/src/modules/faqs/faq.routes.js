const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { validateCreateFAQ, validateUpdateFAQ, validateReorder } = require("./faq.validator");
const ctrl = require("./faq.controller");

const router = express.Router();

// Public
router.get("/", ctrl.getActiveFAQs);

module.exports = router;

// Admin
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get("/", ctrl.getAllFAQsAdmin);
adminRouter.get("/:id", ctrl.getFAQById);
adminRouter.post("/", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), validateCreateFAQ, ctrl.createFAQ);
adminRouter.put("/:id", authorize("SUPER_ADMIN", "ADMIN", "EDITOR"), validateUpdateFAQ, ctrl.updateFAQ);
adminRouter.delete("/:id", authorize("SUPER_ADMIN", "ADMIN"), ctrl.deleteFAQ);
adminRouter.post("/:id/restore", authorize("SUPER_ADMIN", "ADMIN"), ctrl.restoreFAQ);
adminRouter.post("/reorder", authorize("SUPER_ADMIN", "ADMIN"), validateReorder, ctrl.reorderFAQs);
adminRouter.patch("/:id/activate", authorize("SUPER_ADMIN", "ADMIN"), ctrl.activateFAQ);
adminRouter.patch("/:id/deactivate", authorize("SUPER_ADMIN", "ADMIN"), ctrl.deactivateFAQ);

module.exports.adminRouter = adminRouter;
