import { ArrowRight } from "lucide-react";

export default function HeroButtons({ openWaitlist }) {
  return (
    <div className="mt-10 flex gap-5">
      <button
        onClick={openWaitlist}
        className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
      >
        Join Waitlist
        <ArrowRight size={20} />
      </button>

      <button className="flex items-center gap-3 rounded-xl border border-gray-700 px-8 py-4 text-lg font-semibold text-white transition hover:border-white">
        Become a Driver
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
