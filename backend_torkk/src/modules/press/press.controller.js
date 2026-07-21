const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const pressService = require("./press.service");
const auditService = require("../audit/audit.service");

const getPublishedPress = asyncHandler(async (req, res) => {
  const result = await pressService.getPublishedPress(req.query);
  return sendResponse(res, 200, "Press releases retrieved.", result.press, null, result.meta);
});

const getPublishedPressBySlug = asyncHandler(async (req, res) => {
  const press = await pressService.getPublishedPressBySlug(req.params.slug);
  return sendResponse(res, 200, "Press release retrieved.", press);
});

const getAllPressAdmin = asyncHandler(async (req, res) => {
  const result = await pressService.getAllPressAdmin(req.query);
  return sendResponse(res, 200, "All press releases retrieved.", result.press, null, result.meta);
});

const getPressById = asyncHandler(async (req, res) => {
  const press = await pressService.getPressById(req.params.id);
  return sendResponse(res, 200, "Press release retrieved.", press);
});

const createPress = asyncHandler(async (req, res) => {
  const press = await pressService.createPress(req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "CREATE_PRESS_RELEASE",
    press.id,
    "PRESS_RELEASE",
    { title: press.title, slug: press.slug }
  );

  return sendResponse(res, 201, "Press release created.", press);
});

const updatePress = asyncHandler(async (req, res) => {
  const press = await pressService.updatePress(req.params.id, req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UPDATE_PRESS_RELEASE",
    press.id,
    "PRESS_RELEASE",
    req.body
  );

  return sendResponse(res, 200, "Press release updated.", press);
});

const deletePress = asyncHandler(async (req, res) => {
  await pressService.deletePress(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "DELETE_PRESS_RELEASE_SOFT",
    req.params.id,
    "PRESS_RELEASE"
  );

  return sendResponse(res, 200, "Press release deleted (soft delete).");
});

const restorePress = asyncHandler(async (req, res) => {
  const press = await pressService.restorePress(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "RESTORE_PRESS_RELEASE",
    press.id,
    "PRESS_RELEASE"
  );

  return sendResponse(res, 200, "Press release restored successfully.", press);
});

const publishPress = asyncHandler(async (req, res) => {
  const press = await pressService.togglePublishPress(req.params.id, true);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "PUBLISH_PRESS_RELEASE",
    press.id,
    "PRESS_RELEASE"
  );

  return sendResponse(res, 200, "Press release published.", press);
});

const unpublishPress = asyncHandler(async (req, res) => {
  const press = await pressService.togglePublishPress(req.params.id, false);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UNPUBLISH_PRESS_RELEASE",
    press.id,
    "PRESS_RELEASE"
  );

  return sendResponse(res, 200, "Press release unpublished.", press);
});

module.exports = {
  getPublishedPress,
  getPublishedPressBySlug,
  getAllPressAdmin,
  getPressById,
  createPress,
  updatePress,
  deletePress,
  restorePress,
  publishPress,
  unpublishPress,
};
