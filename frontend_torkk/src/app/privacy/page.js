"use client";

import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  ShieldCheck,
  Calendar,
  Tag,
  Download,
  Info,
  Mail,
  Phone,
  Lock,
  FileText,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const contents = [
    { id: "introduction", label: "1. Introduction" },
    { id: "data-collection", label: "2. Information We Collect" },
    { id: "how-we-use", label: "3. How We Use Your Info" },
    { id: "data-sharing", label: "4. Data Sharing & Disclosure" },
    { id: "security-measures", label: "5. Security Measures" },
    { id: "your-rights", label: "6. Your Rights & Choices" },
    { id: "cookies-policy", label: "7. Cookies Policy" },
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
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LEGAL DOCUMENTATION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
              Privacy Policy
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Last Updated: July 20, 2026</span>
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
                    <span>Download Policy (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Main Content Card */}
            <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/50 p-6 sm:p-12 space-y-12 text-slate-700 leading-8 text-sm">

              {/* 1. Introduction */}
              <section id="introduction" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  1. Introduction
                </h2>
                <p>
                  Welcome to Torkk. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
                </p>
                <p>
                  When you use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id="data-collection" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  2. Information We Collect
                </h2>
                <p className="text-xs text-slate-500 font-medium italic">
                  In short: We collect personal information that you provide to us such as name, address, contact information, passwords and security data, and payment information.
                </p>

                <ul className="space-y-3 pl-4 list-disc marker:text-[#3B36EA]">
                  <li>
                    <strong className="text-[#1B1B1F]">Personal Information Provided by You.</strong> We collect names; phone numbers; email addresses; mailing addresses; job titles; and other similar information.
                  </li>
                  <li>
                    <strong className="text-[#1B1B1F]">Credentials.</strong> We collect passwords, password hints, and similar security information used for authentication and account access.
                  </li>
                  <li>
                    <strong className="text-[#1B1B1F]">Payment Data.</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number.
                  </li>
                </ul>

                {/* Callout Alert Box */}
                <div className="bg-[#3B36EA]/5 border-l-4 border-[#3B36EA] p-4 sm:p-5 rounded-r-2xl flex items-start gap-3 my-6">
                  <Info className="w-5 h-5 text-[#3B36EA] shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-8">
                    <strong className="text-[#1B1B1F]">Important Highlight:</strong> All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.
                  </div>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section id="how-we-use" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  3. How We Use Your Information
                </h2>
                <p>
                  We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </p>

                {/* 2-Card Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-[#F8F6FB] p-5 rounded-2xl border border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3B36EA]">
                      Service Delivery
                    </span>
                    <p className="text-xs text-slate-600 leading-8">
                      To facilitate account creation and logon process and to send administrative information to you.
                    </p>
                  </div>

                  <div className="bg-[#F8F6FB] p-5 rounded-2xl border border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3B36EA]">
                      Protection & Safety
                    </span>
                    <p className="text-xs text-slate-600 leading-8">
                      To keep our Services safe and secure (for example, for fraud monitoring and prevention).
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Data Sharing */}
              <section id="data-sharing" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  4. Data Sharing & Disclosure
                </h2>
                <p>
                  We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on legal consent or legitimate interest.
                </p>
              </section>

              {/* 5. Security Measures */}
              <section id="security-measures" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  5. Security Measures
                </h2>
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                </p>

                {/* Infrastructure Banner Card */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0F1629] p-8 text-white min-h-[220px] flex flex-col justify-end shadow-xl my-6">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1629] via-[#0F1629]/70 to-transparent" />

                  <div className="relative z-10 space-y-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#3B36EA] text-white">
                      INFRASTRUCTURE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                      Enterprise-grade Encryption
                    </h3>
                  </div>
                </div>
              </section>

              {/* 6. Your Rights & Choices */}
              <section id="your-rights" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  6. Your Rights & Choices
                </h2>
                <p>
                  You have the right to review, change, or terminate your account at any time. Depending on your location, you may also have specific rights regarding your personal data under applicable data privacy laws.
                </p>
              </section>

              {/* 7. Cookies Policy */}
              <section id="cookies-policy" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  7. Cookies Policy
                </h2>
                <p>
                  We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                </p>
              </section>

              {/* 8. Contact Us */}
              <section id="contact-us" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                  8. Contact Us
                </h2>
                <p>
                  If you have questions or comments about this policy, you may email us at privacy@blackoriginx.com or by post to:
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
                      <a href="mailto:privacy@blackoriginx.com" className="hover:underline">privacy@blackoriginx.com</a>
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
