const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const homepageService = require("./homepage.service");
const auditService = require("../audit/audit.service");

const getHomepage = asyncHandler(async (req, res) => {
  const homepage = await homepageService.getHomepage();
  return sendResponse(res, 200, "Homepage content retrieved.", homepage);
});

const updateHomepage = asyncHandler(async (req, res) => {
  const homepage = await homepageService.updateHomepage(req.body);

  // Write audit log
  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UPDATE_HOMEPAGE_CMS",
    "homepage",
    "HOMEPAGE_CONTENT",
    req.body
  );

  return sendResponse(res, 200, "Homepage content updated.", homepage);
});

module.exports = { getHomepage, updateHomepage };
