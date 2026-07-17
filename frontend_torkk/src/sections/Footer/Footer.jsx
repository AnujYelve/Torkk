"use client";

import Link from "next/link";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import {
    ArrowRight
}from "lucide-react"

export default function Footer( {openWaitlist}) {
  return (


    
    <footer className="border-t border-white/10 bg-[#070B14]">


        
      <div className="mx-auto max-w-7xl px-6 py-12">



        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black tracking-wide text-white">
              TORKK
            </h2>

            <p className="mt-4 max-w-md text-gray-400 leading-7">
              Built for Riders. Trusted by Drivers.
              Experience safe, smart and seamless mobility with Torkk.
            </p>

            <button
            onClick={openWaitlist}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            >
              Join Waitlist
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-blue-500 transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="/careers" className="hover:text-blue-500 transition">
                  Careers
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-blue-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Product
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#riders" className="hover:text-blue-500 transition">
                  Riders
                </a>
              </li>

              <li>
                <a href="#drivers" className="hover:text-blue-500 transition">
                  Drivers
                </a>
              </li>

              <li>
                <a href="#safety" className="hover:text-blue-500 transition">
                  Safety
                </a>
              </li>
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Legal
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-blue-500 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-blue-500 transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="mb-4 font-semibold text-white">
                Follow Us
              </h4>

             <div className="flex gap-3">

  <a
    href="#"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white"
  >
    <FaLinkedinIn size={18} />
  </a>

  <a
    href="#"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:scale-110 hover:bg-pink-500 hover:text-white"
  >
    <FaInstagram size={18} />
  </a>

  <a
    href="#"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
  >
    <FaXTwitter size={18} />
  </a>



</div>
            </div>

          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row">
          <p>© 2026 Torkkk. All rights reserved.</p>

          <p>
            Made with <span className="text-red-500">❤</span> in India
          </p>
        </div>

      </div>
    </footer>
  );
}