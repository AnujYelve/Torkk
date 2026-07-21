const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const subscriptionService = require("./subscription.service");
const auditService = require("../audit/audit.service");

const getActivePlans = asyncHandler(async (req, res) => {
  const plans = await subscriptionService.getActivePlans();
  return sendResponse(res, 200, "Subscription plans retrieved.", plans);
});

const getAllPlansAdmin = asyncHandler(async (req, res) => {
  const result = await subscriptionService.getAllPlansAdmin(req.query);
  return sendResponse(res, 200, "All plans retrieved.", result.plans, null, result.meta);
});

const getPlanById = asyncHandler(async (req, res) => {
  const plan = await subscriptionService.getPlanById(req.params.id);
  return sendResponse(res, 200, "Plan retrieved.", plan);
});

const createPlan = asyncHandler(async (req, res) => {
  const plan = await subscriptionService.createPlan(req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "CREATE_SUBSCRIPTION_PLAN",
    plan.id,
    "SUBSCRIPTION_PLAN",
    { name: plan.name, type: plan.type }
  );

  return sendResponse(res, 201, "Plan created.", plan);
});

const updatePlan = asyncHandler(async (req, res) => {
  const plan = await subscriptionService.updatePlan(req.params.id, req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UPDATE_SUBSCRIPTION_PLAN",
    plan.id,
    "SUBSCRIPTION_PLAN",
    req.body
  );

  return sendResponse(res, 200, "Plan updated.", plan);
});

const deletePlan = asyncHandler(async (req, res) => {
  await subscriptionService.deletePlan(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "DELETE_SUBSCRIPTION_PLAN_SOFT",
    req.params.id,
    "SUBSCRIPTION_PLAN"
  );

  return sendResponse(res, 200, "Plan deleted (soft delete).");
});

const restorePlan = asyncHandler(async (req, res) => {
  const plan = await subscriptionService.restorePlan(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "RESTORE_SUBSCRIPTION_PLAN",
    plan.id,
    "SUBSCRIPTION_PLAN"
  );

  return sendResponse(res, 200, "Plan restored successfully.", plan);
});

const activatePlan = asyncHandler(async (req, res) => {
  const plan = await subscriptionService.togglePlan(req.params.id, true);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "ACTIVATE_SUBSCRIPTION_PLAN",
    plan.id,
    "SUBSCRIPTION_PLAN"
  );

  return sendResponse(res, 200, "Plan activated.", plan);
});

const deactivatePlan = asyncHandler(async (req, res) => {
  const plan = await subscriptionService.togglePlan(req.params.id, false);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "DEACTIVATE_SUBSCRIPTION_PLAN",
    plan.id,
    "SUBSCRIPTION_PLAN"
  );

  return sendResponse(res, 200, "Plan deactivated.", plan);
});

module.exports = {
  getActivePlans,
  getAllPlansAdmin,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  restorePlan,
  activatePlan,
  deactivatePlan,
};
