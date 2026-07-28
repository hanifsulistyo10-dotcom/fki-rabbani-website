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
  MoonStar,
  ShieldCheck,
  Flower2,
  Landmark,
} from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";
import { stagger, card } from "@/app/lib/motion";

import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

const programs = [
  {
    icon: MoonStar,
    category: "Syiar Kampus",
    title: "RDK (Ramadhan di Kampus) UNAND",
    description:
      "Rangkaian syiar akbar Ramadhan yang digelar FKI Rabbani bersama FSI se-Unand untuk menghidupkan suasana keislaman di kampus — mulai dari kajian, buka bersama, hingga aksi sosial berbagi di lingkungan Unand.",
    tag: "Ramadhan & Dakwah",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  },
  {
    icon: GraduationCap,
    category: "Penyambutan Mahasiswa Baru",
    title: "Ahlan Rangers",
    description:
      "Program penyambutan mahasiswa baru yang memperkenalkan FKI Rabbani dan FSI se-Unand sejak awal semester, sekaligus wadah menemukan bakat dan jiwa kepemimpinan Islami di langkah pertama perkuliahan.",
    tag: "Kaderisasi",
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]",
  },
  {
    icon: ShieldCheck,
    category: "Pelatihan Kader",
    title: "Kobar Synergy Academy (KSA)",
    description:
      "Kamp pelatihan 3 hari 2 malam bagi Aktivis Dakwah Kampus se-Sumatera Barat — memperkuat pemahaman dakwah dan pemikiran Islam, sekaligus membangun ketahanan fisik dan mental para kader.",
    tag: "Leadership",
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(5,150,105,0.2)]",
  },
  {
    icon: Flower2,
    category: "Keputrian",
    title: "Putri Andalas Fair (PAF)",
    description:
      "Ajang tahunan Keputrian FKI Rabbani yang merayakan potensi dan kreativitas muslimah Unand lewat rangkaian talkshow, kompetisi, dan bazar bernuansa islami.",
    tag: "Pengembangan Muslimah",
    gradient: "from-teal-600/20 via-emerald-500/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(13,148,136,0.2)]",
  },
  {
    icon: Landmark,
    category: "Festival Dakwah",
    title: "Andalas Islamic Fair (AIF)",
    description:
      "Syiar akbar tahunan FKI Rabbani bersama seluruh FSI Universitas Andalas — menghadirkan lomba orasi, bedah buku, dan bazar untuk memperluas dakwah serta mempererat ukhuwah Islamiyah se-kampus.",
    tag: "Syiar Kampus",
    gradient: "from-emerald-500/20 via-cyan-500/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  },
  {
    icon: BookOpen,
    category: "Pembinaan",
    title: "Sekolah Rabbani",
    description:
      "Program pembinaan intensif bagi mahasiswa baru dan calon pengurus, memadukan pendalaman tsaqofah keislaman dengan pengembangan soft skill dan pemahaman berorganisasi.",
    tag: "Pengembangan SDM",
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
          description="Deretan program pembinaan, syiar, dan pengembangan karakter yang&nbsp;menjadi&nbsp;pilar&nbsp;utama&nbsp;dalam&nbsp;menebar&nbsp;kebaikan&nbsp;di&nbsp;kampus"
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

        {/* Bottom CTA dengan Link ke Halaman Program Kerja */}
        <div className="mt-16 text-center">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            <Link
              href="/program-kerja"
              className="
                relative
                inline-block
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
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}