const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { validateCreatePlan, validateUpdatePlan } = require("./subscription.validator");
const ctrl = require("./subscription.controller");

const router = express.Router();

// Public
router.get("/plans", ctrl.getActivePlans);

module.exports = router;

// Admin
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get("/plans", ctrl.getAllPlansAdmin);
adminRouter.get("/plans/:id", ctrl.getPlanById);
adminRouter.post("/plans", authorize("SUPER_ADMIN", "ADMIN"), validateCreatePlan, ctrl.createPlan);
adminRouter.put("/plans/:id", authorize("SUPER_ADMIN", "ADMIN"), validateUpdatePlan, ctrl.updatePlan);
adminRouter.delete("/plans/:id", authorize("SUPER_ADMIN"), ctrl.deletePlan);
adminRouter.post("/plans/:id/restore", authorize("SUPER_ADMIN"), ctrl.restorePlan);
adminRouter.patch("/plans/:id/activate", authorize("SUPER_ADMIN", "ADMIN"), ctrl.activatePlan);
adminRouter.patch("/plans/:id/deactivate", authorize("SUPER_ADMIN", "ADMIN"), ctrl.deactivatePlan);

module.exports.adminRouter = adminRouter;
