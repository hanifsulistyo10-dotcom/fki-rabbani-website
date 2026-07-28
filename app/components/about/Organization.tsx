'use client';

import React, { useState } from 'react';
import { 
  Shield, Users, Layers, Sparkles, Award, Info, 
  History, Palette, User, HeartHandshake, Compass, Flame, BookOpen, Quote
} from 'lucide-react';

// --- DATA STRUKTUR ORGANISASI ---
const ORG_DATA = {
  pimpinanTop: [
    { 
      role: 'Pembina', 
      name: 'Hasdi Putra, S.T., M.T.',
      desc: 'Memberikan arahan, bimbingan, serta pertimbangan strategis untuk keberjalanan organisasi.'
    },
    { 
      role: 'Ketua Umum', 
      name: 'Rendi Anggara',
      desc: 'Penanggung jawab tertinggi seluruh kebijakan, arah gerak, dan manajemen FKI Rabbani.'
    },
  ],
  pimpinanBottom: [
    { 
      role: 'Wakil Ketua Umum', 
      name: 'Faris Ardhan Rusli',
      desc: 'Mendampingi Ketua Umum dalam koordinasi internal dan eksekusi program kerja.'
    },
    { 
      role: 'Ketua Keputrian', 
      name: 'Naura Rahma Kamila',
      desc: 'Pemimpin pembinaan, koordinasi, dan pengembangan potensi seluruh kader akhwat.'
    },
    { 
      role: 'Sekretaris Umum', 
      name: 'Muhammad Irsyad',
      desc: 'Mengelola tata kelola administrasi, persuratan, dan kearsipan tingkat pusat.'
    },
    { 
      role: 'Bendahara Umum', 
      name: 'Khairatulnisa Irhad',
      desc: 'Mengatur arus keuangan, penganggaran, dan pelaporan finansial organisasi.'
    },
  ],
  biroDept: [
    { 
      title: 'KESTARI', 
      type: 'Biro', 
      ikhwan: 'Hanif Sulistyo Budhi', 
      akhwat: 'Roza Amelya',
      desc: 'Mengelola tata kelola kesektariatan, persuratan, dan inventaris organisasi.'
    },
    { 
      title: 'KPSDM', 
      type: 'Departemen', 
      ikhwan: 'Zulhadia', 
      akhwat: 'Sitti Ba\'itsati Dzakiyah',
      desc: 'Fokus pada pembinaan, kualifikasi, dan pengembangan potensi kader.'
    },
    { 
      title: 'SYIRAM', 
      type: 'Departemen', 
      ikhwan: 'Maikal Agus Riandi', 
      akhwat: 'Fathimatuz Zahra',
      desc: 'Mengusung syiar Islam kreatif, media sosial, dan penyiaran informasi.'
    },
    { 
      title: 'HUJAN', 
      type: 'Departemen', 
      ikhwan: 'Muhammad Haikal', 
      akhwat: 'Ardya Fahira',
      desc: 'Bergerak dalam hubungan masyarakat, jaringan alumni, dan eksternal.'
    },
    { 
      title: 'KEPUTRIAN', 
      type: 'Departemen', 
      ikhwan: null, 
      akhwat: 'Melly Agustina',
      desc: 'Wadah pembinaan khusus mahasiswi dan isu-isu kewanitaan.'
    },
    { 
      title: 'ENTREPRENEUR', 
      type: 'Departemen', 
      ikhwan: 'Muhamad Afif', 
      akhwat: 'Sarfia Reisha',
      desc: 'Mengembangkan kemandirian finansial dan jiwa kewirausahaan organisasi.'
    },
  ],
  dso: [
    { 
      title: 'RMC', 
      type: 'DSO', 
      ikhwan: 'Raihan Dhowy Fhariq', 
      akhwat: 'Zazkia Ulfa',
      desc: 'Rabbani Medical Club: Wadah minat bakat dan pelayanan di bidang medis.'
    },
    { 
      title: 'KOBAR', 
      type: 'DSO', 
      ikhwan: 'Rifki Alfarensyah', 
      akhwat: 'Azizah Azzahra',
      desc: 'Komando Barisan Rabbani: Badan otonom yang fokus pada olahraga dan ketangkasan.'
    },
  ]
};

// --- DATA NILAI UTAMA ---
const CORE_VALUES = [
  {
    number: '01',
    icon: Compass,
    title: 'Rabbaniyah',
    desc: 'Menjadikan nilai Ketuhanan dan pemahaman keislaman sebagai asas utama setiap gerak langkah.'
  },
  {
    number: '02',
    icon: Flame,
    title: 'Profesional & Unggul',
    desc: 'Mengelola organisasi secara amanah, tertib administrasi, serta berstandar tinggi dalam kebermanfaatan.'
  },
  {
    number: '03',
    icon: HeartHandshake,
    title: 'Ukhuwah & Inklusif',
    desc: 'Merangkul seluruh elemen mahasiswa Universitas Andalas dengan semangat kekeluargaan.'
  },
  {
    number: '04',
    icon: BookOpen,
    title: 'Kontributif & Edukatif',
    desc: 'Hadir memberi solusi konkret bagi civitas akademika melalui syiar yang mencerdaskan.'
  }
];

// --- DATA TESTIMONI / JEJAK KADER ---
const TESTIMONIALS = [
  {
    quote: "Di FKI Rabbani saya tidak hanya belajar organisasi, tapi menemukan lingkungan yang saling menjaga iman, integritas, dan semangat akademik.",
    name: "Alumni FKI Rabbani",
    role: "Demisioner Pengurus"
  },
  {
    quote: "Wadah terbaik untuk mengasah leadership sekaligus memperdalam pemahaman keislaman di tengah kesibukan kuliah.",
    name: "Kader Aktif",
    role: "Pengurus Departemen"
  }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('pimpinan');

  const tabs = [
    { id: 'pimpinan', label: 'Pimpinan Utama', icon: Shield },
    { id: 'biroDept', label: 'Biro & Departemen', icon: Users },
    { id: 'dso', label: 'DSO (Semi Otonom)', icon: Layers },
  ];

  return (
    <div className="bg-slate-50/60 min-h-screen text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[600px] right-0 w-[400px] h-[400px] bg-teal-100/30 blur-3xl rounded-full -z-10 pointer-events-none" />

      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER PAGE MODERN */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-16 pb-8 px-4 text-center max-w-4xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-emerald-800 text-xs font-bold tracking-widest uppercase border border-emerald-200/80 shadow-sm hover:shadow transition-all duration-300 mb-4">
          <Sparkles size={14} className="text-emerald-600 animate-pulse" /> Profil Organisasi
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Tentang <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-600">FKI Rabbani</span>
        </h1>
        <p className="mt-3 text-slate-600 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Mengenal lebih dekat identitas, sejarah, prinsip, dan penggerak dakwah kampus&nbsp;Universitas&nbsp;Andalas.
        </p>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SEJARAH ORGANISASI (GLASSMORPHISM & EFEK ELEVASI) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 py-4">
        <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-9 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-500 overflow-hidden">
          
          {/* Accent Border Line Left */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-700 rounded-l-3xl" />
          
          {/* Ambient Glow Corner */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100/50 rounded-full blur-3xl group-hover:bg-emerald-200/50 transition-all duration-500 -z-0" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform duration-300">
                <History size={24} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sejarah & Perjalanan</h2>
              <p className="text-[11px] text-emerald-700 font-bold tracking-widest uppercase bg-emerald-50 inline-block px-2.5 py-0.5 rounded-full border border-emerald-100">
                Lembaga Dakwah Kampus UNAND
              </p>
            </div>
            
            <div className="md:col-span-8 text-slate-600 space-y-3.5 text-xs md:text-sm leading-relaxed">
              <p className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100/80">
                <strong>UKM FKI Rabbani Universitas Andalas</strong> lahir dari semangat mahasiswa muslim yang mendambakan hadirnya wadah pembinaan spiritual, akademik, dan sosial secara terintegrasi di lingkungan kampus.
              </p>
              <p className="pl-1">
                Seiring berjalannya waktu, FKI Rabbani terus bertransformasi dari forum diskusi keagamaan menjadi Unit Kegiatan Mahasiswa (UKM) resmi yang menaungi berbagai pergerakan syiar, pengembangan SDM, hingga aksi kepedulian sosial bagi civitas akademika Universitas Andalas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. NILAI-NILAI UTAMA (CARD WATERMARK & INTERACTIVE HOVER) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <span className="text-[11px] font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Pilar Gerakan
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">Nilai-Nilai Utama</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-md mx-auto">Prinsip dasar yang menjiwai setiap gerak langkah FKI Rabbani</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CORE_VALUES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Watermark Number */}
                <span className="absolute -bottom-2 -right-1 text-5xl font-black text-slate-100 group-hover:text-emerald-50 transition-colors duration-300 pointer-events-none select-none">
                  {item.number}
                </span>

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-teal-700 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. FILOSOFI LOGO (INTERACTIVE PREVIEW & GLOW) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 py-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300">
          
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold">
              <Palette size={22} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Filosofi Logo</h2>
              <p className="text-xs text-slate-500">Makna dan simbolisme di balik identitas FKI Rabbani</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Display Logo Box with Ambient Glow */}
            <div className="relative group flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-emerald-50/30 rounded-2xl border border-slate-200/60 text-center overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-900 via-emerald-800 to-teal-800 flex items-center justify-center shadow-lg shadow-emerald-900/20 mb-3 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black text-2xl tracking-wider">FKI</span>
              </div>
              <h3 className="text-sm font-bold text-slate-800">Logo Resmi FKI Rabbani</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Universitas Andalas</p>
            </div>

            {/* Poin Filosofi List */}
            <div className="md:col-span-2 space-y-3.5">
              
              <div className="group/item flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-1.5 shrink-0 group-hover/item:scale-125 transition-transform duration-200 shadow-sm shadow-emerald-600/50" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Kubah / Bulan Bintang (Elemen Keislaman)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Melambangkan nilai-nilai Islam sebagai fondasi utama pergerakan dan pembinaan di FKI Rabbani.
                  </p>
                </div>
              </div>

              <div className="group/item flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-600 mt-1.5 shrink-0 group-hover/item:scale-125 transition-transform duration-200 shadow-sm shadow-teal-600/50" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Atap Gonjong (Kearifan Lokal)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Mewakili identitas Minangkabau dan Universitas Andalas, menegaskan bahwa dakwah hadir menyatu harmoni dengan budaya lokal.
                  </p>
                </div>
              </div>

              <div className="group/item flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-700 mt-1.5 shrink-0 group-hover/item:scale-125 transition-transform duration-200 shadow-sm shadow-emerald-700/50" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Warna Hijau (Eksistensi & Pertumbuhan)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Melambangkan kedamaian, keberlanjutan, serta semangat kepemudaan yang siap tumbuh dan memberi manfaat luas.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. STRUKTUR KEPENGURUSAN */}
      {/* ------------------------------------------------------------- */}
      <section className="relative max-w-6xl mx-auto px-4 py-10">
        
        {/* Header Struktur */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Award size={13} className="text-emerald-600" />
            Struktur Kepengurusan
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 pb-1 leading-normal">
            Jajaran Penggerak Rabbani
          </h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-xl mx-auto">
            Sosok di balik gerak, dakwah, dan pelayanan FKI Rabbani Unand
          </p>
        </div>

        {/* Tab Nav Navigasi */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-slate-200/70 backdrop-blur-md border border-slate-200 shadow-inner gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-[1.02]'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-300/40'
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Konten Tab Struktur */}
        <div key={activeTab} className="transition-all duration-500 animate-in fade-in zoom-in-95">
          
          {/* TAB 1: PIMPINAN UTAMA */}
          {activeTab === 'pimpinan' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {ORG_DATA.pimpinanTop.map((item, idx) => (
                  <div key={idx} className="group relative bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 overflow-hidden cursor-pointer min-h-[92px]">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500 z-10" />
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 shadow-sm z-10">
                      <User size={22} />
                    </div>
                    <div className="min-w-0 z-10">
                      <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 uppercase block">{item.role}</span>
                      <h3 className="text-sm font-bold text-slate-800 mt-0.5 truncate">{item.name}</h3>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-teal-900/95 to-slate-900/95 text-white px-4 py-3 rounded-2xl flex items-center gap-3 text-left opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm z-20">
                      <Info size={20} className="text-emerald-300 shrink-0" />
                      <div>
                        <h4 className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">{item.role}</h4>
                        <p className="text-xs font-medium leading-snug text-slate-100">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ORG_DATA.pimpinanBottom.map((item, idx) => (
                  <div key={idx} className="group relative bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 overflow-hidden cursor-pointer min-h-[92px]">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500 z-10" />
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 shadow-sm z-10">
                      <User size={20} />
                    </div>
                    <div className="min-w-0 z-10">
                      <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 uppercase block">{item.role}</span>
                      <h3 className="text-sm font-bold text-slate-800 mt-0.5 truncate">{item.name}</h3>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-teal-900/95 to-slate-900/95 text-white px-4 py-3 rounded-2xl flex items-center gap-2.5 text-left opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm z-20">
                      <Info size={18} className="text-emerald-300 shrink-0" />
                      <div>
                        <h4 className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">{item.role}</h4>
                        <p className="text-[11px] font-medium leading-snug text-slate-100">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BIRO & DEPARTEMEN */}
          {activeTab === 'biroDept' && (
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
                {ORG_DATA.biroDept.map((dept, idx) => (
                  <div key={idx} className="group relative bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[105px]">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-80 group-hover:opacity-100 transition-opacity z-10" />

                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                      <h3 className="text-sm font-extrabold text-slate-800 tracking-wide flex items-center gap-2">
                        <Sparkles size={15} className="text-emerald-600 fill-emerald-500/20" />
                        {dept.title}
                      </h3>
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-emerald-50/80 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200/50">
                        {dept.type}
                      </span>
                    </div>
                    
                    {dept.ikhwan ? (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                            <span className="text-[9px] font-black tracking-widest text-emerald-800 uppercase">Ikhwan</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 leading-snug truncate" title={dept.ikhwan}>{dept.ikhwan}</p>
                        </div>

                        <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0"></span>
                            <span className="text-[9px] font-black tracking-widest text-teal-800 uppercase">Akhwat</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 leading-snug truncate" title={dept.akhwat}>{dept.akhwat}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0"></span>
                          <span className="text-[9px] font-black tracking-widest text-teal-800 uppercase">Akhwat</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 leading-snug truncate" title={dept.akhwat}>{dept.akhwat}</p>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-teal-900/95 to-slate-900/95 text-white p-4 rounded-2xl flex flex-col justify-center items-center text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm z-20">
                      <Info size={18} className="text-emerald-300 mb-1.5 shrink-0" />
                      <h4 className="text-xs font-bold text-emerald-200 tracking-wider uppercase mb-1">{dept.title}</h4>
                      <p className="text-[11px] font-medium leading-relaxed text-slate-100 px-1">{dept.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DSO */}
          {activeTab === 'dso' && (
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[620px]">
                {ORG_DATA.dso.map((dept, idx) => (
                  <div key={idx} className="group relative bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[105px]">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-80 group-hover:opacity-100 transition-opacity z-10" />

                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                      <h3 className="text-sm font-extrabold text-slate-800 tracking-wide flex items-center gap-2">
                        <Sparkles size={15} className="text-emerald-600 fill-emerald-500/20" />
                        {dept.title}
                      </h3>
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-teal-50/80 text-teal-700 px-2.5 py-1 rounded-md border border-teal-200/50">
                        {dept.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                          <span className="text-[9px] font-black tracking-widest text-emerald-800 uppercase">Ikhwan</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 leading-snug truncate" title={dept.ikhwan}>{dept.ikhwan}</p>
                      </div>

                      <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0"></span>
                          <span className="text-[9px] font-black tracking-widest text-teal-800 uppercase">Akhwat</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 leading-snug truncate" title={dept.akhwat}>{dept.akhwat}</p>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-teal-900/95 to-slate-900/95 text-white p-4 rounded-2xl flex flex-col justify-center items-center text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm z-20">
                      <Info size={18} className="text-emerald-300 mb-1.5 shrink-0" />
                      <h4 className="text-xs font-bold text-emerald-200 tracking-wider uppercase mb-1">{dept.title}</h4>
                      <p className="text-[11px] font-medium leading-relaxed text-slate-100 px-1">{dept.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. TESTIMONI / JEJAK KADER (WITH MODERN GLOW & HOVER EFFECTS) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="relative bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 md:p-10 border border-emerald-900/60 shadow-2xl overflow-hidden group">
          
          {/* Ambient Glow Elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <Quote size={120} className="absolute -bottom-6 -right-6 text-emerald-500/5 pointer-events-none select-none" />

          {/* Header Section */}
          <div className="text-center mb-8 relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-emerald-300 uppercase bg-emerald-900/60 px-3.5 py-1 rounded-full border border-emerald-700/50 backdrop-blur-md shadow-sm">
              <Sparkles size={12} className="text-emerald-400 animate-pulse" /> Refleksi & Kesan
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Jejak Kebermanfaatan
            </h2>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              Kesan dan ungkapan tulus dari mereka yang tumbuh bersama FKI Rabbani
            </p>
          </div>

          {/* Grid Testimoni */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
            {TESTIMONIALS.map((item, idx) => (
              <div 
                key={idx} 
                className="group/card relative bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/50 shadow-md hover:shadow-emerald-950/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Gradient Border Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                {/* Quote Content */}
                <div className="relative">
                  <Quote size={20} className="text-emerald-400/40 mb-2 rotate-180" />
                  <p className="text-xs md:text-sm text-slate-200 italic leading-relaxed font-medium">
                    "{item.quote}"
                  </p>
                </div>

                {/* User Info Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-xs font-bold flex items-center justify-center shadow-inner border border-emerald-400/30">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-white group-hover/card:text-emerald-300 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">FKI Rabbani Unand</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    {item.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}