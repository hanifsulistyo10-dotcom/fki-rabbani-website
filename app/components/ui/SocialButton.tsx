import React from "react";
import { LucideIcon } from "lucide-react";

interface SocialButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function SocialButton({
  href,
  icon: Icon,
  label,
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer" // 👈 16.7 Security
      aria-label={label}       // 👈 16.6 Accessibility
      className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-700/50 bg-emerald-900/50 text-emerald-200 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:text-white"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}