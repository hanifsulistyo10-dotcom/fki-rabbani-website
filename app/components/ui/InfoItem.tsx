import React from "react";
import { LucideIcon } from "lucide-react";

interface InfoItemProps {
  icon: LucideIcon;
  title: string;
  value: string;
}

export default function InfoItem({ icon: Icon, title, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h4>
        <p className="text-base font-medium text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}