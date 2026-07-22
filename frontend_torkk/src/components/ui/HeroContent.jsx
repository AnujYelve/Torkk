import { FaApple } from "react-icons/fa";
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 466 511.98"
            className="h-[30px] w-[30px] shrink-0"
          >
            <g fillRule="nonzero">
              <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z" />
              <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z" />
              <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z" />
              <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z" />
            </g>
          </svg>
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