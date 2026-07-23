"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16 flex items-center justify-center">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.25 }}
        animate={{ scale: [1.25, 1.18, 1.12, 1.08, 1.04, 1] }}
        transition={{
          duration: 17,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-mosque.png"
          alt="Masjid"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-emerald-950/65 to-emerald-950/85" />

      {/* Islamic Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-15 w-full max-w-5xl mx-auto px-6 text-center mt-6">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {/* Badge */}
          <motion.span
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
            className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium tracking-wide text-emerald-100 backdrop-blur-xl"
          >
            UNIT KEGIATAN MAHASISWA • UNIVERSITAS ANDALAS
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-7xl"
          >
            Membangun
            <br />
            <span className="text-emerald-300">
              Generasi Rabbani
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
              duration: 0.8,
            }}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-emerald-100 md:text-xl md:leading-9"
          >
            Forum Kajian Islam Rabbani merupakan Unit Kegiatan Mahasiswa
            Universitas Andalas yang berfokus pada dakwah, kaderisasi,
            pengembangan karakter, dan pembinaan mahasiswa muslim menuju
            generasi yang berilmu, berakhlak, serta berdampak bagi umat.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.65,
              duration: 0.7,
            }}
            className="mt-8 md:mt-10 flex flex-wrap justify-center gap-4 md:gap-5"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-emerald-900 shadow-xl transition hover:shadow-2xl"
            >
              Jelajahi Website
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              Tentang Kami
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}