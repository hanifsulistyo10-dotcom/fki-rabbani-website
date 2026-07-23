'use client';

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Calendar, Tag, Users, CheckCircle2, 
  Search, Rocket, Clock, Award, ArrowUpRight, Flame
} from 'lucide-react';

// --- DATA PROGRAM KERJA ---
const PROGRAM_DATA = [
  {
    id: 1,
    title: 'Rabbani Festival (RABFEST)',
    category: 'Unggulan',
    pelaksana: 'SYIRAM & KPSDM',
    target: 'Mahasiswa & Umum',
    status: 'Tahunan',
    desc: 'Ajang kompetisi, talkshow nasional, dan syiar terbesar FKI Rabbani untuk menggali potensi serta apresiasi karya mahasiswa muslim.',
    highlights: ['Lomba Nasional', 'Talkshow Inspiratif', 'Bazar & Expo'],
    isFeatured: true
  },
  {
    id: 2,
    title: 'Latihan Keterampilan Manajemen Mahasiswa (LKMM)',
    category: 'Kaderisasi',
    pelaksana: 'KPSDM',
    target: 'Kader FKI Rabbani',
    status: 'Aktif',
    desc: 'Program pembinaan kepemimpinan dan manajemen organisasi berjenjang untuk melahirkan kader-kader yang tangguh dan profesional.',
    highlights: ['Materi Leadership', 'Outbound', 'Mentoring Eksekutif'],
    isFeatured: false
  },
  {
    id: 3,
    title: 'Kajian Rutin Rabbani (KARRAN)',
    category: 'Rutin',
    pelaksana: 'SYIRAM',
    target: 'Seluruh Civitas Akademika',
    status: 'Berjalan',
    desc: 'Forum kajian keislaman mingguan yang membahas isu-isu kontemporer, fiqih keseharian, dan pemantapan akidah.',
    highlights: ['Kajian Mingguan', 'Tanya Jawab Interaktif', 'Snack & Networking'],
    isFeatured: false
  },
  {
    id: 4,
    title: 'Rabbani Medical Care & Social Action',
    category: 'Sosial',
    pelaksana: 'RMC (DSO)',
    target: 'Masyarakat & Mahasiswa',
    status: 'Insidental',
    desc: 'Aksi kepedulian masyarakat mencakup cek kesehatan gratis, donor darah, dan bantuan kemanusiaan saat bencana.',
    highlights: ['Cek Kesehatan Gratis', 'Donor Darah', 'Aksi Tanggap Bencana'],
    isFeatured: false
  },
  {
    id: 5,
    title: 'Kemah Bakti & Olahraga Rabbani (KOBAR Cup)',
    category: 'Rutin',
    pelaksana: 'KOBAR (DSO)',
    target: 'Kader & Mahasiswa UNAND',
    status: 'Tahunan',
    desc: 'Wadah silaturahmi melalui ajang olahraga, riyadhah fisik, dan peningkat kebugaran kader FKI Rabbani.',
    highlights: ['Turnamen Futsal & Panahan', 'Riyadhah Bersama', 'Trophy & Prize'],
    isFeatured: false
  },
  {
    id: 6,
    title: 'Rabbani Entrepreneur Hub',
    category: 'Kewirausahaan',
    pelaksana: 'Entrepreneur',
    target: 'Mahasiswa Wirausaha',
    status: 'Berjalan',
    desc: 'Pemberdayaan ekonomi organisasi melalui bazar UMKM kampus, merchandise resmi, dan pelatihan wirausaha muda.',
    highlights: ['Merchandise Store', 'Workshop Digital Business', 'Kemitraan UMKM'],
    isFeatured: false
  },
];

const CATEGORIES = ['Semua', 'Unggulan', 'Kaderisasi', 'Rutin', 'Sosial', 'Kewirausahaan'];

export default function ProgramKerja() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
  const filteredPrograms = useMemo(() => {
    return PROGRAM_DATA.filter((prog) => {
      const matchCategory = selectedCategory === 'Semua' || prog.category === selectedCategory;
      const matchSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prog.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prog.pelaksana.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredProgram = PROGRAM_DATA.find(p => p.isFeatured);

  return (
    <div className="bg-slate-50/60 min-h-screen text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20 relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[600px] right-0 w-[400px] h-[400px] bg-teal-100/30 blur-3xl rounded-full -z-10 pointer-events-none" />

      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-16 pb-8 px-4 text-center max-w-4xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-emerald-800 text-xs font-bold tracking-widest uppercase border border-emerald-200/80 shadow-sm hover:shadow transition-all duration-300 mb-4">
          <Rocket size={14} className="text-emerald-600 animate-pulse" /> Agenda & Kontribusi
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Program Kerja <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-600">FKI Rabbani</span>
        </h1>
        <p className="mt-3 text-slate-600 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Rangkaian inisiatif, karya, dan kegiatan berkelanjutan untuk menebar kemanfaatan nyata di lingkungan kampus dan masyarakat.
        </p>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. FEATURED PROGRAM (HERO CARD) */}
      {/* ------------------------------------------------------------- */}
      {featuredProgram && selectedCategory === 'Semua' && !searchQuery && (
        <section className="max-w-5xl mx-auto px-4 mb-10">
          <div className="relative bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 md:p-9 border border-emerald-800/60 shadow-2xl overflow-hidden group">
            
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl group-hover:bg-emerald-500/25 transition-all duration-700 pointer-events-none" />
            <Flame size={180} className="absolute -bottom-10 -right-10 text-emerald-500/5 pointer-events-none select-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-emerald-300 uppercase bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-600/50 backdrop-blur-md">
                    <Sparkles size={12} className="text-emerald-400" /> Program Unggulan Utama
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                    Pelaksana: {featuredProgram.pelaksana}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                  {featuredProgram.title}
                </h2>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl">
                  {featuredProgram.desc}
                </p>

                {/* Key Highlights Pill */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredProgram.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs text-emerald-200 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-xl backdrop-blur-sm">
                      <CheckCircle2 size={13} className="text-emerald-400" /> {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Side Box */}
              <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-slate-800/80 pt-4 md:pt-0 md:pl-6 space-y-3">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block">Sasaran Target</span>
                  <span className="text-xs font-bold text-emerald-300">{featuredProgram.target}</span>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block">Frekuensi Agenda</span>
                  <span className="text-xs font-bold text-white">{featuredProgram.status}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. FILTER & SEARCH BAR */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari program kerja..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. PROGRAM GRID LIST */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4">
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrograms.map((prog) => (
              <div 
                key={prog.id}
                className="group relative bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 rounded-md">
                      {prog.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
                      <Clock size={11} /> {prog.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2 line-clamp-2">
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {prog.desc}
                  </p>
                </div>

                {/* Footer Details */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-emerald-600" /> Pelaksana:
                    </span>
                    <span className="font-bold text-slate-700">{prog.pelaksana}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Tag size={12} className="text-teal-600" /> Target:
                    </span>
                    <span className="font-medium text-slate-600 truncate max-w-[150px]" title={prog.target}>{prog.target}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-slate-200/80">
            <Search size={36} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-700">Program Kerja Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain atau ubah filter kategori yang dipilih.</p>
          </div>
        )}
      </section>

    </div>
  );
}