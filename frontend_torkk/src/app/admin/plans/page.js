"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Star,
  Zap,
} from "lucide-react";
import { subscriptionService } from "../../../services/api";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import EmptyState from "../../../components/ui/EmptyState";
import Modal from "../../../components/ui/Modal";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "DRIVER",
    displayPrice: "",
    description: "",
    features: [],
    isActive: true,
  });

  useEffect(() => {
    fetchPlans();
  }, [showDeleted]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subscriptionService.getAdminPlans({ showDeleted });
      setPlans(data || []);
    } catch (err) {
      setError(err.message || "Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      type: "DRIVER",
      displayPrice: "",
      description: "",
      features: ["0% Fare Commission", "Instant Weekly Payouts", "24/7 Priority SOS Support"],
      isActive: true,
    });
    setFeatureInput("");
    setModalOpen(true);
  };

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name || "",
      type: plan.type || "DRIVER",
      displayPrice: plan.displayPrice || "",
      description: plan.description || "",
      features: plan.features || [],
      isActive: plan.isActive ?? true,
    });
    setFeatureInput("");
    setModalOpen(true);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData({
      ...formData,
      features: [...formData.features, featureInput.trim()],
    });
    setFeatureInput("");
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = { ...formData };
      if (editingPlan) {
        await subscriptionService.updatePlan(editingPlan.id, payload);
      } else {
        await subscriptionService.createPlan(payload);
      }
      setModalOpen(false);
      fetchPlans();
    } catch (err) {
      alert(err.message || "Failed to save plan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Soft delete this plan tier?")) return;
    try {
      await subscriptionService.deletePlan(id);
      fetchPlans();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRestore = async (id) => {
    try {
      await subscriptionService.restorePlan(id);
      fetchPlans();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscription Plan Tiers</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure Driver & Rider pricing models and feature sets.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create New Plan
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
        <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
            className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
          />
          Show Deleted Plans
        </label>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner text="Fetching plans..." />
      ) : error ? (
        <ErrorAlert message={error} onRetry={fetchPlans} />
      ) : plans.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No subscription plans configured"
          description="Click 'Create New Plan' to add your first driver or rider plan tier."
        />
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Plan Name</th>
                  <th className="px-6 py-4">Target Role</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Interval</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      {plan.name}
                      {plan.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[9px] uppercase font-bold border border-amber-500/30">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{plan.type}</td>
                    <td className="px-6 py-4 text-amber-400 font-bold text-sm">
                      {plan.displayPrice || "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-400 uppercase">—</td>
                    <td className="px-6 py-4">
                      {plan.deletedAt ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-800 font-semibold text-[10px]">
                          Deleted
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800 font-semibold text-[10px]">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {plan.deletedAt ? (
                          <button
                            onClick={() => handleRestore(plan.id)}
                            className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900"
                            title="Restore Plan"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleOpenEdit(plan)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(plan.id)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Plan Edit/Create */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPlan ? "Edit Subscription Plan" : "Create Subscription Plan"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Plan Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Plan Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              >
                <option value="DRIVER">DRIVER</option>
                <option value="DRIVER_MONTHLY">DRIVER — Monthly</option>
                <option value="DRIVER_WEEKLY">DRIVER — Weekly</option>
                <option value="DRIVER_YEARLY">DRIVER — Yearly</option>
                <option value="RIDER">RIDER</option>
                <option value="RIDER_MONTHLY">RIDER — Monthly</option>
                <option value="RIDER_YEARLY">RIDER — Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Display Price Label
            </label>
            <input
              type="text"
              placeholder="e.g. ₹1,999/mo or Free"
              value={formData.displayPrice}
              onChange={(e) => setFormData({ ...formData, displayPrice: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
            />
          </div>


          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Features Checklist Builder */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Plan Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. 0% Fare Commission"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 rounded-xl bg-slate-800 text-amber-400 font-bold text-xs hover:bg-slate-700"
              >
                Add
              </button>
            </div>

            <ul className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
              {formData.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                >
                  <span>✓ {feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-red-400 hover:text-red-300 font-bold"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <label htmlFor="isActive" className="text-xs font-semibold text-slate-300 cursor-pointer">
              Plan is Active (visible to the public)
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
            >
              {saving ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
