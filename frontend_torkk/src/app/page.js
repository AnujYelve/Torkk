"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Shield,
  Heart,
  Sparkles,
  Download,
  Star,
  ShieldCheck,
  Fingerprint,
  UserCheck,
  MapPin,
  PhoneCall,
  Bike,
  Lock,
  CreditCard,
  Bot,
  Headphones,
  Radio,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { homepageService, subscriptionService } from "../services/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function HomePage() {
  const [cmsContent, setCmsContent] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cmsRes, plansRes] = await Promise.all([
          homepageService.getHomepage().catch(() => null),
          subscriptionService.getPublicPlans().catch(() => []),
        ]);
        if (cmsRes) setCmsContent(cmsRes);
        if (plansRes) setPlans(plansRes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const defaultHero = {
    heroTitle: "Fairer Rides. Safer Journeys.",
    heroSubtitle:
      "The zero-commission ride-hailing platform designed for community trust. Fair pay for drivers, better prices for riders, and unmatched safety features.",
    ctaText: "Explore Plans",
    ctaLink: "/plans",
  };

  const hero = cmsContent || defaultHero;

  const formatPrice = (plan) => {
    if (!plan) return "Free";
    if (plan.displayPrice) {
      let priceStr = plan.displayPrice.replace(/[\$₦]/g, "₹");
      if (!priceStr.includes("₹") && !priceStr.toLowerCase().includes("free")) {
        priceStr = `₹${priceStr}`;
      }
      return priceStr;
    }
    if (plan.price !== undefined && plan.price !== null && plan.price !== "") {
      const amount = Number(plan.price);
      const formattedAmount = isNaN(amount) ? plan.price : amount.toLocaleString("en-IN");
      const intervalStr = plan.interval ? `/${plan.interval.toLowerCase()}` : "";
      return `₹${formattedAmount}${intervalStr}`;
    }
    return "Free";
  };

  const fallbackPlans = [
    {
      id: "fp-1",
      name: "Driver Basic",
      type: "DRIVER",
      displayPrice: "₹1,499/month",
      description: "Ideal for part-time drivers aiming for max flexibility.",
      features: ["0% Fare Commission", "Instant Weekly Payouts", "Standard Support"],
      isPopular: false,
    },
    {
      id: "fp-2",
      name: "Driver Pro",
      type: "DRIVER",
      displayPrice: "₹2,999/month",
      description: "For full-time professional drivers aiming for maximum earnings.",
      features: ["0% Fare Commission", "Priority 24/7 SOS Support", "Unlimited Trips"],
      isPopular: true,
    },
    {
      id: "fp-3",
      name: "Commuter Pass",
      type: "RIDER",
      displayPrice: "₹499/month",
      description: "Flat discounted fares for daily office & campus commuters.",
      features: ["15% Off Peak Trips", "Priority Booking", "Zero Surge Pricing"],
      isPopular: false,
    },
  ];

  const activePlans = plans.length > 0 ? plans : fallbackPlans;

  const whyChooseTorkk = [
    {
      title: "Safety First",
      desc: "Prioritizing end-to-end trip security with emergency SOS, live tracking, and biometric safety check-ins.",
      icon: ShieldCheck,
      color: "bg-[#3B36EA]/10 border-[#3B36EA]/20 text-[#3B36EA]",
    },
    {
      title: "Verified Drivers",
      desc: "100% background checked and Aadhaar verified driver partners for complete peace of mind.",
      icon: UserCheck,
      color: "bg-[#6E55F2]/10 border-[#6E55F2]/20 text-[#6E55F2]",
    },
    {
      title: "Transparent Pricing",
      desc: "Zero commission cuts, zero surge price manipulation, and upfront fair fares for everyone.",
      icon: CreditCard,
      color: "bg-[#C24D2E]/10 border-[#C24D2E]/20 text-[#C24D2E]",
    },
    {
      title: "Subscription Benefits",
      desc: "Flexible subscription plans for driver partners and commuters to maximize earnings and savings.",
      icon: Zap,
      color: "bg-[#3B36EA]/10 border-[#3B36EA]/20 text-[#3B36EA]",
    },
    {
      title: "AI-Based Ride Matching",
      desc: "Smart AI algorithm to pair riders with optimal nearby drivers for ultra-fast pickups.",
      icon: Bot,
      color: "bg-[#6E55F2]/10 border-[#6E55F2]/20 text-[#6E55F2]",
    },
    {
      title: "24×7 Support",
      desc: "Round-the-clock dedicated customer care and rapid emergency response assistance.",
      icon: Headphones,
      color: "bg-[#C24D2E]/10 border-[#C24D2E]/20 text-[#C24D2E]",
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 pb-16 lg:py-20 overflow-hidden min-h-[620px] flex items-center">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#3B36EA]/15 via-[#6E55F2]/15 to-[#C24D2E]/10 rounded-full blur-[150px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-xs font-extrabold uppercase tracking-wide">
                <Radio className="w-3.5 h-3.5 text-[#3B36EA] animate-pulse" />
                <span>Next-Gen Mobility Platform</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#1B1B1F] tracking-tight leading-[1.08]">
                Fairer Rides.<br />
                <span className="bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] bg-clip-text text-transparent block mt-1">
                  Safer Journeys.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#66687A] max-w-xl leading-relaxed font-normal">
                {hero.heroSubtitle || "The zero-commission ride-hailing platform designed for community trust. Fair pay for drivers, better prices for riders, and unmatched safety features."}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={hero.heroCtaLink || hero.ctaLink || "/plans"}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-base shadow-xl shadow-[#3B36EA]/25 hover:shadow-2xl hover:shadow-[#6E55F2]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>{hero.heroCtaText || hero.ctaText || "Start Riding Now"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 rounded-full bg-white hover:bg-[#F8F6FB] border border-[#ECEAF4] hover:border-[#3B36EA] text-[#3B36EA] font-bold text-base shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                >
                  Become a Driver
                </Link>
              </div>
            </div>

            {/* Right Mobile Mockup Column with Floating Badges */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
              <div className="absolute w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] bg-gradient-to-tr from-[#6E55F2]/25 via-[#EAE5FE]/40 to-[#C24D2E]/20 rounded-full blur-3xl -z-0" />

              <div className="relative z-10 group">
                <img
                  src="/mobile_photo.svg"
                  alt="Torkk Mobile App Preview"
                  className="w-full max-w-[340px] sm:max-w-[400px] h-auto drop-shadow-[0_25px_50px_rgba(59,54,234,0.2)] transition-transform duration-500 group-hover:scale-[1.02]"
                />

                <div className="absolute top-8 -left-6 sm:-left-10 bg-white/90 backdrop-blur-md border border-[#ECEAF4] p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3.5 animate-bounce [animation-duration:5s]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B36EA] to-[#6E55F2] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    0%
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#1B1B1F]">Zero Commission</p>
                    <p className="text-[10px] text-[#66687A]">100% Fare to Driver</p>
                  </div>
                </div>

                <div className="absolute bottom-12 -right-4 sm:-right-8 bg-white/90 backdrop-blur-md border border-[#ECEAF4] p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3.5 animate-bounce [animation-duration:6s] [animation-delay:1s]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#1B1B1F]">Aadhaar Verified</p>
                    <p className="text-[10px] text-[#66687A]">Live SOS Active</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
            <div className="p-5 rounded-3xl bg-white border border-slate-300 text-center shadow-md hover:border-[#3B36EA]/60 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#3B36EA]">0%</p>
              <p className="text-xs text-[#66687A] font-medium mt-1">Driver Commission</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-slate-300 text-center shadow-md hover:border-[#3B36EA]/60 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1F]">100%</p>
              <p className="text-xs text-[#66687A] font-medium mt-1">Driver Earnings Kept</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-slate-300 text-center shadow-md hover:border-[#3B36EA]/60 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1F]">24/7</p>
              <p className="text-xs text-[#66687A] font-medium mt-1">SOS & AI Monitoring</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-slate-300 text-center shadow-md hover:border-[#C24D2E]/60 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#C24D2E]">Fixed</p>
              <p className="text-xs text-[#66687A] font-medium mt-1">No Surge Manipulation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Torkk Grid */}
      <section id="why-torkk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3B36EA] mb-2">
            Why Torkk?
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1F]">
            Why Choose Torkk
          </h3>
          <p className="mt-3 text-[#66687A] text-base">
            We've built a zero-commission, safety-first platform engineered for riders, drivers, and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseTorkk.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-300 shadow-md hover:shadow-2xl hover:shadow-[#3B36EA]/15 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.color}`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B1B1F] mb-3">{item.title}</h3>
                  <p className="text-[#66687A] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How Trok Works 4-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - 4 Steps Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#3B36EA] mb-2">
                Simple & Fast
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1F]">
                How Trok Works
              </h3>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-5 relative pb-4">
                <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-slate-300 -z-0" />
                <div className="w-10 h-10 rounded-full border-2 border-[#3B36EA] text-[#3B36EA] font-semibold flex items-center justify-center bg-white shrink-0 z-10 text-base shadow-sm">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1B1B1F]">Book Ride</h4>
                  <p className="text-[#66687A] text-sm mt-1 leading-relaxed max-w-md">
                    Select your pickup and drop location, pick your preferred ride type, and confirm your booking in seconds.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-5 relative pb-4">
                <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-slate-300 -z-0" />
                <div className="w-10 h-10 rounded-full border-2 border-[#3B36EA] text-[#3B36EA] font-semibold flex items-center justify-center bg-white shrink-0 z-10 text-base shadow-sm">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1B1B1F]">Driver Match</h4>
                  <p className="text-[#66687A] text-sm mt-1 leading-relaxed max-w-md">
                    Our smart AI matching algorithm pairs you with the nearest verified driver partner at fair, upfront rates.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-5 relative pb-4">
                <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-slate-300 -z-0" />
                <div className="w-10 h-10 rounded-full border-2 border-[#3B36EA] text-[#3B36EA] font-semibold flex items-center justify-center bg-white shrink-0 z-10 text-base shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1B1B1F]">Secure Pickup</h4>
                  <p className="text-[#66687A] text-sm mt-1 leading-relaxed max-w-md">
                    Verify driver details, share your secure OTP, and step into a monitored, background-verified vehicle.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-5 relative">
                <div className="w-10 h-10 rounded-full border-2 border-[#3B36EA] text-[#3B36EA] font-semibold flex items-center justify-center bg-white shrink-0 z-10 text-base shadow-sm">
                  4
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1B1B1F]">Safe Drop</h4>
                  <p className="text-[#66687A] text-sm mt-1 leading-relaxed max-w-md">
                    Arrive at your destination safely with automated digital billing and 100% fare payout to the driver.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#F8F6FB] rounded-[36px] p-6 sm:p-10 border border-slate-300 shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
              <img
                src="/how_it_work_photo.svg"
                alt="How Trok Works Platform Mockup"
                className="w-full h-auto rounded-2xl drop-shadow-sm"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Staggered Bento Grid Safety Section */}
      <section id="safety" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6E55F2]/10 border border-[#6E55F2]/30 text-[#3B36EA] text-xs font-extrabold uppercase tracking-wide mb-3">
            <Shield className="w-3.5 h-3.5 text-[#6E55F2]" />
            <span>Safety First</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1B1B1F] tracking-tight">
            Safety Section
          </h2>
          <p className="mt-3 text-[#66687A] text-base leading-relaxed">
            Multi-layered verification, biometric controls, and real-time telemetry protecting every single journey.
          </p>
        </div>

        {/* 4-Column Staggered Bento Grid with Darker Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          
          {/* COLUMN 1 */}
          <div className="space-y-6 flex flex-col">
            {/* Aadhaar Verification (Tall Card) */}
            <div className="bg-gradient-to-b from-white via-white to-[#F8F6FB] p-8 rounded-[32px] border-2 border-slate-300 shadow-md hover:shadow-2xl hover:shadow-[#3B36EA]/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#3B36EA] transition-all duration-500 group relative overflow-hidden min-h-[340px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#3B36EA]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#3B36EA]/10 border border-[#3B36EA]/30 text-[#3B36EA] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Fingerprint className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-[10px] font-extrabold uppercase tracking-wider">
                    Govt ID
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#1B1B1F] mb-3 group-hover:text-[#3B36EA] transition-colors">
                  Aadhaar Verification
                </h3>
                <p className="text-xs text-[#66687A] leading-relaxed">
                  Mandatory Govt Aadhaar verification for all driver partners prior to onboarding, ensuring total identity security.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 flex items-center gap-2 text-[11px] font-bold text-[#3B36EA]">
                <span>100% Identity Audit</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Same Gender Ride (Compact Card) */}
            <div className="bg-white p-7 rounded-[32px] border-2 border-slate-300 shadow-md hover:shadow-2xl hover:shadow-[#3B36EA]/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#3B36EA] transition-all duration-500 group min-h-[220px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#3B36EA]/10 border border-[#3B36EA]/30 text-[#3B36EA] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Bike className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1B1B1F] mb-1.5 group-hover:text-[#3B36EA] transition-colors">
                  Same Gender Ride (Bike)
                </h3>
                <p className="text-xs text-[#66687A] leading-relaxed">
                  Option for commuters to choose same-gender bike drivers for maximum comfort.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-6 flex flex-col">
            {/* Driver Verification (Compact Card) */}
            <div className="bg-white p-7 rounded-[32px] border-2 border-slate-300 shadow-md hover:shadow-2xl hover:shadow-[#6E55F2]/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#6E55F2] transition-all duration-500 group min-h-[220px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#6E55F2]/10 border border-[#6E55F2]/30 text-[#6E55F2] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1B1B1F] mb-1.5 group-hover:text-[#6E55F2] transition-colors">
                  Driver Verification
                </h3>
                <p className="text-xs text-[#66687A] leading-relaxed">
                  Comprehensive background checks, license validation, and vehicle inspection.
                </p>
              </div>
            </div>

            {/* Biometric Authentication (Tall Card) */}
            <div className="bg-gradient-to-b from-white via-white to-[#F8F6FB] p-8 rounded-[32px] border-2 border-slate-300 shadow-md hover:shadow-2xl hover:shadow-[#6E55F2]/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#6E55F2] transition-all duration-500 group relative overflow-hidden min-h-[340px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#6E55F2]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#6E55F2]/10 border border-[#6E55F2]/30 text-[#6E55F2] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Lock className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#6E55F2]/10 border border-[#6E55F2]/20 text-[#6E55F2] text-[10px] font-extrabold uppercase tracking-wider">
                    Face AI Scan
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#1B1B1F] mb-3 group-hover:text-[#6E55F2] transition-colors">
                  Biometric Authentication
                </h3>
                <p className="text-xs text-[#66687A] leading-relaxed">
                  Advanced AI facial recognition login for drivers prior to starting any trip shift, preventing identity impersonation.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 flex items-center gap-2 text-[11px] font-bold text-[#6E55F2]">
                <span>Shift Guard Active</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-6 flex flex-col">
            {/* Live Ride Tracking (Tall Feature Card) */}
            <div className="bg-gradient-to-b from-white via-white to-[#F8F6FB] p-8 rounded-[32px] border-2 border-slate-300 shadow-md hover:shadow-2xl hover:shadow-[#C24D2E]/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#C24D2E] transition-all duration-500 group relative overflow-hidden min-h-[360px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#C24D2E]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#C24D2E]/10 border border-[#C24D2E]/30 text-[#C24D2E] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#C24D2E]/10 border border-[#C24D2E]/20 text-[#C24D2E] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C24D2E] animate-ping" />
                    Live Telemetry
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#1B1B1F] mb-3 group-hover:text-[#C24D2E] transition-colors">
                  Live Ride Tracking
                </h3>
                <p className="text-xs text-[#66687A] leading-relaxed">
                  Real-time GPS ride monitoring and live location sharing with trusted family members and emergency contacts.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-[#C24D2E]">
                <span>Deviation Alerts</span>
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* Female Driver Preference (Compact Card) */}
            <div className="bg-white p-7 rounded-[32px] border-2 border-slate-300 shadow-md hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-pink-500 transition-all duration-500 group min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1B1B1F] mb-1.5 group-hover:text-pink-600 transition-colors">
                  Female Driver Preference
                </h3>
                <p className="text-xs text-[#66687A] leading-relaxed">
                  Dedicated option for female commuters to select verified female drivers.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 4 */}
          <div className="space-y-6 flex flex-col">
            {/* Emergency SOS (Featured Highlight Card) */}
            <div className="bg-gradient-to-b from-white via-white to-red-50/50 p-8 rounded-[32px] border-2 border-red-300 shadow-md hover:shadow-2xl hover:shadow-red-500/25 hover:-translate-y-2 hover:scale-[1.02] hover:border-red-500 transition-all duration-500 group relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <PhoneCall className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-600 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    24/7 SOS
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#1B1B1F] mb-3 group-hover:text-red-600 transition-colors">
                  Emergency SOS
                </h3>
                <p className="text-xs text-[#66687A] leading-relaxed">
                  One-tap direct link to police control rooms and Torkk rapid dispatch response units with instantaneous broadcast of ride details and GPS coordinates.
                </p>
              </div>
              <div className="pt-6 border-t border-red-200 flex items-center justify-between text-[11px] font-bold text-red-600">
                <span>Instant Response Relay</span>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Subscription Plans Quick View */}
      <section id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3B36EA] mb-2">
            Subscription Plans
          </h2>
          <h3 className="text-3xl font-extrabold text-[#1B1B1F]">
            Simple, Transparent Pricing
          </h3>
          <p className="mt-2 text-[#66687A] text-sm">
            No hidden fees or commission slices. Choose the plan that fits your mobility needs.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading subscription plans..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activePlans.slice(0, 3).map((plan) => (
              <div
                key={plan.id}
                className={`bg-white p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between ${
                  plan.isPopular
                    ? "border-[#3B36EA] shadow-xl shadow-[#3B36EA]/15 scale-[1.02]"
                    : "border-slate-300 hover:border-[#6E55F2] shadow-md hover:shadow-xl"
                }`}
              >
                <div>
                  {plan.isPopular && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-[10px] uppercase tracking-wider mb-4 inline-block shadow-sm">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-[#1B1B1F]">{plan.name}</h4>
                  <p className="text-xs text-[#66687A] mt-1 min-h-[32px]">{plan.description}</p>
                  <div className="my-5 py-3 border-t border-b border-slate-200 min-h-[64px] flex items-center overflow-hidden">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1F] tracking-tight break-words">
                      {formatPrice(plan)}
                    </span>
                  </div>
                  <ul className="space-y-3 text-xs text-[#66687A] mb-8">
                    {plan.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3B36EA] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/plans"
                  className="block w-full py-3 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-xs text-center transition-all duration-300 shadow-md shadow-[#3B36EA]/20 hover:shadow-lg hover:scale-[1.02]"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Download CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl shadow-[#3B36EA]/5 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-[#3B36EA]/10 via-[#6E55F2]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1F] mb-4">
            Join Thousands Choosing Fairer Mobility
          </h3>
          <p className="text-[#66687A] text-base max-w-xl mx-auto mb-8">
            Download Trok today on iOS or Android and experience zero-commission transparency.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-6 py-3.5 rounded-full bg-[#1D1D27] hover:bg-[#1B1B1F] text-white font-semibold text-sm flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-md">
              <Download className="w-5 h-5 text-[#6E55F2]" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase">Get it on</span>
                <span className="block text-xs font-bold">Google Play</span>
              </div>
            </button>
            <button className="px-6 py-3.5 rounded-full bg-[#1D1D27] hover:bg-[#1B1B1F] text-white font-semibold text-sm flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-md">
              <Download className="w-5 h-5 text-[#6E55F2]" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase">Download on the</span>
                <span className="block text-xs font-bold">App Store</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}