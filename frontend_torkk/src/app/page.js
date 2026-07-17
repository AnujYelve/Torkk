"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/sections/Hero/Hero";
import WhyChoose from "@/sections/WhyChoose/WhyChoose";
import Footer from "@/sections/Footer/Footer";
import WaitlistModal from "@/components/waitlist/WaitlistModal";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <Navbar />

      <Hero openWaitlist={() => setIsWaitlistOpen(true)} />

      <WhyChoose />

      <Footer openWaitlist={() => setIsWaitlistOpen(true)} />

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </>
  );
}