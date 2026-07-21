const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const auditService = require("./audit.service");

const getLogs = asyncHandler(async (req, res) => {
  const result = await auditService.getLogs(req.query);
  return sendResponse(res, 200, "Audit logs retrieved.", result.logs, null, result.meta);
});

module.exports = { getLogs };
