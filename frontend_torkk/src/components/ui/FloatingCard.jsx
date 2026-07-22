export default function FloatingCard({
  icon,
  title,
  value,
  className = "",
}) {
  return (
    <div
      className={`absolute rounded-xl sm:rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 sm:px-5 sm:py-4 shadow-2xl backdrop-blur-md transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-r from-[#2a44c5] via-[#4130be] to-[#ce1a77] text-white shrink-0 [&_svg]:w-3.5 [&_svg]:h-3.5 sm:[&_svg]:w-[18px] sm:[&_svg]:h-[18px]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs text-slate-500 truncate leading-tight">{title}</p>

          <h4 className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-slate-900 truncate leading-snug">
            {value}
          </h4>
        </div>
      </div>
    </div>
  );
}