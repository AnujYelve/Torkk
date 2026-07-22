"use client";

import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";


import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { contactService } from "../../services/api";

export default function ContactPage() {
  const [step, setStep] = useState(1);
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

  const handleNext = (e) => {
    e?.preventDefault();
    setErrorMessage(null);

    if (step === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        setErrorMessage("Please enter your full name (at least 2 characters).");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handlePrev = () => {
    setErrorMessage(null);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const message = formData.message.trim();
    if (!message || message.length < 5) {
      setErrorMessage("Please enter your message (at least 5 characters).");
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
      setStep(1);
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1B1B1F] leading-tight">
              We&apos;re here to <span className="text-[#3B36EA]">help.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#66687A] leading-8 font-medium">
              Whether you&apos;re a traveler with a question, a potential business partner, or looking for a career, our team is ready to assist you around the clock.
            </p>
          </div>

          {/* Form & Global Presence Dual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Interactive Circle Step Form Container */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative group w-full max-w-[460px] aspect-square flex items-center justify-center">

                {/* Outer Glowing Circle Backdrop */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] opacity-25 group-hover:opacity-40 blur-2xl transition-all duration-500" />

                {/* Main Circular Container */}
                <div className="relative w-full h-full rounded-full bg-white/95 backdrop-blur-xl border-2 border-[#ECEAF4] shadow-2xl shadow-[#3B36EA]/15 p-8 sm:p-12 flex flex-col justify-center items-center text-center overflow-hidden">

                  {/* Decorative Inner Glows */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#3B36EA]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#C24D2E]/10 rounded-full blur-2xl pointer-events-none" />

                  {submitted ? (
                    <div className="relative z-10 space-y-4 max-w-xs">
                      <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-bold text-emerald-950">Message Sent!</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Thank you for reaching out. Our team will get back to you shortly.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setStep(1);
                        }}
                        className="mt-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#3B36EA] hover:bg-[#2F2BC6] transition-colors shadow-md"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <div className="relative z-10 w-full max-w-xs space-y-5">

                      {/* Step Progress Header */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1.5 mb-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-2 rounded-full transition-all duration-300 ${i === step
                                  ? "w-7 bg-[#3B36EA]"
                                  : i < step
                                    ? "w-2.5 bg-[#3B36EA]/40"
                                    : "w-2.5 bg-slate-200"
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold tracking-wider uppercase text-[#3B36EA]">
                          Step {step} of 4
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#1B1B1F] leading-tight">
                          {step === 1 && "What's your name?"}
                          {step === 2 && "What's your email?"}
                          {step === 3 && "Subject of inquiry?"}
                          {step === 4 && "Write your message"}
                        </h2>
                      </div>

                      {/* Error Alert */}
                      {errorMessage && (
                        <div className="p-2.5 px-4 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-600">
                          {errorMessage}
                        </div>
                      )}

                      {/* Step Form Fields */}
                      <form
                        onSubmit={step === 4 ? handleSubmit : handleNext}
                        className="space-y-4"
                      >
                        {step === 1 && (
                          <div className="space-y-1 text-left">
                            <label className="block text-xs font-semibold text-slate-600">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              autoFocus
                              required
                              placeholder="e.g. John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-3 bg-[#F8F6FB] border border-slate-200 rounded-xl text-sm text-[#1B1B1F] placeholder-slate-400 focus:bg-white focus:border-[#3B36EA] focus:outline-none transition-all"
                            />
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-1 text-left">
                            <label className="block text-xs font-semibold text-slate-600">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              autoFocus
                              required
                              placeholder="e.g. john@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-3 bg-[#F8F6FB] border border-slate-200 rounded-xl text-sm text-[#1B1B1F] placeholder-slate-400 focus:bg-white focus:border-[#3B36EA] focus:outline-none transition-all"
                            />
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-1 text-left">
                            <label className="block text-xs font-semibold text-slate-600">
                              Subject / Inquiry Type
                            </label>
                            <input
                              type="text"
                              autoFocus
                              placeholder="e.g. General Inquiry / Partnership"
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full px-4 py-3 bg-[#F8F6FB] border border-slate-200 rounded-xl text-sm text-[#1B1B1F] placeholder-slate-400 focus:bg-white focus:border-[#3B36EA] focus:outline-none transition-all"
                            />
                          </div>
                        )}

                        {step === 4 && (
                          <div className="space-y-1 text-left">
                            <label className="block text-xs font-semibold text-slate-600">
                              Your Message *
                            </label>
                            <textarea
                              rows={3}
                              autoFocus
                              required
                              placeholder="How can we help you today?"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full px-4 py-2.5 bg-[#F8F6FB] border border-slate-200 rounded-xl text-sm text-[#1B1B1F] placeholder-slate-400 focus:bg-white focus:border-[#3B36EA] focus:outline-none transition-all resize-none"
                            />
                          </div>
                        )}

                        {/* Control Buttons */}
                        <div className="flex items-center gap-3 pt-1">
                          {step > 1 && (
                            <button
                              type="button"
                              onClick={handlePrev}
                              className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                              title="Back"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                          )}

                          {step < 4 ? (
                            <button
                              type="submit"
                              className="flex-1 py-3 px-6 rounded-full bg-[#3B36EA] hover:bg-[#2F2BC6] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#3B36EA]/20 transition-all flex items-center justify-center gap-2"
                            >
                              Next <ArrowRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled={loading}
                              className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#3B36EA]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  Send Message <Send className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          )}
                        </div>

                      </form>

                    </div>
                  )}

                </div>

              </div>
            </div>

            {/* Right Column: Our Global Presence (Restored Original Style) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1B1B1F] leading-tight">Our Global Presence</h2>
                <p className="text-sm text-[#66687A] mt-1 font-medium">
                  While our services are digital, our people are rooted in hubs across the globe.
                </p>
              </div>

              {/* Map Graphic Container (Real Google Maps Embed) */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl min-h-[400px] flex flex-col justify-end">
                {/* Interactive Map Iframe */}
                <iframe
                  src="https://maps.google.com/maps?q=Gurugram,%20Haryana,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map of Gurugram, Haryana"
                ></iframe>

                {/* HQ Badge Overlay */}
                <div className="relative z-10 m-6 bg-white/95 backdrop-blur-md text-[#1B1B1F] p-4 sm:p-5 rounded-2xl border border-[#ECEAF4] shadow-xl flex items-center gap-4 max-w-md">
                  <div className="w-12 h-12 rounded-xl bg-[#3B36EA]/10 text-[#3B36EA] flex items-center justify-center shrink-0 font-bold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B1B1F] leading-tight">Global HQ: Gurugram, Haryana</h4>
                    <p className="text-xs text-[#66687A]">India Office & Operations Hub</p>
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
