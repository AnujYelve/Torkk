"use client";

import HeroContent from "./HeroContent";
import PhoneMockup from "./PhoneMockup";

export default function Hero({ openWaitlist }) {
  return (
    <section className="min-h-screen bg-[#070B14] pt-36">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-20 px-8">

        <HeroContent openWaitlist={openWaitlist} />

        <PhoneMockup />

      </div>
    </section>
  );
}