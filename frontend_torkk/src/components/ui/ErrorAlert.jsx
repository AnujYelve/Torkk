import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 flex items-start gap-3 my-4">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-red-300 text-sm">Error</h4>
        <p className="text-sm mt-0.5 text-red-200/90">{message || "Something went wrong"}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-100 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      )}
    </div>
  );
}
