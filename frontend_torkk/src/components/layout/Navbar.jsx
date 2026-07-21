"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Lock } from "lucide-react";
import { settingsService } from "../../services/api";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Fetch global site settings for branding/logo
    settingsService
      .getSettings()
      .then((data) => setSiteSettings(data))
      .catch(() => { });

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Plans", href: "/plans" },
    // { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    // { name: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md border-b border-[#ECEAF4] shadow-sm shadow-slate-200/50 py-3"
        : "bg-white/80 backdrop-blur-sm border-b border-[#ECEAF4]/60 py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <img
              src={siteSettings?.logoUrlLight || "/logo.png"}
              alt={siteSettings?.companyName || "Trok"}
              className="h-14 sm:h-16 w-auto object-contain max-h-16 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1B1B1F] group-hover:text-[#3B36EA] transition-colors">
              {siteSettings?.companyName || "Trok"}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/90 px-4 py-1.5 rounded-full border border-[#ECEAF4] shadow-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${isActive
                    ? "text-white bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] shadow-sm shadow-[#3B36EA]/20"
                    : "text-[#66687A] hover:text-[#1B1B1F] hover:bg-[#F8F6FB]"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            {/* Admin Portal Link commented out as requested */}
            {/* <Link
              href="/admin/login"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#3B36EA] bg-white hover:bg-[#F8F6FB] border border-[#6E55F2]/30 hover:border-[#3B36EA] rounded-full shadow-sm hover:shadow transition-all duration-300 hover:scale-105"
            >
              <Lock className="w-3.5 h-3.5" />
              Admin Portal
            </Link> */}
            <Link
              href="/contact"
              className="px-6 py-2.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white hover:shadow-lg hover:shadow-[#3B36EA]/25 shadow-md shadow-[#3B36EA]/15 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1B1B1F] hover:bg-[#F8F6FB] focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#ECEAF4] px-4 pt-3 pb-6 mt-3 space-y-2 rounded-b-2xl shadow-xl shadow-slate-200/50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-full text-base font-medium transition-all ${pathname === link.href
                ? "bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-semibold shadow-md"
                : "text-[#66687A] hover:bg-[#F8F6FB] hover:text-[#1B1B1F]"
                }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#ECEAF4] space-y-2">
            {/* Admin Portal Mobile Link commented out as requested */}
            {/* <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-[#3B36EA] bg-white border border-[#6E55F2]/30 rounded-full shadow-sm"
            >
              <Lock className="w-4 h-4" />
              Admin Portal
            </Link> */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}