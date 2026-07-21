const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const ctrl = require("./admin.controller");
const Joi = require("joi");
const AppError = require("../../utils/AppError");

const adminRouter = express.Router();
adminRouter.use(protect);

// Own profile
adminRouter.patch("/profile", ctrl.updateOwnProfile);

// SUPER_ADMIN only: manage other admins
adminRouter.get("/", authorize("SUPER_ADMIN"), ctrl.getAdmins);
adminRouter.get("/:id", authorize("SUPER_ADMIN"), ctrl.getAdminById);
adminRouter.post("/", authorize("SUPER_ADMIN"), (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(100).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("ADMIN", "EDITOR").default("ADMIN"),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return next(new AppError("Validation failed.", 422, error.details.map(d => d.message)));
  next();
}, ctrl.createAdmin);
adminRouter.put("/:id", authorize("SUPER_ADMIN"), ctrl.updateAdmin);
adminRouter.delete("/:id", authorize("SUPER_ADMIN"), ctrl.deleteAdmin);

module.exports = adminRouter;
