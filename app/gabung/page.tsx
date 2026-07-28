"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-emerald-950 px-6 py-16 text-white">
      {/* Background Islamic Pattern & Glow Effects */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.8) 1.5px, transparent 1.5px)",
          backgroundSize: "35px 35px",
        }}
      />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        
        {/* Badge Animasi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/50 px-6 py-2 text-sm font-medium tracking-wide text-emerald-100 backdrop-blur-md shadow-inner mb-8"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀
          </motion.span>
          <span>PENGREKRUTAN OPEN SOON</span>
        </motion.div>

        {/* Heading Utama dengan Efek Gradient */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6"
        >
          Segera <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200">
            Dibuka!
          </span>
        </motion.h1>

        {/* Deskripsi */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base sm:text-xl text-emerald-100/80 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Alhamdulillah, pendaftaran anggota baru FKI Rabbani Universitas Andalas sedang dipersiapkan. Nantikan informasi resmi dan jadilah bagian dari generasi Rabbani berikutnya!
        </motion.p>

        {/* Tombol Aksi Kembali ke Beranda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 font-bold text-emerald-950 shadow-2xl transition-all hover:bg-emerald-50 cursor-pointer"
            >
              ← Kembali ke Beranda
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}