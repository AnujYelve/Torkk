import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaShieldAlt,
} from "react-icons/fa";

export default function CaptainIllustration() {
  return (
    <div className="relative flex h-[320px] sm:h-[420px] items-center justify-center w-full max-w-[400px] sm:max-w-none mx-auto">
      {/* Background Glow */}
      <div className="absolute h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-pink-400/20 blur-3xl" />

      {/* Main Circle */}
      <div className="relative flex h-44 w-44 sm:h-64 sm:w-64 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
        <div className="flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white text-blue-600 shadow-xl">
          <FaMotorcycle className="text-3xl sm:text-5xl" />
        </div>
      </div>

      {/* Earnings */}
      <div className="absolute left-0 sm:left-6 top-4 sm:top-10 rounded-xl sm:rounded-2xl bg-white px-3 py-2 sm:px-5 sm:py-3 shadow-xl transition-all duration-300">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FaRupeeSign className="text-sm sm:text-base text-green-600 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
            Weekly Payments
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="absolute right-0 sm:right-5 top-14 sm:top-16 rounded-xl sm:rounded-2xl bg-white px-3 py-2 sm:px-5 sm:py-3 shadow-xl transition-all duration-300">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FaMapMarkerAlt className="text-sm sm:text-base text-red-500 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
            More Rides
          </span>
        </div>
      </div>

      {/* Support */}
      <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-14 rounded-xl sm:rounded-2xl bg-white px-3 py-2 sm:px-5 sm:py-3 shadow-xl transition-all duration-300">
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