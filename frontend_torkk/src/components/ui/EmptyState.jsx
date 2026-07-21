import React from "react";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  icon: Icon = FolderOpen,
  title = "No items found",
  description = "There are currently no items available in this view.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-3xl bg-white border border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.04)] my-6 max-w-xl mx-auto">
      <div className="p-4 rounded-2xl bg-[#3B36EA]/10 border border-[#3B36EA]/20 text-[#3B36EA] mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#1B1B1F]">{title}</h3>
      <p className="mt-2 text-sm text-[#66687A] max-w-md leading-relaxed">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
