"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { settingsService } from "../../services/api";

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    settingsService
      .getSettings()
      .then((data) => setSiteSettings(data))
      .catch(() => { });
  }, []);

  return (
    <footer className="bg-[#1D1D27] border-t border-slate-800 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3.5">
              <img
                src={siteSettings?.logoUrlLight || "/logo.png"}
                alt={siteSettings?.companyName || "Trok"}
                className="h-14 sm:h-16 w-auto object-contain max-h-16"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {siteSettings?.companyName || "Trok"}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Revolutionizing mobility through zero-commission community trust. Fair pay for drivers, better prices for riders, and unmatched safety features.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-xs tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Blog & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-xs tracking-wider uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/plans" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/#riders" className="text-slate-400 hover:text-white transition-colors duration-200">
                  For Riders
                </Link>
              </li>
              <li>
                <Link href="/#drivers" className="text-slate-400 hover:text-white transition-colors duration-200">
                  For Drivers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-xs tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6E55F2]" />
                <span className="text-slate-300">{siteSettings?.supportEmail || "support@trok.com"}</span>
              </li>
              {siteSettings?.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#6E55F2] shrink-0 mt-0.5" />
                  <span className="text-slate-300">{siteSettings.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {siteSettings?.companyName || "Trok"} Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
