const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const settingsService = require("./settings.service");
const auditService = require("../audit/audit.service");

const getSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getSettings();
  return sendResponse(res, 200, "Site settings retrieved.", settings);
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettings(req.body);

  // Write audit log
  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UPDATE_SITE_SETTINGS",
    "global",
    "SITE_SETTINGS",
    req.body
  );

  return sendResponse(res, 200, "Site settings updated.", settings);
});

module.exports = { getSettings, updateSettings };
