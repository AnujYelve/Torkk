"use client";

import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import CaptainIllustration from "./CaptainIllustration";

const captainFeatures = [
  "Flexible Working Hours",
  "Weekly Payments",
  "More Rides, More Earnings",
  "24/7 Captain Support",
];

export default function CaptainSection() {
  const handleStartDriving = () => {
    // Driver App Play Store Link
    window.open(
      "#",
      "_blank"
    );
  };

  return (
    <section className="bg-[#FAFAFC] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-[#2a44c5] via-[#4130be] to-[#be156c] shadow-2xl">
          <div className="grid items-center gap-16 px-8 py-14 lg:grid-cols-2 lg:px-16">
            {/* Left */}
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur">
                For Drivers
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
                Drive with Torkk.
                <br />
                Earn on Your Schedule.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">
                Become a Torkk Captain and start earning by giving rides.
                Work when you want and grow your income with every trip.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {captainFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-white"
                  >
                    <FaCheckCircle className="text-lg text-green-300" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleStartDriving}
                className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:scale-105"
              >
                Start Driving
                <FaArrowRight />
              </button>

              <p className="mt-4 text-sm text-blue-100">
                Download the Torkk Driver App and start earning today.
              </p>
            </div>

            {/* Right */}
            <CaptainIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}