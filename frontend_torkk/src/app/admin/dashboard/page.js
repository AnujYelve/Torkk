"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Users,
  CreditCard,
  PlusCircle,
  Settings,
  Globe,
  TrendingUp,
  Activity,
  ArrowRight,
  Mail,
} from "lucide-react";
import { dashboardService } from "../../../services/api";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorAlert from "../../../components/ui/ErrorAlert";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading metrics..." />;
  if (error) return <ErrorAlert message={error} onRetry={fetchStats} />;

  return (
    <div className="space-y-8">
      {/* Welcome & Top Metric Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">System Overview</h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor content status, job applications, contact submissions, and subscription tiers.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Blogs */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Blogs</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3B36EA] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{stats?.blogs?.total ?? 0}</p>
          <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-bold">
            <TrendingUp className="w-3 h-3" /> {stats?.blogs?.published ?? 0} published · {stats?.blogs?.drafts ?? 0} drafts
          </p>
        </div>

        {/* Open Careers */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Open Careers</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{stats?.careers?.openPositions ?? 0}</p>
          <p className="text-[11px] text-slate-500 font-bold">Active job listings</p>
        </div>

        {/* Candidate Applications */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Applications</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{stats?.careers?.totalApplications ?? 0}</p>
          <p className="text-[11px] text-[#3B36EA] font-bold">{stats?.careers?.newApplications ?? 0} new received</p>
        </div>

        {/* Active Plans & Subscribers */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Plans</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{stats?.subscriptionPlans?.activePlans ?? 0}</p>
          <p className="text-[11px] text-slate-500 font-bold">Driver &amp; Rider tiers</p>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#3B36EA]" />
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/blogs"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#3B36EA]/5 border border-slate-200 hover:border-[#3B36EA]/30 flex items-center justify-between text-xs font-bold text-slate-900 transition-all group"
          >
            <span>Manage Blog Posts</span>
            <ArrowRight className="w-4 h-4 text-[#3B36EA] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/careers"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#3B36EA]/5 border border-slate-200 hover:border-[#3B36EA]/30 flex items-center justify-between text-xs font-bold text-slate-900 transition-all group"
          >
            <span>Review Applications</span>
            <ArrowRight className="w-4 h-4 text-[#3B36EA] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/contact"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#3B36EA]/5 border border-slate-200 hover:border-[#3B36EA]/30 flex items-center justify-between text-xs font-bold text-slate-900 transition-all group"
          >
            <span>Contact Submissions</span>
            <ArrowRight className="w-4 h-4 text-[#3B36EA] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/settings"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#3B36EA]/5 border border-slate-200 hover:border-[#3B36EA]/30 flex items-center justify-between text-xs font-bold text-slate-900 transition-all group"
          >
            <span>Update Site Settings</span>
            <ArrowRight className="w-4 h-4 text-[#3B36EA] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
