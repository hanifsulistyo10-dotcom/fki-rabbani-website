"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, Tag, Sparkles, Flame, Newspaper } from "lucide-react";

// Data Dummy Artikel/Kabar Rabbani (6 Grid, item ke-6 bukan Berita Utama)
const ARTICLES = [
  {
    id: 1,
    title: "Pelantikan Pengurus Baru FKI Rabbani Periode 2026/2027",
    slug: "pelantikan-pengurus-baru-2026",
    category: "Berita Utama",
    date: "15 Juni 2026",
    author: "Humas FKI Rabbani",
    excerpt: "Acara pelantikan pengurus baru Forum Kerohanian Islam Rabbani Universitas Andalas berlangsung khidmat dan dihadiri oleh pembina serta perwakilan UKM.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Kajian Akbar Bulanan: Menjaga Istiqamah di Era Digital",
    slug: "kajian-akbar-bulanan-era-digital",
    category: "Kajian",
    date: "10 Juni 2026",
    author: "Departemen Syiar",
    excerpt: "Kajian bulanan yang mengupas tuntas bagaimana memanfaatkan teknologi dan media sosial sebagai sarana dakwah yang efektif bagi generasi muda.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Aksi Sosial: Rabbani Peduli Berbagi Sembako ke Panti Asuhan",
    slug: "aksi-sosial-rabbani-peduli",
    category: "Sosial",
    date: "28 Mei 2026",
    author: "Departemen Sosial",
    excerpt: "Wujud nyata kepedulian sosial mahasiswa Islam UNAND kepada masyarakat sekitar melalui bakti sosial dan santunan anak yatim.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Delegasi FKI Rabbani Raih Juara Lomba Debat Bahasa Arab Nasional",
    slug: "delegasi-fki-rabbani-juara-debat",
    category: "Prestasi",
    date: "20 Mei 2026",
    author: "Media Kreatif",
    excerpt: "Kebanggaan civitas akademika UNAND setelah kader terbaik FKI Rabbani sukses membawa pulang trofi kemenangan dari ajang nasional.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "Dauroh Marhalah 1: Membentuk Kader Dakwah yang Militan dan Berintegritas",
    slug: "dauroh-marhalah-1-fki-rabbani",
    category: "Kajian",
    date: "14 Mei 2026",
    author: "Departemen Kaderisasi",
    excerpt: "Pelatihan intensif bagi anggota baru untuk menanamkan pemahaman manhaj dakwah kampus yang komprehensif dan solid.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "Judul Dummy Template Pengumuman FKI Rabbani Terkini",
    slug: "judul-dummy-template-pengumuman",
    category: "Sosial",
    date: "01 Januari 2027",
    author: "Penyelenggara Dummy",
    excerpt: "Keterangan deskripsi singkat dummy template untuk pengujian tata letak komponen kabar Rabbani Universitas Andalas.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    featured: false,
  }
];

const CATEGORIES = ["Semua", "Berita Utama", "Kajian", "Sosial", "Prestasi"];

export default function KabarRabbaniPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = ARTICLES.find((art) => art.featured);

  return (
    <div className="bg-gradient-to-b from-slate-900 via-[#012b22] to-slate-950 min-h-screen text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-24 relative overflow-hidden">
      
      {/* Decorative Background Ornaments (Multi-color glow: Emerald & Warm Amber) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-emerald-500/20 via-teal-400/15 to-amber-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[900px] right-[-100px] w-[500px] h-[500px] bg-amber-500/10 blur-[160px] rounded-full -z-10 pointer-events-none" />

      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER SECTION (Clean & Vibrant Accent) */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-16 pb-8 px-4 text-center max-w-4xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase border border-amber-500/30 shadow-lg mb-4">
          <Newspaper size={14} className="text-amber-400 animate-pulse" /> Informasi & Berita Terkini
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
          Kabar <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-400">Rabbani</span>
        </h1>
        <p className="mt-3 text-slate-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Menyajikan jejak langkah, wawasan keislaman, artikel inspiratif, dan dokumentasi agenda dari FKI Rabbani Universitas Andalas.
        </p>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO / FEATURED ARTICLE (Luxurious Card with Gold-Emerald Contrast) */}
      {/* ------------------------------------------------------------- */}
      {selectedCategory === "Semua" && searchQuery === "" && featuredArticle && (
        <section className="max-w-5xl mx-auto px-4 mb-14">
          <div className="relative bg-gradient-to-br from-slate-900 via-emerald-950/70 to-slate-900 text-white rounded-3xl overflow-hidden border border-emerald-500/40 shadow-2xl group ring-1 ring-white/10">
            
            {/* Ambient Lighting on Hero */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-700 pointer-events-none" />
            <Flame size={140} className="absolute -bottom-10 -right-10 text-emerald-500/10 pointer-events-none select-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Gambar Utama */}
              <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[320px] overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Teks Utama */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4 relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-slate-950 uppercase bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-1 rounded-full shadow-md">
                    <Sparkles size={12} className="text-slate-950" /> {featuredArticle.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-200 bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                    <Calendar size={13} className="text-amber-400" /> {featuredArticle.date}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <User size={14} className="text-emerald-400" /> {featuredArticle.author}
                  </span>
                  <Link
                    href={`/kabar/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors group/link"
                  >
                    Baca Selengkapnya <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. FILTER & SEARCH BAR (Glassmorphic Contrast) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-800 shadow-xl ring-1 ring-white/5">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
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
              placeholder="Cari kabar atau artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. ARTICLE GRID LIST (Clean Light-Dark Contrast Cards) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="group relative bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800/80 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ring-1 ring-white/5"
              >
                {/* Top Colorful Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-2">
                      <Calendar size={13} /> {article.date}
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs mt-auto">
                    <span className="text-slate-400 font-medium text-[11px] truncate max-w-[140px]">
                      {article.author}
                    </span>
                    <Link
                      href={`/kabar/${article.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Detail <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800">
            <Search size={36} className="mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-300">Artikel Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian yang berbeda.</p>
          </div>
        )}
      </section>

    </div>
  );
}