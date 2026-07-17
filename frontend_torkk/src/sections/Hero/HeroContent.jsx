import HeroButtons from "./HeroButtons";
import TrustFeatures from "./TrustFeatures";

export default function HeroContent({openWaitlist}) {
  return (
    <div className="max-w-xl">

      {/* Badge */}

      <div className="mb-8 inline-flex items-center rounded-full border border-[#2d3345] bg-[#0f1422] px-5 py-2 text-sm text-gray-300">

        <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>

        India's Next-Generation Mobility Platform

      </div>

      {/* Heading */}

      <h1 className="text-7xl bg-gradient-to-r from-blue-500 to-pink-700 bg-clip-text text-transparent font-bold leading-tight">

        Ride Smarter.
        <br />
        Ride Safer.

      </h1>

      {/* Description */}

      <p className="mt-8 text-xl leading-9 text-gray-400">

        Torkk is building a safer and smarter mobility platform that
        connects riders and drivers through verified identities,
        real-time tracking, and technology-driven transportation.

      </p>

    <HeroButtons openWaitlist={openWaitlist} />

      <TrustFeatures />

    </div>
  );
}