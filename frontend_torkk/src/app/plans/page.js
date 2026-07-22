"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  HelpCircle,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { subscriptionService, faqService } from "../../services/api";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorAlert from "../../components/ui/ErrorAlert";
import EmptyState from "../../components/ui/EmptyState";

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetRole, setTargetRole] = useState("DRIVER");
  const [openFaqId, setOpenFaqId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [plansRes, faqsRes] = await Promise.all([
        subscriptionService.getPublicPlans().catch(() => []),
        faqService.getPublicFaqs().catch(() => []),
      ]);
      setPlans(plansRes || []);
      setFaqs(faqsRes || []);
    } catch (err) {
      setError(err.message || "Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const fallbackPlans = [
    {
      id: "f-1",
      name: "Driver Basic",
      type: "DRIVER",
      displayPrice: "₹1,499/month",
      description: "Ideal for part-time drivers aiming for max flexibility.",
      features: ["0% Fare Commission", "Instant Weekly Payouts", "Standard Support"],
      isPopular: false,
    },
    {
      id: "f-2",
      name: "Driver Pro",
      type: "DRIVER",
      displayPrice: "₹2,999/month",
      description: "For full-time professional drivers aiming for maximum earnings.",
      features: ["0% Fare Commission", "Priority 24/7 SOS Support", "Unlimited Trips", "Advanced Analytics"],
      isPopular: true,
    },
    {
      id: "f-3",
      name: "Driver Fleet",
      type: "DRIVER",
      displayPrice: "₹4,999/month",
      description: "For multi-vehicle owners managing small driver teams.",
      features: ["Up to 5 Vehicles", "Dedicated Fleet Manager", "Fleet Telemetry"],
      isPopular: false,
    },
    {
      id: "f-4",
      name: "Commuter Pass",
      type: "RIDER",
      displayPrice: "₹499/month",
      description: "Flat discounted fares for daily office & campus commuters.",
      features: ["15% Off Peak Trips", "Priority Booking", "Zero Surge Pricing"],
      isPopular: true,
    },
    {
      id: "f-5",
      name: "Rider Unlimited Pass",
      type: "RIDER",
      displayPrice: "₹999/month",
      description: "Unlimited priority matching and zero surge fees for frequent riders.",
      features: ["25% Off All Trips", "VIP Driver Matching", "Zero Surge Pricing", "Free Ride Cancellations"],
      isPopular: false,
    },
    {
      id: "f-6",
      name: "Enterprise Corporate Pass",
      type: "ENTERPRISE",
      displayPrice: "₹4,999/month",
      description: "Corporate travel accounts for company employee daily commuting.",
      features: ["Centralized Corporate Billing", "Dedicated Account Manager", "Custom Expense Receipts", "Employee Usage Dashboard"],
      isPopular: true,
    },
    {
      id: "f-7",
      name: "Enterprise Custom Tier",
      type: "ENTERPRISE",
      displayPrice: "Custom Pricing",
      description: "Tailored mobility solutions for large organizations and university campuses.",
      features: ["Custom API Integrations", "24/7 Dedicated Account Lead", "SLA Guarantee", "Volume Based Rebates"],
      isPopular: false,
    },
  ];

  // Combine backend plans with fallback plans so every role category (DRIVER, RIDER, ENTERPRISE) is populated
  const activePlansList = [...plans];
  fallbackPlans.forEach((fbPlan) => {
    const fbType = fbPlan.type.toUpperCase();
    const hasCategoryInBackend = plans.some(
      (p) => (p.type || p.targetRole || "").toUpperCase().startsWith(fbType)
    );
    if (!hasCategoryInBackend) {
      activePlansList.push(fbPlan);
    }
  });

  const filteredPlans = activePlansList.filter((p) => {
    const pType = (p.type || p.targetRole || "").toUpperCase();
    return pType.startsWith(targetRole);
  });

  const fallbackFaqs = [
    {
      id: 1,
      question: "How does the 0% commission driver model work?",
      answer:
        "Torkk charges driver partners a flat weekly or monthly subscription fee instead of taking a percentage cut (25-30%) of each fare. You keep 100% of the trip total paid by passengers.",
    },
    {
      id: 2,
      question: "Can I switch or cancel my plan at any time?",
      answer:
        "Yes! You can upgrade, downgrade, or pause your subscription plan directly from your driver profile with zero cancellation penalties.",
    },
    {
      id: 3,
      question: "Are there any hidden payout or credit card fees?",
      answer:
        "No hidden platform fees. Standard banking instant payout fees may apply if you request same-day instant transfers, but regular scheduled weekly payouts are 100% free.",
    },
    {
      id: 4,
      question: "What safety features are included in my subscription?",
      answer:
        "All plans include 24/7 SOS telemetry monitoring, automatic trip sharing with emergency contacts, biometric driver login security, and round-the-clock priority support.",
    },
  ];

  const formatPrice = (plan) => {
    if (!plan) return "Free";
    if (plan.displayPrice) {
      let priceStr = plan.displayPrice.replace(/[\$₦]/g, "₹");
      if (!priceStr.includes("₹") && !priceStr.toLowerCase().includes("free") && !priceStr.toLowerCase().includes("custom")) {
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

  const activeFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-[#3B36EA]/10 via-[#6E55F2]/10 to-[#C24D2E]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6E55F2]/10 border border-[#6E55F2]/20 text-[#3B36EA] text-xs font-bold uppercase tracking-wide">
            <Zap className="w-3.5 h-3.5 text-[#6E55F2]" />
            <span>Transparent Pricing</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
            Keep 100% of What You Earn. <br />
            <span className="bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] bg-clip-text text-transparent">Zero Commission Platform.</span>
          </h1>
          <p className="text-lg text-[#66687A] max-w-2xl mx-auto leading-8">
            Choose a predictable subscription plan tailored for your driving schedule or mobility needs. No surprise surge deductions.
          </p>

          {/* Role Toggle Switch */}
          <div className="pt-6 flex justify-center">
            <div className="bg-white p-1.5 rounded-full border border-[#ECEAF4] shadow-sm flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setTargetRole("DRIVER")}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  targetRole === "DRIVER"
                    ? "bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white shadow-md shadow-[#3B36EA]/20"
                    : "text-[#66687A] hover:text-[#1B1B1F] hover:bg-[#F8F6FB]"
                }`}
              >
                Driver Partner Plans
              </button>
              <button
                onClick={() => setTargetRole("RIDER")}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  targetRole === "RIDER"
                    ? "bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white shadow-md shadow-[#3B36EA]/20"
                    : "text-[#66687A] hover:text-[#1B1B1F] hover:bg-[#F8F6FB]"
                }`}
              >
                Rider Passes
              </button>
              <button
                onClick={() => setTargetRole("ENTERPRISE")}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  targetRole === "ENTERPRISE"
                    ? "bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white shadow-md shadow-[#3B36EA]/20"
                    : "text-[#66687A] hover:text-[#1B1B1F] hover:bg-[#F8F6FB]"
                }`}
              >
                Enterprise Corporate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner text="Fetching plans..." />
        ) : error ? (
          <ErrorAlert message={error} onRetry={fetchData} />
        ) : filteredPlans.length === 0 ? (
          <EmptyState
            icon={Zap}
            title={`No ${targetRole.toLowerCase()} plans listed yet`}
            description="We are updating our plan tiers for this category. Check back shortly!"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                  plan.isPopular
                    ? "border-[#3B36EA] shadow-xl shadow-[#3B36EA]/10 scale-105"
                    : "border-[#ECEAF4] hover:border-[#6E55F2]/40 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#1B1B1F] leading-tight">{plan.name}</h3>
                    <span className="px-3 py-1 rounded-full bg-[#F8F6FB] border border-[#ECEAF4] text-[#3B36EA] text-[10px] uppercase font-bold">
                      {plan.type || plan.targetRole}
                    </span>
                  </div>

                  <p className="text-xs text-[#66687A] min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="py-4 border-t border-b border-[#ECEAF4] min-h-[68px] flex items-center overflow-hidden">
                    <span className="text-2xl sm:text-3xl font-bold text-[#1B1B1F] tracking-tight break-words">
                      {formatPrice(plan)}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-[#1B1B1F] uppercase tracking-wider leading-tight">
                      Included Features
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#66687A]">
                      {plan.features?.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#3B36EA] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6E55F2]/10 border border-[#6E55F2]/20 text-[#3B36EA] text-xs font-bold uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#6E55F2]" />
            <span>Got Questions?</span>
          </div>
          <h3 className="text-3xl font-bold text-[#1B1B1F] leading-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {activeFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-3xl border border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.04)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#1B1B1F] hover:text-[#3B36EA] transition-colors"
                >
                  <span className="text-base">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#3B36EA] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#66687A] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#66687A] leading-8 border-t border-[#ECEAF4] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
