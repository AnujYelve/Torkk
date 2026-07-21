"use client";

import React from "react";
import Link from "next/link";
import {
  Target,
  Eye,
  Shield,
  ShieldCheck,
  Scale,
  Lightbulb,
  Layers,
  Cpu,
  Rocket,
  Compass,
  Mail,
} from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    {
      icon: Shield,
      title: "Trust",
      description:
        "We build confidence through unwavering reliability and transparent action for all our users.",
    },
    {
      icon: ShieldCheck,
      title: "Safety",
      description:
        "Relentless protection for the well-being of our riders and partners. It is our non-negotiable priority.",
    },
    {
      icon: Scale,
      title: "Fairness",
      description:
        "Equal opportunity for drivers and transparent pricing for riders generate the foundation for our platform.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We challenge the status quo, constantly seeking smarter ways to solve complex mobility challenges.",
    },
  ];

  const timelineSteps = [
    {
      year: "2026",
      title: "Company Foundation",
      description:
        "Trok is established as a next-generation mobility platform focused on zero-commission driver payouts and fair rider pricing.",
      icon: Layers,
      align: "left",
    },
    {
      year: "2026",
      title: "Prime Venture",
      description:
        "Deployment of real-time ride matching, smart telemetry integrations, and community trust safety protocols.",
      icon: Cpu,
      align: "right",
    },
    {
      year: "Upcoming",
      title: "Upcoming Ventures",
      description:
        "Expansion into next-generation smart fleet analytics, sustainable electric mobility networks, and AI-driven dispatch ecosystems.",
      icon: Rocket,
      align: "left",
    },
  ];

  const leaders = [
    {
      name: "Mr. Shivasheesh Kumar",
      role: "FOUNDER & CEO",
      bio: "Driving the strategic direction and operational execution of Trok, focusing on zero-commission driver empowerment, deep tech, and scalable mobility ecosystems.",
      email: "shivasheeshkumar@icloud.com",
      linkedin: "https://www.linkedin.com/in/shivasheeshkumar/",
    },
    {
      name: "Ms. Mithlesh Kumari",
      role: "CO-FOUNDER",
      bio: "Steering corporate governance, organizational development, and key growth partnerships for Trok's nationwide expansion.",
      email: "founder@blackoriginx.com",
    },
    {
      name: "Ecosystem Advisory Board",
      role: "CO-FOUNDING ADVISORS",
      bio: "Composed of industry veterans in software engineering, digital mobility, and venture scaling, providing direct oversight and growth acceleration support.",
      email: "contact@blackoriginx.com",
      location: "Gurugram, INDIA",
    },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pb-24 space-y-24">
      {/* 1. Hero Section - Full Screen Width & Viewport Height */}
      <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-center justify-start py-20 px-6 sm:px-12 lg:px-20 text-left overflow-hidden bg-slate-100/50">
        {/* Background Image (About.svg) - Covers full screen */}
        <div
          className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover opacity-20 pointer-events-none"
          style={{ backgroundImage: "url('/About.svg')" }}
        />

        {/* Signature Gradient Glow Background */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-[#3B36EA]/15 via-[#6E55F2]/15 to-[#C24D2E]/15 rounded-full blur-[160px] pointer-events-none z-10" />

        {/* Foreground Content Container */}
        <div className="relative z-20 space-y-6 max-w-7xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#3B36EA]" />
            <span>OUR STORY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-[#1B1B1F] tracking-tight leading-tight max-w-3xl">
            Moving Forward, <br />
            <span className="bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] bg-clip-text text-transparent">
              Together.
            </span>
          </h1>

          <p className="text-[#66687A] text-lg sm:text-xl max-w-2xl leading-8">
            Trok isn't just a ride-hailing application—it's a movement. Empowering drivers with zero commission and delivering unmatched reliability to every rider.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4 pt-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-sm shadow-lg shadow-[#3B36EA]/25 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </Link>
            <button
              onClick={() => scrollToSection("story-promise")}
              className="px-8 py-3.5 rounded-full bg-white border border-[#ECEAF4] text-[#1B1B1F] font-bold text-sm hover:bg-slate-50 shadow-sm hover:border-[#3B36EA]/30 transition-all duration-300"
            >
              Read Story
            </button>
          </div>
        </div>
      </section>

      {/* Main Page Container for Content Sections */}
      <div className="space-y-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* 2. Story / Built on a Simple Promise Section */}
        <section id="story-promise" className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-xs font-bold uppercase tracking-wider">
                OUR STORY
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B1B1F] leading-tight">
                Redefining urban mobility through <br className="hidden sm:inline" />
                zero-commission trust.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[#66687A] text-base leading-8 pt-2">
                <p>
                  Trok was born out of a simple yet transformative belief: ride-hailing should be fair, transparent, and rewarding for everyone involved. Traditional platforms charged excessive commissions from hard-working drivers while inflating fares for passengers. We set out to rewrite the rules.
                </p>
                <p>
                  Powered by real-time dispatch technology, verified safety protocols, and a zero-commission model where drivers keep 100% of their earnings, Trok builds a stronger, more sustainable mobility ecosystem—one fair trip at a time.
                </p>
              </div>
            </div>

            {/* Right Professional Collaboration Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#3B36EA]/15 via-[#6E55F2]/15 to-[#C24D2E]/10 rounded-[40px] blur-2xl -z-10" />
              <div className="rounded-[32px] overflow-hidden border border-[#ECEAF4] shadow-2xl bg-white">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                  alt="Two business professionals collaborating over a table in a glass office"
                  className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Mission & Vision Cards (CUSTOM ORGANIC OUTER SHAPES) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Mission */}
          <div className="bg-white p-8 sm:p-10 rounded-tl-[50px] rounded-br-[50px] rounded-tr-2xl rounded-bl-2xl border-2 border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.06)] hover:shadow-2xl hover:shadow-[#3B36EA]/15 transition-all duration-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B36EA]/10 to-[#6E55F2]/10 border border-[#3B36EA]/20 text-[#3B36EA] flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1B1F] leading-tight">Our Mission</h3>
            <p className="text-[#66687A] text-lg leading-8">
              To accelerate the world's transition to sustainable, equitable, and safe urban mobility through relentless innovation and human-centric design.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white p-8 sm:p-10 rounded-tr-[50px] rounded-bl-[50px] rounded-tl-2xl rounded-br-2xl border-2 border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.06)] hover:shadow-2xl hover:shadow-[#6E55F2]/15 transition-all duration-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6E55F2]/10 to-[#C24D2E]/10 border border-[#6E55F2]/20 text-[#6E55F2] flex items-center justify-center">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1B1F] leading-tight">Our Vision</h3>
            <p className="text-[#66687A] text-lg leading-8">
              To be the most trusted global partner for moving people and goods, creating a future where distance is no longer a barrier to opportunity.
            </p>
          </div>
        </section>

        {/* 4. Core Values Section (CUSTOM ORGANIC OUTER SHAPES) */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B1B1F] leading-tight">
              Core Values
            </h2>
            <p className="text-[#66687A] text-base sm:text-lg leading-8">
              The principles that guide every decision we make, from the code we write to the partners we choose.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-tl-[40px] rounded-br-[40px] rounded-tr-xl rounded-bl-xl border-2 border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.04)] hover:shadow-2xl hover:shadow-[#3B36EA]/15 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B1B1F] leading-tight">{val.title}</h3>
                  <p className="text-base text-[#66687A] leading-8">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Company Timeline Section (PERFECTLY ALIGNED NODE ICONS) */}
        <section className="space-y-16 pt-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
              Company Timeline
            </h2>
            {/* Brand gradient underline accent */}
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] rounded-full mx-auto mt-2" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 py-8">
            {/* Vertical Signature Gradient Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] -translate-x-1/2" />

            <div className="space-y-16">
              {timelineSteps.map((step, idx) => {
                const Icon = step.icon;
                const isLeft = step.align === "left";

                return (
                  <div
                    key={idx}
                    className="relative flex flex-col md:flex-row items-center justify-between group"
                  >
                    {/* Left Column Container */}
                    <div className="w-full md:w-[45%] text-center md:text-right md:pr-8">
                      {isLeft ? (
                        <div className="space-y-2 bg-white p-6 sm:p-8 rounded-3xl border border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.06)] group-hover:shadow-xl group-hover:shadow-[#3B36EA]/10 transition-all duration-300">
                          <span className="inline-block px-3.5 py-1 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-xs font-bold tracking-wide">
                            {step.year}
                          </span>
                          <h3 className="text-xl font-bold text-[#1B1B1F] leading-tight">
                            {step.title}
                          </h3>
                          <p className="text-base text-[#66687A] leading-8">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden md:block" />
                      )}
                    </div>

                    {/* Center Node Icon (Perfectly Centered on Timeline Line) */}
                    <div className="z-10 w-14 h-14 rounded-full bg-white border-2 border-[#6E55F2] shadow-lg shadow-[#3B36EA]/20 flex items-center justify-center text-[#3B36EA] shrink-0 my-4 md:my-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Right Column Container */}
                    <div className="w-full md:w-[45%] text-center md:text-left md:pl-8">
                      {!isLeft ? (
                        <div className="space-y-2 bg-white p-6 sm:p-8 rounded-3xl border border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.06)] group-hover:shadow-xl group-hover:shadow-[#3B36EA]/10 transition-all duration-300">
                          <span className="inline-block px-3.5 py-1 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-xs font-bold tracking-wide">
                            {step.year}
                          </span>
                          <h3 className="text-xl font-bold text-[#1B1B1F] leading-tight">
                            {step.title}
                          </h3>
                          <p className="text-base text-[#66687A] leading-8">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden md:block" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Leadership Section (COLORED & LARGER SOCIAL ICONS) */}
        <section className="space-y-10 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3B36EA]">
              ECOSYSTEM ADVISORY
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
              Our Leadership
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] rounded-full mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {leaders.map((leader, idx) => (
              <div
                key={idx}
                className="bg-[#F8F7FC] rounded-[32px] p-8 sm:p-10 border border-[#ECEAF4] shadow-sm hover:shadow-xl hover:shadow-[#3B36EA]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
                    {leader.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#3B36EA]">
                      {leader.role}
                    </span>
                    {leader.location && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-semibold text-[#66687A]">
                          {leader.location}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-[#66687A] leading-8 pt-2">
                    {leader.bio}
                  </p>
                </div>

                {/* Card Footer Icons - Coloured & Larger */}
                <div className="pt-4 border-t border-[#ECEAF4]/80 flex items-center gap-3">
                  {/* LinkedIn Brand Blue Icon */}
                  {leader.linkedin ? (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 shadow-md shadow-[#0A66C2]/25 transition-all duration-200"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z" />
                      </svg>
                    </a>
                  ) : (
                    /* LinkedIn icon commented out from Mithlesh and Ecosystem Advisory Board as requested */
                    /*
                    <a
                      href="#linkedin"
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 shadow-md shadow-[#0A66C2]/25 transition-all duration-200"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z" />
                      </svg>
                    </a>
                    */
                    null
                  )}

                  {/* Authentic Official Gmail Icon */}
                  {leader.email && (
                    <a
                      href={`mailto:${leader.email}`}
                      aria-label="Email"
                      className="w-10 h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center hover:scale-110 shadow-md shadow-slate-200/60 transition-all duration-200"
                    >
                      <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4285F4" d="M20 18h-2V9.25L12 13.5 6 9.25V18H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1.5L12 8.5 18.5 4H20c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2z" />
                        <path fill="#EA4335" d="M18.5 4L12 8.5 5.5 4H4c-1.1 0-2 .9-2 2v.5L12 13.5 22 6.5V6c0-1.1-.9-2-2-2h-1.5z" />
                        <path fill="#34A853" d="M2 16v.5c0 1.1.9 2 2 2h2v-8L2 7.5V16z" />
                        <path fill="#FBBC04" d="M22 16v-8.5l-4 3v8h2c1.1 0 2-.9 2-2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Bottom Callout Banner */}
        <section>
          <div className="bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#7B52F2] rounded-[36px] p-8 sm:p-14 text-white text-center space-y-6 shadow-xl shadow-[#3B36EA]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight relative z-10 leading-tight">
              Ready to move with us?
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-8 relative z-10">
              Experience the next generation of transportation. Fast, safe, and tailored to your city.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-white text-[#1B1B1F] font-bold text-sm hover:bg-slate-100 shadow-md hover:scale-105 transition-all"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
