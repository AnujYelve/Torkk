const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const adminService = require("./admin.service");

const getAdmins = asyncHandler(async (req, res) => {
  const result = await adminService.getAdmins(req.query);
  return sendResponse(res, 200, "Admins retrieved.", result.admins, null, result.meta);
});

const getAdminById = asyncHandler(async (req, res) => {
  const admin = await adminService.getAdminById(req.params.id);
  return sendResponse(res, 200, "Admin retrieved.", admin);
});

const createAdmin = asyncHandler(async (req, res) => {
  const admin = await adminService.createAdmin(req.body);
  return sendResponse(res, 201, "Admin created.", admin);
});

const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await adminService.updateAdmin(req.params.id, req.body, req.admin.id);
  return sendResponse(res, 200, "Admin updated.", admin);
});

const deleteAdmin = asyncHandler(async (req, res) => {
  await adminService.deleteAdmin(req.params.id, req.admin.id);
  return sendResponse(res, 200, "Admin deleted.");
});

const updateOwnProfile = asyncHandler(async (req, res) => {
  const admin = await adminService.updateOwnProfile(req.admin.id, req.body);
  return sendResponse(res, 200, "Profile updated.", admin);
});

module.exports = { getAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin, updateOwnProfile };
