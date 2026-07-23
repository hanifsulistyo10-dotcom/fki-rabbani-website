import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverEffect = true,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-emerald-900/10 p-6 transition-all duration-300 ${
        hoverEffect
          ? "hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}