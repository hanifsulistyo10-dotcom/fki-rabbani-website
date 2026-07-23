"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden pt-24">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.25 }}
        animate={{scale: [1.25, 1.18, 1.12, 1.08, 1.04, 1],}}
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
      <div className="relative z-10 flex h-full items-center justify-center px-6 pt-32">
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
            className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl"
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
            className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-emerald-100 md:text-xl"
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
            className="mt-12 flex flex-wrap justify-center gap-5"
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

          {/* Scroll Indicator */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="mt-20 flex flex-col items-center"
          >
            <span className="text-sm tracking-[0.25em] text-emerald-100">
              SCROLL
            </span>

            <div className="mt-4 flex h-14 w-8 justify-center rounded-full border border-white/30">
              <div className="mt-2 h-3 w-3 animate-bounce rounded-full bg-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}