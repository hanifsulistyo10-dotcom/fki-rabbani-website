"use client";

import {
  BookOpen,
  Users,
  GraduationCap,
  HeartHandshake,
  Megaphone,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { stagger, card } from "@/app/lib/motion";

import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

const programs = [
  {
    icon: BookOpen,
    category: "Pendidikan",
    title: "Kajian & Pendidikan",
    description:
      "Template kegiatan kajian Islam, seminar, pelatihan, dan pengembangan wawasan keislaman mahasiswa.",
    tag: "Akademik & Syiar",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  },
  {
    icon: Users,
    category: "Kaderisasi",
    title: "Kaderisasi",
    description:
      "Template pembinaan kader, mentoring, serta proses pengembangan anggota FKI Rabbani.",
    tag: "Pengembangan Anggota",
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]",
  },
  {
    icon: GraduationCap,
    category: "Pembinaan",
    title: "Pembinaan",
    description:
      "Template program pembentukan karakter, kepemimpinan, dan penguatan spiritual mahasiswa.",
    tag: "Karakter & Leadership",
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(5,150,105,0.2)]",
  },
  {
    icon: HeartHandshake,
    category: "Sosial",
    title: "Pengabdian Sosial",
    description:
      "Template kegiatan sosial, bakti masyarakat, serta aksi kemanusiaan dan kepedulian umat.",
    tag: "Aksi Umat",
    gradient: "from-teal-600/20 via-emerald-500/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(13,148,136,0.2)]",
  },
  {
    icon: Megaphone,
    category: "Media Dakwah",
    title: "Media & Publikasi",
    description:
      "Template pengelolaan media sosial, desain kreatif, dokumentasi, dan syiar digital.",
    tag: "Syiar Kreatif",
    gradient: "from-emerald-500/20 via-cyan-500/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  },
  {
    icon: Globe,
    category: "Kolaborasi",
    title: "Kerja Sama",
    description:
      "Template sinergi dengan FSI, lembaga dakwah kampus, maupun organisasi eksternal.",
    tag: "Sinergi Strategis",
    gradient: "from-teal-500/20 via-emerald-600/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]",
  },
];

export default function Programs() {
  return (
    <section
      id="program"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/30 to-slate-50 py-32"
    >
      {/* Latar Belakang Cahaya Glamor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-400/10 blur-[150px] rounded-full pointer-events-none" />

      <Container>
        <SectionTitle
          badge="Program Kerja"
          title="Program"
          highlight="Unggulan"
          description="Template kategori program kerja FKI Rabbani Universitas Andalas yang dapat disesuaikan setiap periode kepengurusan."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
          }}
          className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <motion.div
                key={program.title}
                variants={card}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={`
                  group
                  relative
                  flex
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-2xl
                  bg-white/95
                  backdrop-blur-xl
                  p-5
                  shadow-lg
                  shadow-emerald-950/[0.05]
                  border
                  border-emerald-100/80
                  transition-all
                  duration-500
                  ${program.glowColor}
                  hover:border-emerald-400
                `}
              >
                {/* Efek Garis Cahaya Berjalan di Atas Card saat Hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Efek Gradasi Mewah di Latar Belakang Card saat Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Top Row: Ikon Kecil & Kategori Berjejer */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-900/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon size={20} className="relative z-10" />
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 px-2.5 py-0.5 rounded-md shadow-xs inline-block mb-1">
                        {program.category}
                      </span>
                      <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-emerald-900 transition-colors leading-snug">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3 pl-0.5">
                    {program.description}
                  </p>
                </div>

                {/* Footer Action dengan Sentuhan Glamor & Tombol Interaktif */}
                <div className="relative z-10 pt-3 mt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 px-2.5 py-1 rounded-full border border-emerald-200/60 shadow-xs">
                    <Sparkles size={11} className="text-emerald-600 animate-pulse" />
                    <span className="tracking-wide">{program.tag}</span>
                  </div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 group-hover:text-emerald-900 transition-colors cursor-pointer"
                  >
                    <span>Selengkapnya</span>
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA dengan Efek Kilau Premium */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-gradient-to-r
              from-[#032b22]
              via-emerald-900
              to-[#032b22]
              px-10
              py-4
              font-bold
              text-white
              shadow-2xl
              shadow-emerald-950/30
              border
              border-emerald-500/30
              transition-all
              duration-300
              hover:shadow-emerald-900/50
              hover:border-emerald-400
            "
          >
            {/* Efek Kilau Berjalan */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]" />
            <span className="relative z-10 tracking-wide">Lihat Seluruh Program Kerja</span>
          </motion.button>
        </div>
      </Container>
    </section>
  );
}