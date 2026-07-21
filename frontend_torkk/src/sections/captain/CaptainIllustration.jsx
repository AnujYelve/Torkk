import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaShieldAlt,
} from "react-icons/fa";

export default function CaptainIllustration() {
  return (
    <div className="relative flex h-[420px] items-center justify-center">
      {/* Background Glow */}
      <div className="absolute h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute h-56 w-56 rounded-full bg-pink-400/20 blur-3xl" />

      {/* Main Circle */}
      <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-blue-600 shadow-xl">
          <FaMotorcycle className="text-5xl" />
        </div>
      </div>

      {/* Earnings */}
      <div className="absolute left-6 top-10 rounded-2xl bg-white px-5 py-3 shadow-xl">
        <div className="flex items-center gap-2">
          <FaRupeeSign className="text-green-600" />
          <span className="font-semibold text-gray-800">
            Weekly Payments
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="absolute right-5 top-16 rounded-2xl bg-white px-5 py-3 shadow-xl">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span className="font-semibold text-gray-800">
            More Rides
          </span>
        </div>
      </div>

      {/* Support */}
      <div className="absolute bottom-10 left-14 rounded-2xl bg-white px-5 py-3 shadow-xl">
        <div className="flex items-center gap-2">
          <FaShieldAlt className="text-blue-600" />
          <span className="font-semibold text-gray-800">
            24/7 Support
          </span>
        </div>
      </div>
    </div>
  );
}