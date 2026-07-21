"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Users,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  User,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { careerService } from "../../../services/api";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import EmptyState from "../../../components/ui/EmptyState";
import Modal from "../../../components/ui/Modal";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState("JOBS"); // 'JOBS' | 'APPLICATIONS'
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  // Modal for Job Creation/Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "Engineering",
    location: "Remote",
    employmentType: "Full Time",
    description: "",
    requirements: "",
    status: "OPEN",
  });

  useEffect(() => {
    if (activeTab === "JOBS") {
      fetchCareers();
    } else {
      fetchApplications();
    }
  }, [activeTab, showDeleted]);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await careerService.getAdminCareers({ showDeleted });
      setCareers(Array.isArray(data) ? data : data?.careers || []);
    } catch (err) {
      setError(err.message || "Failed to load careers");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await careerService.getApplications();
      setApplications(Array.isArray(data) ? data : data?.applications || []);
    } catch (err) {
      setError(err.message || "Failed to load job applications");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      department: "Engineering",
      location: "Remote",
      employmentType: "Full Time",
      description: "",
      requirements: "",
      status: "OPEN",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || "",
      department: job.department || "Engineering",
      location: job.location || "Remote",
      employmentType: job.employmentType || "Full Time",
      description: job.description || "",
      requirements: job.requirements || "",
      status: job.status || "OPEN",
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingJob) {
        await careerService.updateCareer(editingJob.id, formData);
      } else {
        await careerService.createCareer(formData);
      }
      setModalOpen(false);
      fetchCareers();
    } catch (err) {
      alert(err.message || "Failed to save job opening");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Soft delete this career position?")) return;
    try {
      await careerService.deleteCareer(id);
      fetchCareers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRestore = async (id) => {
    try {
      await careerService.restoreCareer(id);
      fetchCareers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Career Openings & Candidates</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage active job listings and inspect candidate applications.
          </p>
        </div>

        {activeTab === "JOBS" && (
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-[#3B36EA] hover:bg-[#2A25D5] text-white font-bold text-xs flex items-center gap-2 transition-colors shrink-0 shadow-md shadow-[#3B36EA]/20"
          >
            <Plus className="w-4 h-4" />
            Add Job Position
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("JOBS")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "JOBS"
              ? "bg-[#3B36EA] text-white shadow-sm shadow-[#3B36EA]/20"
              : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Job Openings ({careers.length})
        </button>
        <button
          onClick={() => setActiveTab("APPLICATIONS")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "APPLICATIONS"
              ? "bg-[#3B36EA] text-white shadow-sm shadow-[#3B36EA]/20"
              : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4" />
          Candidate Applications ({applications.length})
        </button>
      </div>

      {/* Content for JOBS tab */}
      {activeTab === "JOBS" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex justify-between items-center text-xs shadow-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={showDeleted}
                onChange={(e) => setShowDeleted(e.target.checked)}
                className="rounded border-slate-300 text-[#3B36EA] focus:ring-[#3B36EA]"
              />
              Show Soft Deleted Positions
            </label>
          </div>

          {loading ? (
            <LoadingSpinner text="Fetching open positions..." />
          ) : error ? (
            <ErrorAlert message={error} onRetry={fetchCareers} />
          ) : careers.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No career openings listed"
              description="Click 'Add Job Position' to post your first career listing."
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">Role Title</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {careers.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{job.title}</td>
                        <td className="px-6 py-4 text-amber-600 font-semibold">{job.department || "General"}</td>
                        <td className="px-6 py-4 text-slate-600">{job.location || "Remote"}</td>
                        <td className="px-6 py-4 text-slate-600">{job.employmentType || "Full time"}</td>
                        <td className="px-6 py-4">
                          {job.deletedAt ? (
                            <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">
                              Deleted
                            </span>
                          ) : job.status === "OPEN" ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                              Active
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {job.deletedAt ? (
                              <button
                                onClick={() => handleRestore(job.id)}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                title="Restore Position"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleOpenEdit(job)}
                                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                                  title="Edit Position"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(job.id)}
                                  className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50"
                                  title="Delete Position"
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
        </div>
      )}

      {/* Content for APPLICATIONS tab */}
      {activeTab === "APPLICATIONS" && (
        <div className="space-y-4">
          {loading ? (
            <LoadingSpinner text="Fetching candidate applications..." />
          ) : error ? (
            <ErrorAlert message={error} onRetry={fetchApplications} />
          ) : applications.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No applications submitted yet"
              description="Candidates applying on the careers page will appear here."
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">Candidate Name</th>
                      <th className="px-6 py-4">Applied Position</th>
                      <th className="px-6 py-4">Contact Info</th>
                      <th className="px-6 py-4">Submitted Date</th>
                      <th className="px-6 py-4">Resume / Cover Letter</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                              {app.name?.charAt(0) || "U"}
                            </div>
                            <span>{app.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-amber-600 font-bold">
                          {app.career?.title || app.positionTitle || "General Application"}
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <p className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <a href={`mailto:${app.email}`} className="hover:underline text-blue-600">
                              {app.email}
                            </a>
                          </p>
                          {app.phone && (
                            <p className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {app.phone}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {app.createdAt
                            ? new Date(app.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Recently"}
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          {app.resumeUrl ? (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-amber-600 hover:underline font-bold"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> View Resume / Portfolio
                            </a>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">No link provided</span>
                          )}
                          {app.coverLetter && (
                            <p className="text-[11px] text-slate-600 line-clamp-2 max-w-xs italic mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                              "{app.coverLetter}"
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal for Creating/Editing Career */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingJob ? "Edit Job Position" : "Add Job Position"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Position Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Operations">Operations</option>
                <option value="Safety">Safety</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Employment Type
              </label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description *
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Job Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
            >
              <option value="OPEN">Open — Accepting Applications</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
            >
              {saving ? "Saving..." : editingJob ? "Update Job" : "Publish Job"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
