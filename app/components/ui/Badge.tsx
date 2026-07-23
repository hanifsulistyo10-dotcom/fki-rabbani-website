import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "amber" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "emerald",
  className = "",
}: BadgeProps) {
  const variants = {
    emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    outline: "bg-transparent text-emerald-700 border-emerald-600/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}