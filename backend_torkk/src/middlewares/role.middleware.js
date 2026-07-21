/**
 * Role-Based Access Control (RBAC) middleware.
 * Use after `protect` middleware.
 *
 * Usage:
 *   router.delete('/blogs/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), ctrl)
 */

const AppError = require("../utils/AppError");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return next(new AppError("Authentication required.", 401));
    }

    if (!roles.includes(req.admin.role)) {
      return next(
        new AppError(
          `Access denied. Requires one of: ${roles.join(", ")}`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { authorize };
