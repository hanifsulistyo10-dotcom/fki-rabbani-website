'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from "framer-motion";
import RabbaniAssistant from "./components/RabbaniAssistant";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import News from "./components/News";
import Programs from "./components/Programs";
import CTA from "./components/CTA";
import Footer from "./components/layout/Footer";
import { Wrench, Loader2 } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkMaintenanceStatus() {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('maintenance_mode')
          .eq('id', 1)
          .single();

        if (data && data.maintenance_mode) {
          setIsMaintenance(true);
        }
      } catch (err) {
        console.error('Gagal memeriksa status maintenance', err);
      } finally {
        setChecking(false);
      }
    }

    checkMaintenanceStatus();
  }, []);

  // Tampilkan loading sebentar saat mengecek status ke database
  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  // Jika Maintenance Mode aktif, tampilkan halaman khusus pemeliharaan
  if (isMaintenance) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-950">
          <Wrench size={30} />
        </div>
        <h1 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">Website Sedang Dalam Pemeliharaan</h1>
        <p className="text-sm text-slate-400 max-w-md leading-relaxed">
          Mohon maaf atas ketidaknyamanannya. Website FKI Rabbani sedang dalam peningkatan sistem. Silakan kunjungi kembali beberapa saat lagi.
        </p>
      </div>
    );
  }

  // Jika tidak maintenance, tampilkan website seperti biasa
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main className="bg-white">
        <Hero />

        <Stats />

        <About />

        <VisionMission />

        <News />

        <Programs />

        <CTA />

        <Footer />

        <RabbaniAssistant />
      </main>
    </>
  );
}