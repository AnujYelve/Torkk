import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaShieldAlt,
} from "react-icons/fa";

export default function CaptainIllustration() {
  return (
    <div className="relative flex h-[320px] sm:h-[420px] items-center justify-center w-full max-w-[400px] sm:max-w-none mx-auto orbit-container">
      <style>{`
        .orbit-container {
          --orbit-radius: 95px;
        }
        @media (min-width: 640px) {
          .orbit-container {
            --orbit-radius: 155px;
          }
        }
        @keyframes orbit-1 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translate(var(--orbit-radius)) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translate(var(--orbit-radius)) rotate(-360deg);
          }
        }
        @keyframes orbit-2 {
          0% {
            transform: translate(-50%, -50%) rotate(120deg) translate(var(--orbit-radius)) rotate(-120deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(480deg) translate(var(--orbit-radius)) rotate(-480deg);
          }
        }
        @keyframes orbit-3 {
          0% {
            transform: translate(-50%, -50%) rotate(240deg) translate(var(--orbit-radius)) rotate(-240deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(600deg) translate(var(--orbit-radius)) rotate(-600deg);
          }
        }
        .orbit-card-1 {
          animation: orbit-1 25s linear infinite;
        }
        .orbit-card-2 {
          animation: orbit-2 25s linear infinite;
        }
        .orbit-card-3 {
          animation: orbit-3 25s linear infinite;
        }
        .orbit-card-1:hover,
        .orbit-card-2:hover,
        .orbit-card-3:hover {
          animation-play-state: paused;
          scale: 1.05;
          z-index: 20;
        }
      `}</style>

      {/* Background Glow */}
      <div className="absolute h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-pink-400/20 blur-3xl" />

      {/* Main Circle */}
      <div className="relative flex h-44 w-44 sm:h-64 sm:w-64 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
        <div className="flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white text-blue-600 shadow-xl">
          <FaMotorcycle className="text-3xl sm:text-5xl" />
        </div>
      </div>

      {/* Earnings Card */}
      <div className="absolute left-1/2 top-1/2 orbit-card-1 rounded-xl sm:rounded-2xl bg-white px-3 py-2 sm:px-5 sm:py-3 shadow-xl transition-all duration-300">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FaRupeeSign className="text-sm sm:text-base text-green-600 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
            Weekly Payments
          </span>
        </div>
      </div>

      {/* Location Card */}
      <div className="absolute left-1/2 top-1/2 orbit-card-2 rounded-xl sm:rounded-2xl bg-white px-3 py-2 sm:px-5 sm:py-3 shadow-xl transition-all duration-300">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FaMapMarkerAlt className="text-sm sm:text-base text-red-500 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
            More Rides
          </span>
        </div>
      </div>

      {/* Support Card */}
      <div className="absolute left-1/2 top-1/2 orbit-card-3 rounded-xl sm:rounded-2xl bg-white px-3 py-2 sm:px-5 sm:py-3 shadow-xl transition-all duration-300">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FaShieldAlt className="text-sm sm:text-base text-blue-600 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
            24/7 Support
          </span>
        </div>
      </div>
    </div>
  );
}