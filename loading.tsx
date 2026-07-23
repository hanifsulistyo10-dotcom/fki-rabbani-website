import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Ring Spinner Outer */}
        <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
        {/* Pulse Inner Circle */}
        <div className="absolute w-8 h-8 bg-emerald-700/20 rounded-full animate-ping"></div>
      </div>
      <p className="mt-6 text-sm font-semibold text-emerald-800 tracking-wider uppercase animate-pulse">
        Memuat Halaman...
      </p>
    </div>
  );
}