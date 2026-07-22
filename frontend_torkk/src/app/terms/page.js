"use client";

import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  FileText,
  Calendar,
  Tag,
  Download,
  Info,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("agreement");

  const contents = [
    { id: "agreement", label: "1. Agreement to Terms" },
    { id: "user-accounts", label: "2. User Accounts & Safety" },
    { id: "services-payments", label: "3. Services & Zero-Commission" },
    { id: "prohibited-activities", label: "4. Prohibited Activities" },
    { id: "limitation-liability", label: "5. Limitation of Liability" },
    { id: "governing-law", label: "6. Governing Law" },
    { id: "changes-terms", label: "7. Changes to Terms" },
    { id: "contact-us", label: "8. Contact Us" },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#1B1B1F] flex flex-col font-sans">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Header / Hero */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>LEGAL DOCUMENTATION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
              Terms of Service
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Last Updated: July 20, 2026 </span>
              </div>

            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Sticky Sidebar */}
            <div className="lg:col-span-3 sticky top-28">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 leading-tight">
                  CONTENTS
                </h3>

                <nav className="space-y-1">
                  {contents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-between ${activeSection === item.id
                        ? "bg-[#3B36EA]/10 text-[#3B36EA] border-l-4 border-[#3B36EA]"
                        : "text-slate-600 hover:text-[#1B1B1F] hover:bg-slate-50"
                        }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-[11px] text-slate-500 font-medium">Need a PDF version?</p>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B36EA] hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Terms (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Main Content Card */}
            <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/50 p-6 sm:p-12 space-y-12 text-slate-700 leading-8 text-sm">

              {/* 1. Agreement to Terms */}
              <section id="agreement" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  1. Agreement to Terms
                </h2>
                <p>
                  These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and BlackOriginX (“we,” “us,” or “our”), concerning your access to and use of the Torkk application and website.
                </p>
                <p>
                  By accessing or using our services, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, you are expressly prohibited from using the application and services.
                </p>
              </section>

              {/* 2. User Accounts */}
              <section id="user-accounts" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  2. User Accounts & Safety
                </h2>
                <p className="text-xs text-slate-500 font-medium italic">
                  In short: You must register an account, maintain accurate information, and respect community safety guidelines when using Torkk.
                </p>

                <ul className="space-y-3 pl-4 list-disc marker:text-[#3B36EA]">
                  <li>
                    <strong className="text-[#1B1B1F]">Account Responsibility:</strong> You are responsible for safeguarding your login credentials and for all activities that occur under your account.
                  </li>
                  <li>
                    <strong className="text-[#1B1B1F]">Driver Verification:</strong> Drivers on Torkk must provide valid licensing, vehicle registration, and undergo identity verification.
                  </li>
                  <li>
                    <strong className="text-[#1B1B1F]">Community Standards:</strong> Zero tolerance for harassment, discrimination, or unsafe conduct during rides.
                  </li>
                </ul>

                {/* Callout Alert Box */}
                <div className="bg-[#3B36EA]/5 border-l-4 border-[#3B36EA] p-4 sm:p-5 rounded-r-2xl flex items-start gap-3 my-6">
                  <Info className="w-5 h-5 text-[#3B36EA] shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-8">
                    <strong className="text-[#1B1B1F]">Important Highlight:</strong> Drivers and riders must ensure all registration details are accurate and up to date. Account sharing is strictly prohibited.
                  </div>
                </div>
              </section>

              {/* 3. Services & Zero-Commission */}
              <section id="services-payments" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  3. Services & Zero-Commission Model
                </h2>
                <p>
                  Torkk provides a technology platform connecting independent riders and community drivers. Torkk operates on a zero-commission policy where drivers retain 100% of their earned trip fares.
                </p>

                {/* 2-Card Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-[#F8F6FB] p-5 rounded-2xl border border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3B36EA]">
                      Zero Commission
                    </span>
                    <p className="text-xs text-slate-600 leading-8">
                      Drivers keep 100% of their fare earnings without hidden commission deductions.
                    </p>
                  </div>

                  <div className="bg-[#F8F6FB] p-5 rounded-2xl border border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3B36EA]">
                      Fair Pricing
                    </span>
                    <p className="text-xs text-slate-600 leading-8">
                      Riders receive transparent, un-inflated fare estimates with zero surge traps.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Prohibited Activities */}
              <section id="prohibited-activities" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  4. Prohibited Activities
                </h2>
                <p>
                  You may not access or use the site or services for any purpose other than that for which we make the platform available. As a user of the service, you agree not to engage in fraudulent activity, bypass security controls, or misuse customer data.
                </p>
              </section>

              {/* 5. Limitation of Liability */}
              <section id="limitation-liability" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  5. Limitation of Liability
                </h2>
                <p>
                  In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the service.
                </p>

                {/* Banner Card */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0F1629] p-8 text-white min-h-[220px] flex flex-col justify-end shadow-xl my-6">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1629] via-[#0F1629]/70 to-transparent" />

                  <div className="relative z-10 space-y-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#3B36EA] text-white">
                      COMPLIANCE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                      Platform Safety & Governance
                    </h3>
                  </div>
                </div>
              </section>

              {/* 6. Governing Law */}
              <section id="governing-law" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  6. Governing Law
                </h2>
                <p>
                  These Terms shall be governed by and defined following the laws of India. BlackOriginX and yourself irrevocably consent that the courts of Haryana, India shall have exclusive jurisdiction to resolve any dispute which may arise.
                </p>
              </section>

              {/* 7. Changes to Terms */}
              <section id="changes-terms" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  7. Changes to Terms
                </h2>
                <p>
                  We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time. We will alert you about any changes by updating the “Last Updated” date of these Terms.
                </p>
              </section>

              {/* 8. Contact Us */}
              <section id="contact-us" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  8. Contact Us
                </h2>
                <p>
                  In order to resolve a complaint regarding the service or to receive further information regarding use of the service, please contact us at:
                </p>

                {/* Contact Card */}
                <div className="bg-[#F8F6FB] p-6 rounded-2xl border border-slate-200/80 space-y-3 max-w-md my-4">
                  <h4 className="text-base font-bold text-[#1B1B1F] leading-tight">BlackOriginX Pvt Ltd</h4>
                  <p className="text-xs text-slate-600 leading-8">
                    Global HQ: Gurugram, Haryana<br />
                    India Office & Operations Hub
                  </p>
                  <div className="pt-2 space-y-2 text-xs font-semibold text-[#3B36EA]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a href="mailto:legal@blackoriginx.com" className="hover:underline">legal@blackoriginx.com</a>
                    </div>

                  </div>
                </div>
              </section>

            </div>

          </div>

        </div>
      </main>


    </div>
  );
}
