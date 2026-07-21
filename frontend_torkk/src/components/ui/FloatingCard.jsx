export default function FloatingCard({
  icon,
  title,
  value,
  className = "",
}) {
  return (
    <div
      className={`absolute rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 shadow-2xl backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#2a44c5] via-[#4130be] to-[#ce1a77] text-white">
          {icon}
        </div>

        <div>
          <p className="text-xs text-slate-500">{title}</p>

          <h4 className="mt-1 text-sm font-semibold text-slate-900">
            {value}
          </h4>
        </div>
      </div>
    </div>
  );
}