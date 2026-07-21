"use client";

import React, { useState, useEffect } from "react";
import { Globe, Save, CheckCircle2, Sparkles, Image, Link2 } from "lucide-react";
import { homepageService } from "../../../services/api";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorAlert from "../../../components/ui/ErrorAlert";

export default function AdminHomepageCMSPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    heroTitle: "Fairer Rides. Safer Journeys.",
    heroSubtitle:
      "The zero-commission ride-hailing platform designed for community trust. Fair pay for drivers, better prices for riders, and unmatched safety features.",
    heroCtaText: "Explore Plans",
    heroCtaLink: "/plans",
    bannerImageUrl: "",
  });

  useEffect(() => {
    fetchHomepageCMS();
  }, []);

  const fetchHomepageCMS = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await homepageService.getHomepage();
      if (data) {
        setFormData({
          heroTitle: data.heroTitle || "Fairer Rides. Safer Journeys.",
          heroSubtitle: data.heroSubtitle || "",
          heroCtaText: data.heroCtaText || data.ctaText || "Explore Plans",
          heroCtaLink: data.heroCtaLink || data.ctaLink || "/plans",
          bannerImageUrl: data.bannerImageUrl || data.bannerUrl || "",
        });
      }
    } catch (err) {
      setError(err.message || "Failed to load homepage CMS content");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      await homepageService.updateHomepage(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to update homepage content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading Homepage CMS settings..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Homepage Marketing CMS</h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize the main hero title, subtitle, call-to-action buttons, and promotional banners without touching code.
        </p>
      </div>

      {error && <ErrorAlert message={error} />}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Homepage marketing content updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Hero Section Editor */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Hero Banner Content
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Title *
            </label>
            <input
              type="text"
              required
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 font-bold focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Subtitle / Description *
            </label>
            <textarea
              rows={3}
              required
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={formData.heroCtaText}
                onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary CTA Button Link Target
              </label>
              <input
                type="text"
                value={formData.heroCtaLink}
                onChange={(e) => setFormData({ ...formData, heroCtaLink: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Promotional Banner Image URL (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. /banner.png or https://..."
              value={formData.bannerImageUrl}
              onChange={(e) => setFormData({ ...formData, bannerImageUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving CMS..." : "Save Homepage Content"}
          </button>
        </div>
      </form>
    </div>
  );
}
