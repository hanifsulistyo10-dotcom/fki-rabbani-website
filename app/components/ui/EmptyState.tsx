import { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-100 bg-white px-8 py-16 text-center shadow-sm">

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        {icon ?? <Inbox size={38} />}
      </div>

      <h3 className="text-2xl font-bold text-[#032b22]">
        {title}
      </h3>

      <p className="mt-3 max-w-md leading-7 text-gray-500">
        {description}
      </p>

    </div>
  );
}