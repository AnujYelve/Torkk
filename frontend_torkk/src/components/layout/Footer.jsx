"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
    <footer className="bg-[#0B0B10] border-t border-slate-800/80 text-slate-200 pt-16 pb-12">
      {/* Full-width container with generous horizontal padding (eliminates large side spaces) */}
      <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        {/* Main Grid: Left Brand Column + Right Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Brand Column (Left) */}
          <div className="md:col-span-6 lg:col-span-7 space-y-6">
            <Link href="/" className="flex items-center gap-3.5">
              <img
                src={siteSettings?.logoUrlLight || "/logo.png"}
                alt={siteSettings?.companyName || "Torkk"}
                className="h-11 sm:h-14 w-auto object-contain max-h-14"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {siteSettings?.companyName || "Torkk"}
              </span>
            </Link>

            <p className="text-base sm:text-lg text-slate-200 leading-8 max-w-xl font-normal">
              Built for riders. Trusted by drivers. Experience safe, smart and seamless urban mobility across India.
            </p>

            {/* AVAILABLE ON Section */}
            <div className="space-y-3 pt-2">
              <div className="text-xs sm:text-sm font-bold text-slate-300 tracking-widest uppercase">
                AVAILABLE ON
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {/* App Store Button */}
                <a
                  href="#app-store"
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all text-sm font-semibold shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.85.96-2.93-.93.04-2.07.62-2.74 1.4-.6.7-1.13 1.81-.99 2.87 1.04.08 2.13-.56 2.77-1.34z" />
                  </svg>
                  <span>App Store</span>
                </a>

                {/* Google Play Button */}
                <a
                  href="#google-play"
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all text-sm font-semibold shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 466 511.98"
                    className="w-5 h-5 shrink-0"
                  >
                    <g fillRule="nonzero">
                      <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z" />
                      <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z" />
                      <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z" />
                      <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z" />
                    </g>
                  </svg>
                  <span>Google Play</span>
                </a>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3.5 pt-2">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/torkkride/"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 shadow-md shadow-[#0A66C2]/40 transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/torkkapp/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] text-white flex items-center justify-center hover:scale-110 shadow-md shadow-[#D6249F]/40 transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/torkkofficial?s=11"
                aria-label="X"
                className="w-10 h-10 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>


            </div>
          </div>

          {/* Navigation Columns (Right) */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12">
            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="font-bold text-white text-lg sm:text-xl tracking-tight mb-2">
                Company
              </h3>
              <ul className="space-y-4 text-base sm:text-lg">
                <li>
                  <Link href="/about" className="text-slate-200 hover:text-white font-medium transition-colors duration-200">
                    About
                  </Link>
                </li>
                {/* <li>
                  <Link href="/careers" className="text-slate-200 hover:text-white font-medium transition-colors duration-200">
                    Careers
                  </Link>
                </li> */}
                <li>
                  <Link href="/contact" className="text-slate-200 hover:text-white font-medium transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/#safety" className="text-slate-200 hover:text-white font-medium transition-colors duration-200">
                    Safety
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h3 className="font-bold text-white text-lg sm:text-xl tracking-tight mb-2">
                Legal
              </h3>
              <ul className="space-y-4 text-base sm:text-lg">
                <li>
                  <Link href="/privacy" className="text-slate-200 hover:text-white font-medium transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-200 hover:text-white font-medium transition-colors duration-200">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base text-slate-200 font-medium">
          <p>© 2026 BlackOriginX Private Limited. All rights reserved.</p>
          <p className="text-slate-200">Torkk is a brand of BlackOriginX Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
