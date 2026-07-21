import { FaApple, FaGooglePlay } from "react-icons/fa";
import {
  FaUsers,
  FaWallet,
  FaHeadset,
} from "react-icons/fa";


export default function HeroContent() {
  return (
    <div className="w-full lg:w-1/2">
      {/* <div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600" />

        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
          Now Live in Major Cities
        </span>
      </div> */}

      <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
        The Future of
        <br />
        Mobility is{" "}
        <span className="bg-gradient-to-r from-[#2a44c5] via-[#4130be] to-[#ce1a77] bg-clip-text text-transparent">
          Fair & Safe
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
        Torkk transforms urban transportation with zero commission,
        transparent pricing, verified drivers and a seamless ride experience
        built for both riders and drivers.
      </p>


      <div className="mt-10 flex flex-wrap gap-4">
        <button className="flex items-center gap-4 rounded-2xl bg-[#18181B] px-6 py-4 text-white shadow-lg transition hover:-translate-y-1">
          <FaApple className="text-3xl" />
          <div className="text-left">
            <p className="text-[10px] uppercase text-gray-300">
              Download on the
            </p>
            <h4 className="text-base font-semibold">
              App Store
            </h4>
          </div>
        </button>

        <button className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-lg transition hover:-translate-y-1">
          <FaGooglePlay className="text-3xl text-[#3B5BFF]" />
          <div className="text-left">
            <p className="text-[10px] uppercase text-slate-500">
              Get it on
            </p>
            <h4 className="text-base font-semibold text-slate-900">
              Google Play
            </h4>
          </div>
        </button>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-600">


        <span className="hidden h-4 w-px bg-slate-300 sm:block" />

        <div className="flex items-center gap-2">
          <FaWallet className="text-[#6C5CE7]" />
          <span>
            <span className="font-semibold text-slate-900">0%</span> Commission
          </span>
        </div>

        <span className="hidden h-4 w-px bg-slate-300 sm:block" />

        <div className="flex items-center gap-2">
          <FaHeadset className="text-[#F472B6]" />
          <span>
            <span className="font-semibold text-slate-900">24×7</span> Support
          </span>
        </div>
      </div>
    </div>
  );
}