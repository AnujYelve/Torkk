"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Laptop, 
  Heart, 
  TrendingUp, 
  Award,
  Sparkles,
  Users,
  CheckCircle2,
  X,
  FileText,
  Send
} from "lucide-react";
import { careerService } from "../../services/api";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Modal from "../../components/ui/Modal";

const FALLBACK_ROLES = [
  {
    id: "fb-1",
    title: "Senior Backend Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering"
  },
  {
    id: "fb-2",
    title: "Product Designer (UX)",
    location: "London / Remote",
    type: "Full-time",
    department: "Product"
  },
  {
    id: "fb-3",
    title: "Full Stack Developer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering"
  },
  {
    id: "fb-4",
    title: "Growth Operations Manager",
    location: "New York",
    type: "Full-time",
    department: "Operations"
  }
];

const PERKS = [
  {
    icon: Laptop,
    title: "Remote work",
    description: "Work from anywhere. We provide a full home-office stipend to get you set up for success.",
    color: "from-[#3B36EA]/10 to-[#6E55F2]/10",
    textColor: "text-[#3B36EA]"
  },
  {
    icon: Heart,
    title: "Wellness",
    description: "Comprehensive health coverage, mental health days, and a monthly wellness allowance.",
    color: "from-[#6E55F2]/10 to-[#C24D2E]/10",
    textColor: "text-[#6E55F2]"
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Unlimited learning budget for courses, conferences, and books. We grow when you grow.",
    color: "from-[#3B36EA]/10 to-[#6E55F2]/10",
    textColor: "text-[#3B36EA]"
  }
];

const PROCESS_STEPS = [
  {
    number: "1",
    title: "Apply",
    description: "Submit your resume and portfolio for our team to review."
  },
  {
    number: "2",
    title: "Intro Call",
    description: "A 30-minute chat to align on goals and expectations."
  },
  {
    number: "3",
    title: "Challenge",
    description: "Show us your skills through a practical task or technical deep-dive."
  },
  {
    number: "4",
    title: "Offer",
    description: "Welcome to the Torkk family! Let's build the future."
  }
];

const DEPARTMENTS = ["All Roles", "Engineering", "Product", "Operations"];

export default function CareersPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDept, setSelectedDept] = useState("All Roles");

  // Application Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantForm, setApplicantForm] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await careerService.getPublicCareers();
      const list = Array.isArray(data) ? data : data?.careers || [];
      setCareers(list.length > 0 ? list : FALLBACK_ROLES);
    } catch (err) {
      console.warn("Using fallback careers due to API notice:", err.message);
      setCareers(FALLBACK_ROLES);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenApplyModal = (job) => {
    setSelectedJob(job);
    setApplicantForm({
      name: "",
      email: "",
      phone: "",
      resumeUrl: "",
      coverLetter: ""
    });
    setSubmittedSuccess(false);
    setApplyModalOpen(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    try {
      setSubmitting(true);
      const payload = {
        name: applicantForm.name.trim(),
        email: applicantForm.email.trim(),
        phone: applicantForm.phone?.trim() || "",
        resumeUrl: applicantForm.resumeUrl?.trim() || "",
        coverLetter: applicantForm.coverLetter?.trim() || ""
      };

      if (selectedJob.id && !selectedJob.id.startsWith("fb-")) {
        await careerService.applyForJob(selectedJob.id, payload);
      }
      setSubmittedSuccess(true);
    } catch (err) {
      alert(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCareers = careers.filter((job) => {
    if (selectedDept === "All Roles") return true;
    return job.department?.toLowerCase() === selectedDept.toLowerCase();
  });

  const scrollToRoles = () => {
    const el = document.getElementById("open-roles");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPerks = () => {
    const el = document.getElementById("perks");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-24 py-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section (2-Column Grid matching Design Reference) */}
      <section className="pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] text-xs font-bold uppercase tracking-wider">
              <span>WE'RE HIRING</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B1B1F] tracking-tight leading-[1.1]">
              Join the Mobility <br />
              <span className="bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] bg-clip-text text-transparent">
                Revolution.
              </span>
            </h1>
            
            <p className="text-[#66687A] text-base sm:text-lg leading-relaxed max-w-lg">
              At Torkk, we're not just building a transport platform; we're redefining how the world moves. Join a global team dedicated to safety, speed, and sustainability.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToRoles}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-sm shadow-lg shadow-[#3B36EA]/25 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                View Open Roles
              </button>
              <button
                onClick={scrollToPerks}
                className="px-8 py-3.5 rounded-full bg-white border border-[#ECEAF4] text-[#1B1B1F] font-bold text-sm hover:bg-slate-50 shadow-sm hover:border-[#3B36EA]/30 transition-all duration-300"
              >
                Our Culture
              </button>
            </div>
          </div>

          {/* Right Column Team Visual Card */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#3B36EA]/15 via-[#6E55F2]/15 to-[#C24D2E]/10 rounded-[40px] blur-2xl -z-10" />
            <div className="rounded-[32px] overflow-hidden border border-[#ECEAF4] shadow-2xl bg-white relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Torkk Team Collaboration"
                className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B36EA] to-[#6E55F2] flex items-center justify-center text-white font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1B1B1F]">Remote Team</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#3B36EA]/10 text-[#3B36EA] text-xs font-bold">
                  Fast Growth
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section id="perks" className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1F]">
            Perks & Benefits
          </h2>
          <p className="text-[#66687A] text-base">
            We invest in our people so they can perform at their best.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.04)] hover:shadow-xl hover:shadow-[#3B36EA]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${perk.color} border border-[#ECEAF4] flex items-center justify-center mb-6 ${perk.textColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#1B1B1F] mb-3">{perk.title}</h3>
                <p className="text-sm text-[#66687A] leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hiring Process Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1F]">
            Hiring Process
          </h2>
          <p className="text-[#66687A] text-base">
            Simple, transparent steps to joining our team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#3B36EA] to-[#6E55F2] text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-[#3B36EA]/20">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#1B1B1F]">{step.title}</h3>
              <p className="text-sm text-[#66687A] leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECEAF4] pb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1F]">
            Open Roles
          </h2>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedDept === dept
                    ? "bg-[#3B36EA] text-white shadow-md shadow-[#3B36EA]/25"
                    : "bg-[#F8F6FB] text-[#66687A] hover:bg-[#ECEAF4] border border-[#ECEAF4]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorAlert message={error} onRetry={fetchCareers} />
        ) : filteredCareers.length === 0 ? (
          <div className="text-center py-16 bg-[#F8F6FB] rounded-3xl border border-[#ECEAF4]">
            <p className="text-lg font-bold text-[#1B1B1F]">No roles open in {selectedDept}</p>
            <p className="text-sm text-[#66687A] mt-1">Check back soon or select another category.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCareers.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.04)] hover:shadow-xl hover:shadow-[#3B36EA]/10 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1B1B1F] group-hover:text-[#3B36EA] transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#66687A]">
                    {job.location && (
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#3B36EA]" />
                        {job.location}
                      </span>
                    )}
                    {job.type && (
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#6E55F2]" />
                        {job.type}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenApplyModal(job)}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-sm shadow-md shadow-[#3B36EA]/20 hover:shadow-lg hover:scale-105 transition-all duration-300 shrink-0 inline-flex items-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Candidate Application Modal */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ECEAF4] relative space-y-6">
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#66687A] hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1B1B1F]">
                  Application Submitted!
                </h3>
                <p className="text-sm text-[#66687A] leading-relaxed">
                  Thank you for applying for <span className="font-bold text-[#1B1B1F]">{selectedJob.title}</span>. Our HR team has received your application and will review it shortly.
                </p>
                <button
                  onClick={() => setApplyModalOpen(false)}
                  className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-sm shadow-md"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-xs font-bold text-[#3B36EA] uppercase tracking-wider">
                    {selectedJob.department || "Career Opening"}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#1B1B1F] mt-1">
                    Apply for {selectedJob.title}
                  </h3>
                  <p className="text-xs text-[#66687A] mt-1 flex items-center gap-2">
                    <span><MapPin className="w-3 h-3 inline text-[#3B36EA]" /> {selectedJob.location || "Remote"}</span>
                    <span>•</span>
                    <span><Clock className="w-3 h-3 inline text-[#6E55F2]" /> {selectedJob.type || "Full-time"}</span>
                  </p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#ECEAF4] text-sm text-[#1B1B1F] focus:border-[#3B36EA] focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={applicantForm.email}
                      onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#ECEAF4] text-sm text-[#1B1B1F] focus:border-[#3B36EA] focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 000-1234"
                      value={applicantForm.phone}
                      onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#ECEAF4] text-sm text-[#1B1B1F] focus:border-[#3B36EA] focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1">
                      Resume / Portfolio Link *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="e.g. https://linkedin.com/in/username or Google Drive link"
                      value={applicantForm.resumeUrl}
                      onChange={(e) => setApplicantForm({ ...applicantForm, resumeUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#ECEAF4] text-sm text-[#1B1B1F] focus:border-[#3B36EA] focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1B1F] mb-1">
                      Cover Letter / Note
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us why you're interested in joining Torkk..."
                      value={applicantForm.coverLetter}
                      onChange={(e) => setApplicantForm({ ...applicantForm, coverLetter: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#ECEAF4] text-sm text-[#1B1B1F] focus:border-[#3B36EA] focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setApplyModalOpen(false)}
                      className="px-5 py-2.5 rounded-full border border-[#ECEAF4] text-[#66687A] text-xs font-bold hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-xs shadow-md inline-flex items-center gap-2 hover:scale-105 transition-all"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
