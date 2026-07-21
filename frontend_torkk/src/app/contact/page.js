"use client";

import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";

import {
  Headphones,
  Briefcase,
  HeartHandshake,
  ArrowRight,
  MapPin,
  Building2,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { contactService } from "../../services/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
    phone: "",
    inquiryType: "General",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setErrorMessage("Please fill in all required fields (Name, Email, and Message).");
      return;
    }

    if (name.length < 2) {
      setErrorMessage("Name must be at least 2 characters long.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (message.length < 5) {
      setErrorMessage("Message must be at least 5 characters long.");
      return;
    }

    try {
      setLoading(true);
      await contactService.submitContact(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
        phone: "",
        inquiryType: "General",
      });
    } catch (err) {
      setErrorMessage(err.message || "Failed to submit message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#1B1B1F] flex flex-col font-sans">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Hero Header Section */}
          <div className="max-w-3xl space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-xs font-bold uppercase tracking-wider">
              <span>CONTACT US</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B1B1F] leading-[1.1]">
              We&apos;re here to <span className="text-[#3B36EA]">help.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#66687A] leading-relaxed font-medium">
              Whether you&apos;re a traveler with a question, a potential business partner, or looking for a career, our team is ready to assist you around the clock.
            </p>
          </div>

          {/* 3 Action Cards */}


          {/* Form & Global Presence Dual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Form Card */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-[#ECEAF4] shadow-lg shadow-slate-200/50 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-[#1B1B1F]">Send a Message</h2>

              </div>
              <p className="text-sm text-[#66687A]">Fill out the form and we&apos;ll be in touch.</p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Thank you for reaching out to Torkkk. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F6FB] border border-[#ECEAF4] rounded-xl text-sm text-[#1B1B1F] placeholder-slate-400 focus:bg-white focus:border-[#2A66F6] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F6FB] border border-[#ECEAF4] rounded-xl text-sm text-[#1B1B1F] placeholder-slate-400 focus:bg-white focus:border-[#2A66F6] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1.5">
                      Subject / Inquiry Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Partnership inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F6FB] border border-[#ECEAF4] rounded-xl text-sm text-[#1B1B1F] placeholder-slate-400 focus:bg-white focus:border-[#2A66F6] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F6FB] border border-[#ECEAF4] rounded-xl text-sm text-[#1B1B1F] placeholder-slate-400 focus:bg-white focus:border-[#2A66F6] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-full bg-[#2A66F6] hover:bg-[#1D54D8] text-white font-bold text-sm shadow-md shadow-[#2A66F6]/25 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Our Global Presence */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1B1B1F]">Our Global Presence</h2>
                <p className="text-sm text-[#66687A] mt-1">
                  While our services are digital, our people are rooted in hubs across the globe.
                </p>
              </div>

              {/* Map Graphic Container */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0F1629] p-6 text-white shadow-2xl min-h-[320px] flex flex-col justify-end">
                {/* Background Map Visual */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(42, 102, 246, 0.4), transparent 70%), url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')`,
                  }}
                />

                {/* Grid Overlay Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

                {/* HQ Badge Overlay */}
                <div className="relative z-10 bg-white/95 backdrop-blur-md text-[#1B1B1F] p-4 rounded-2xl border border-white/20 shadow-xl flex items-center gap-3 max-w-md">
                  <div className="w-10 h-10 rounded-xl bg-[#2A66F6]/10 text-[#2A66F6] flex items-center justify-center shrink-0 font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B1B1F]">Global HQ: Gurugram, Haryana</h4>

                  </div>
                </div>
              </div>



            </div>

          </div>

        </div>
      </main>


    </div>
  );
}
