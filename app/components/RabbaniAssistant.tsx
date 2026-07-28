"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Bell,
  BookOpen,
  Globe,
  Users,
  HelpCircle,
  MessageCircle,
  X,
  BotIcon,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menus = [
  {
    title: "Agenda",
    desc: "Jadwal kajian & event terdekat",
    icon: CalendarDays,
    href: "/agenda",
  },
  {
    title: "Pengumuman",
    desc: "Info penting & pendaftaran kader",
    icon: Bell,
    href: "/pengumuman",
  },
  {
    title: "Ayat / Hadits",
    desc: "Inspirasi islami harian",
    icon: BookOpen,
    href: "/ayat-hadits",
  },
  {
    title: "Media Sosial",
    desc: "Instagram, YouTube & kanal resmi",
    icon: Globe,
    href: "/media-sosial",
  },
  {
    title: "Kolaborasi",
    desc: "Jaringan dan aliansi kebaikan",
    icon: Users,
    href: "/kolaborasi",
  },
  {
    title: "Kritik, Saran, dan Pertanyaan",
    desc: "Pertanyaan seputar FKI Rabbani",
    icon: HelpCircle,
    href: "/feedback",
  },
];

export default function RabbaniAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* PANEL DENGAN BACKGROUND ORNAMEN ISLAMI / GEOMETRIS LEMBUT */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              fixed
              bottom-20
              left-3
              right-3
              max-w-[320px]
              ml-auto
              sm:left-auto
              sm:right-6
              sm:w-72
              z-50
              rounded-3xl
              overflow-hidden
              border
              border-emerald-400/30
              bg-white/95
              backdrop-blur-xl
              shadow-2xl
              shadow-emerald-950/25
            "
          >
            {/* Hiasan Background Motif Islamik Lembut / Aurora Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/60 via-transparent to-teal-50/40 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300/25 rounded-full blur-2xl pointer-events-none" />

            {/* HEADER DENGAN HIASAN BACKGROUND DINAMIS */}
            <div className="relative bg-gradient-to-br from-[#022019] via-[#032b22] to-emerald-800 px-4 py-3.5 border-b border-emerald-500/30 overflow-hidden">
              {/* Pola Dekoratif Garis Abstrak di Header */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  {/* Icon Logo Elegan (Tanpa Simbol Kotak Kaku & Love) */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-[#022019] shadow-md shadow-emerald-950/30">
                    <BotIcon size={16} className="text-[#022019]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-xs text-white tracking-tight">
                        Rabbani Assistant
                      </h3>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <p className="mt-0.5 text-[10px] text-emerald-200/90 font-medium">
                      Akses Cepat Informasi FKI Rabbani
                    </p>
                  </div>
                </div>

                {/* Tombol Close di Header */}
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-950/40 text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors border border-emerald-500/20"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* MENU COMPACT DENGAN BACKGROUND KARTU YANG HALUS */}
            <div className="relative z-10 p-2 space-y-1.5 max-h-[300px] overflow-y-auto custom-scrollbar">
              {menus.map((menu) => {
                const Icon = menu.icon;

                return (
                  <motion.div
                    key={menu.title}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={menu.href}
                      onClick={() => setOpen(false)}
                      className="
                        group
                        relative
                        flex
                        items-center
                        justify-between
                        p-2.5
                        rounded-2xl
                        bg-white/70
                        hover:bg-gradient-to-r
                        hover:from-emerald-50/90
                        hover:to-teal-50/80
                        border
                        border-emerald-900/5
                        hover:border-emerald-200
                        transition-all
                        duration-300
                        shadow-sm
                      "
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-sm shadow-emerald-950/20 group-hover:scale-105 transition-transform">
                          <Icon size={15} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 transition-colors leading-tight">
                            {menu.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 leading-none">
                            {menu.desc}
                          </p>
                        </div>
                      </div>

                      <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        className="
          fixed
          bottom-4
          right-4
          sm:bottom-6
          sm:right-6
          z-50
          flex
          h-12
          w-12
          sm:h-14
          sm:w-14
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-[#032b22]
          via-emerald-700
          to-emerald-500
          text-white
          shadow-xl
          shadow-emerald-950/40
          border
          border-emerald-400/40
          ring-3
          ring-emerald-200/30
          transition-all
          duration-300
        "
        aria-label="Toggle Rabbani Assistant"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>
    </>
  );
}