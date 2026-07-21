"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Phone,
  Calendar,
  Eye,
  Filter,
  RefreshCw,
  Tag,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { contactService } from "../../../services/api";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import EmptyState from "../../../components/ui/EmptyState";
import Modal from "../../../components/ui/Modal";

export default function AdminContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL"); // 'ALL' | 'UNREAD' | 'RESOLVED'
  const [searchQuery, setSearchQuery] = useState("");

  // Modal for Viewing Detail
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.getAdminSubmissions();
      setSubmissions(Array.isArray(data) ? data : data?.submissions || []);
    } catch (err) {
      setError(err.message || "Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = async (sub) => {
    setSelectedSubmission(sub);
    setDetailModalOpen(true);
    // Automatically mark as read if it is unread
    if (!sub.isRead) {
      try {
        await contactService.updateSubmission(sub.id, { isRead: true });
        setSubmissions((prev) =>
          prev.map((item) => (item.id === sub.id ? { ...item, isRead: true } : item))
        );
      } catch (e) {}
    }
  };

  const handleToggleResolved = async (sub) => {
    try {
      const updated = await contactService.updateSubmission(sub.id, {
        isResolved: !sub.isResolved,
      });
      setSubmissions((prev) =>
        prev.map((item) => (item.id === sub.id ? { ...item, isResolved: !sub.isResolved } : item))
      );
      if (selectedSubmission?.id === sub.id) {
        setSelectedSubmission((prev) => ({ ...prev, isResolved: !prev.isResolved }));
      }
    } catch (err) {
      alert(err.message || "Failed to update submission status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    try {
      await contactService.deleteSubmission(id);
      setSubmissions((prev) => prev.filter((item) => item.id !== id));
      if (selectedSubmission?.id === id) {
        setDetailModalOpen(false);
      }
    } catch (err) {
      alert(err.message || "Failed to delete submission");
    }
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    if (filterStatus === "UNREAD" && sub.isRead) return false;
    if (filterStatus === "RESOLVED" && !sub.isResolved) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = sub.name?.toLowerCase().includes(q);
      const emailMatch = sub.email?.toLowerCase().includes(q);
      const subjectMatch = sub.subject?.toLowerCase().includes(q);
      const messageMatch = sub.message?.toLowerCase().includes(q);
      return nameMatch || emailMatch || subjectMatch || messageMatch;
    }

    return true;
  });

  const totalCount = submissions.length;
  const unreadCount = submissions.filter((s) => !s.isRead).length;
  const resolvedCount = submissions.filter((s) => s.isResolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Contact Submissions</h1>
          <p className="text-xs text-slate-500 mt-1">
            View, inspect, and respond to user messages submitted via the Contact page.
          </p>
        </div>

        <button
          onClick={fetchSubmissions}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Inquiries */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Total Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{totalCount}</p>
          <p className="text-xs text-slate-500 font-medium">All submissions received</p>
        </div>

        {/* Unread */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Unread Messages</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-600">{unreadCount}</p>
          <p className="text-xs text-slate-500 font-medium">Requires staff review</p>
        </div>

        {/* Resolved */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Resolved</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-600">{resolvedCount}</p>
          <p className="text-xs text-slate-500 font-medium">Successfully addressed</p>
        </div>
      </div>

      {/* Search & Tabs Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === "ALL"
                ? "bg-[#3B36EA] text-white shadow-sm shadow-[#3B36EA]/20"
                : "bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => setFilterStatus("UNREAD")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === "UNREAD"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            Unread ({unreadCount})
          </button>

          <button
            onClick={() => setFilterStatus("RESOLVED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === "RESOLVED"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            Resolved ({resolvedCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, email, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#3B36EA] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Main Table Content */}
      {loading ? (
        <LoadingSpinner text="Fetching contact submissions..." />
      ) : error ? (
        <ErrorAlert message={error} onRetry={fetchSubmissions} />
      ) : filteredSubmissions.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No contact submissions found"
          description="Messages submitted via the public contact form will appear here."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Subject &amp; Type</th>
                  <th className="px-6 py-4">Message Preview</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredSubmissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      !sub.isRead ? "bg-amber-50/30" : ""
                    }`}
                  >
                    {/* Sender */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {sub.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                            {sub.name}
                            {!sub.isRead && (
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" title="Unread" />
                            )}
                          </p>
                          <a href={`mailto:${sub.email}`} className="text-slate-500 text-[11px] hover:text-[#3B36EA] hover:underline truncate block">
                            {sub.email}
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 truncate max-w-xs">{sub.subject || "General Inquiry"}</p>
                      {sub.inquiryType && (
                        <span className="inline-block px-2 py-0.5 mt-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          {sub.inquiryType}
                        </span>
                      )}
                    </td>

                    {/* Message Preview */}
                    <td className="px-6 py-4 max-w-sm">
                      <p className="text-slate-600 line-clamp-2 text-xs">
                        {sub.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {sub.createdAt
                        ? new Date(sub.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Recent"}
                    </td>

                    {/* Status Badges */}
                    <td className="px-6 py-4 whitespace-nowrap space-y-1">
                      <div>
                        {sub.isResolved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            <CheckCircle className="w-3 h-3" /> Resolved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(sub)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-[#3B36EA] text-slate-700 hover:text-white transition-colors"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleResolved(sub)}
                          className={`p-2 rounded-xl transition-colors ${
                            sub.isResolved
                              ? "bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-700"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          }`}
                          title={sub.isResolved ? "Mark as Pending" : "Mark as Resolved"}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
                          title="Delete Submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="Contact Message Details"
      >
        {selectedSubmission && (
          <div className="space-y-6">
            {/* Sender Meta Header */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3B36EA] text-white font-bold flex items-center justify-center text-sm">
                  {selectedSubmission.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedSubmission.name}</h4>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="text-xs font-semibold text-[#3B36EA] hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {selectedSubmission.email}
                  </a>
                </div>
              </div>

              {selectedSubmission.phone && (
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                  <a href={`tel:${selectedSubmission.phone}`} className="text-xs font-semibold text-slate-700 hover:underline">
                    {selectedSubmission.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Message Info */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Subject</span>
                <p className="text-sm font-extrabold text-slate-900">{selectedSubmission.subject || "General Inquiry"}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Full Message</span>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>
                  Submitted on:{" "}
                  <strong className="text-slate-700">
                    {selectedSubmission.createdAt
                      ? new Date(selectedSubmission.createdAt).toLocaleString()
                      : "Recently"}
                  </strong>
                </span>

                <span className="flex items-center gap-1.5">
                  Status:
                  {selectedSubmission.isResolved ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Resolved
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                      Pending
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => handleDelete(selectedSubmission.id)}
                className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Inquiry
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleResolved(selectedSubmission)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors ${
                    selectedSubmission.isResolved
                      ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {selectedSubmission.isResolved ? "Mark as Pending" : "Mark as Resolved"}
                </button>

                <a
                  href={`mailto:${selectedSubmission.email}?subject=Re: ${encodeURIComponent(
                    selectedSubmission.subject || "Your Inquiry to Torkkk"
                  )}`}
                  className="px-5 py-2.5 rounded-xl bg-[#3B36EA] hover:bg-[#2A25D5] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#3B36EA]/20 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
