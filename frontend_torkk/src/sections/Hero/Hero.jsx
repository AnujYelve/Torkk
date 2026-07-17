"use client";

import { useState } from "react";

import HeroContent from "./HeroContent";
import PhoneMockup from "./PhoneMockup";
import WaitlistModal from "@/components/waitlist/WaitlistModal";

export default function Hero() {

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-[#070B14] pt-36">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-20 px-8">

          <HeroContent
            openWaitlist={() => setIsWaitlistOpen(true)}
          />

          <PhoneMockup />

        </div>
      </section>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </>
  );
}