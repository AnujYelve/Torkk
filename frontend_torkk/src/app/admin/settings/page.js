"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Share2,
  Smartphone,
  Image,
  CheckCircle2,
} from "lucide-react";
import { settingsService } from "../../../services/api";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorAlert from "../../../components/ui/ErrorAlert";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "Torkk",
    supportEmail: "support@torkkk.com",
    supportPhone: "+1 (800) 555-TORK",
    address: "100 Mobility Way, San Francisco, CA 94107",
    socialTwitter: "https://twitter.com/torkkk",
    socialInstagram: "https://instagram.com/torkkk",
    socialLinkedin: "https://linkedin.com/company/torkkk",
    socialFacebook: "https://facebook.com/torkkk",
    appStoreIos: "https://apple.com/app-store",
    playStoreAndroid: "https://play.google.com/store",
    logoUrlLight: "/logo.png",
    logoUrlDark: "",
    faviconUrl: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.getSettings();
      if (data) {
        setFormData({
          companyName: data.companyName || "Torkk",
          supportEmail: data.supportEmail || "support@torkkk.com",
          supportPhone: data.supportPhone || "+1 (800) 555-TORK",
          address: data.address || "",
          socialTwitter: data.socialTwitter || data.twitterUrl || "",
          socialInstagram: data.socialInstagram || data.instagramUrl || "",
          socialLinkedin: data.socialLinkedin || data.linkedinUrl || "",
          socialFacebook: data.socialFacebook || data.facebookUrl || "",
          appStoreIos: data.appStoreIos || data.appStoreUrl || "",
          playStoreAndroid: data.playStoreAndroid || data.playStoreUrl || "",
          logoUrlLight: data.logoUrlLight || data.logoUrl || "/logo.png",
          logoUrlDark: data.logoUrlDark || "",
          faviconUrl: data.faviconUrl || "",
        });
      }
    } catch (err) {
      setError(err.message || "Failed to load settings");
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
      await settingsService.updateSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to update site settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading site settings..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Global Site Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage company branding, logos, contact information, social links, and app store links.
        </p>
      </div>

      {error && <ErrorAlert message={error} />}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Global Site Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branding & Logos */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Image className="w-4 h-4" /> Brand Name & Logos
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Company / Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Logo Path / URL (Navbar & Footer)
              </label>
              <input
                type="text"
                placeholder="e.g. /logo.png or https://..."
                value={formData.logoUrlLight}
                onChange={(e) => setFormData({ ...formData, logoUrlLight: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Enter <code className="text-amber-400">/logo.png</code> for the public folder image, or paste an external image URL.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Dark Mode Logo URL (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. /logo-dark.png or https://..."
                value={formData.logoUrlDark}
                onChange={(e) => setFormData({ ...formData, logoUrlDark: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Favicon URL (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. /favicon.ico or https://..."
                value={formData.faviconUrl}
                onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Company & Support Information */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4" /> Company & Support Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Support Email *
              </label>
              <input
                type="email"
                required
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Support Phone Number
              </label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Headquarters Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Social Media Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Twitter / X URL
              </label>
              <input
                type="text"
                value={formData.socialTwitter}
                onChange={(e) => setFormData({ ...formData, socialTwitter: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={formData.socialInstagram}
                onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={formData.socialLinkedin}
                onChange={(e) => setFormData({ ...formData, socialLinkedin: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                value={formData.socialFacebook}
                onChange={(e) => setFormData({ ...formData, socialFacebook: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Mobile App Download Links */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Smartphone className="w-4 h-4" /> App Download URLs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                iOS App Store URL
              </label>
              <input
                type="text"
                value={formData.appStoreIos}
                onChange={(e) => setFormData({ ...formData, appStoreIos: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Google Play Store URL
              </label>
              <input
                type="text"
                value={formData.playStoreAndroid}
                onChange={(e) => setFormData({ ...formData, playStoreAndroid: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
