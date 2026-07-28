"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";
import {
  Users,
  Building2,
  CalendarDays,
  Award,
} from "lucide-react";

// Komponen Counter untuk efek angka dari 0
function Counter({ value, suffix = "+" }: { value: string | number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = typeof value === "string" ? parseInt(value, 10) : value;
    const controls = animate(count, numericValue, {
      duration: 2,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, value, rounded]);

  return (
    <span>
      {displayValue}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    value: "110", // Angka murni agar bisa dianimasikan oleh Counter
    suffix: "+",
    title: "Pengurus",
    subtitle: "Aktif",
  },
  {
    icon: Building2,
    value: "16",
    suffix: "+",
    title: "FSI",
    subtitle: "Universitas Andalas",
  },
  {
    icon: CalendarDays,
    value: "6",
    suffix: "+",
    title: "Program",
    subtitle: "Tahunan",
  },
  {
    icon: Award,
    value: "20",
    suffix: "+",
    title: "Tahun",
    subtitle: "Mengabdi",
  },
];

export default function Stats() {
  return (
    <section className="relative z-20 -mt-4 pb-12">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-2 gap-6 rounded-3xl bg-white p-8 shadow-2xl lg:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-green-50"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h2 className="text-4xl font-black text-green-900">
                  <Counter value={item.value} suffix={item.suffix} />
                </h2>

                <p className="mt-2 font-semibold text-gray-900">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500">
                  {item.subtitle}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}