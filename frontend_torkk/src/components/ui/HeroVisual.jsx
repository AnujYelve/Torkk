import Image from "next/image";
import {
  FaShieldAlt,
  FaStar,
  FaWallet,
} from "react-icons/fa";

import FloatingCard from "./FloatingCard";

export default function HeroVisual() {
  return (
    <div className="relative flex w-full justify-center lg:w-1/2">

      {/* Background Circle */}

      <div className="absolute top-12 h-[430px] w-[430px] rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 blur-3xl opacity-70" />

      {/* Main Card */}

      <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">

        <Image
          src="/hero-banner.png"
          alt="Torkk Ride"
          width={620}
          height={420}
          className="rounded-[24px] object-cover"
          priority
        />

        {/* Bottom Gradient */}

        <div className="absolute inset-x-4 bottom-4 rounded-[24px] bg-gradient-to-t from-black/40 via-black/10 to-transparent p-8" />
      </div>

      {/* Floating Cards */}

      <FloatingCard
        icon={<FaWallet size={18} />}
        title="Driver Earnings"
        value="0% Commission"
        className="-left-2 bottom-16"
      />

      {/* <FloatingCard
        icon={<FaStar size={18} />}
        title="Average Rating"
        value="4.9 / 5"
        className="-right-3 top-10"
      /> */}

      <FloatingCard
        icon={<FaShieldAlt size={18} />}
        title="Ride Safety"
        value="Verified Drivers"
        className="-right-3 top-10"
      />
    </div>
  );
}