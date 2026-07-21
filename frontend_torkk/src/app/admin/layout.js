"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  CreditCard,
  Settings,
  Globe,
  User,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Mail,
} from "lucide-react";
import { authService } from "../../services/api";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If we are on the login page itself, don't enforce layout checks
    if (pathname === "/admin/login") return;

    const token = localStorage.getItem("torkk_admin_token") || localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const savedUser = localStorage.getItem("torkk_admin_user");
    if (savedUser) {
      try {
        setAdminUser(JSON.parse(savedUser));
      } catch (e) {}
    }

    // Verify token validity from backend
    authService
      .getMe()
      .then((data) => {
        if (data?.user) setAdminUser(data.user);
        else if (data?.admin) setAdminUser(data.admin);
      })
      .catch(() => {
        authService.logout();
        router.replace("/admin/login");
      });
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!mounted) return null;

  const navItems = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
    { name: "Careers & Applicants", href: "/admin/careers", icon: Briefcase },
    { name: "Contact Submissions", href: "/admin/contact", icon: Mail },
    { name: "Subscription Plans", href: "/admin/plans", icon: CreditCard },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
    { name: "Homepage CMS", href: "/admin/homepage", icon: Globe },
    { name: "Admin Profile", href: "/admin/profile", icon: User },
  ];

  const handleLogout = () => {
    authService.logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0">
        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3B36EA] to-[#6E55F2] flex items-center justify-center shadow-md shadow-[#3B36EA]/20">
            <ShieldCheck className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base tracking-tight">Trok Admin</h1>
            <p className="text-[10px] text-[#3B36EA] font-bold uppercase tracking-wider">
              Staff Portal
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#3B36EA] to-[#6E55F2] text-white shadow-md shadow-[#3B36EA]/20 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 mb-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center text-xs">
              {adminUser?.email ? adminUser.email[0].toUpperCase() : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {adminUser?.email || "Admin User"}
              </p>
              <p className="text-[10px] text-slate-500 uppercase font-medium">
                {adminUser?.role || "SUPER_ADMIN"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-colors text-xs font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              {navItems.find((n) => n.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 font-medium text-[10px]">
              System Operational
            </span>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors font-medium"
            >
              View Live Site ↗
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-slate-50">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 bg-white h-full flex flex-col border-r border-slate-200 z-10 p-4">
            <div className="p-2 mb-4 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-900 text-base">Trok Admin</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold ${
                      isActive ? "bg-amber-500 text-slate-950" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-red-600 text-xs font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
