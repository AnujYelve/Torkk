import Link from "next/link";
import Image from "next/image";
import { UserRound } from "lucide-react";

import Container from "../ui/Container";
import { navLinks } from "@/constants/navigation";

export default function Navbar() {
  return (
    <header className="fixed top-5 left-0 z-50 w-full">
      <Container>
        <nav className="flex h-20 items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-8 shadow-2xl backdrop-blur-2xl">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-90"
          >
            <Image
              src="/images/logo/torkk-logo.png"
              alt="Torkkk Logo"
              width={42}
              height={42}
              priority
            />

            <span className="text-2xl font-bold tracking-tight text-white">
              Torkk
            </span>
          </Link>

          {/* Navigation */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="relative text-[15px] font-medium text-slate-300 transition-all duration-300 hover:text-blue-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Account */}
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10">
            <UserRound size={20} strokeWidth={2} />
          </button>
        </nav>
      </Container>
    </header>
  );
}