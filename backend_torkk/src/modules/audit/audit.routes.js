const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const ctrl = require("./audit.controller");

const router = express.Router();

router.use(protect);
router.get("/audit-logs", authorize("SUPER_ADMIN", "ADMIN"), ctrl.getLogs);

module.exports = router;
