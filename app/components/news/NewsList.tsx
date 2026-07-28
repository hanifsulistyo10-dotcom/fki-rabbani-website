'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Search, Calendar, User, ArrowRight, Sparkles, Flame, Newspaper, Loader2 } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CATEGORIES = ["Semua", "Kajian", "Syiar", "Prestasi", "Pengabdian","Pelatihan"];

export default function KabarRabbaniPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil data dari Supabase saat halaman dimuat
  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error('Gagal mengambil berita:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Berita terbaru otomatis menjadi Featured Artikel di atas
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const gridArticles = articles.length > 0 && selectedCategory === "Semua" && searchQuery === "" 
    ? articles.slice(1) 
    : filteredArticles;

  return (
    <div className="bg-gradient-to-b from-slate-900 via-[#012b22] to-slate-950 min-h-screen text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-24 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-emerald-500/20 via-teal-400/15 to-amber-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[900px] right-[-100px] w-[500px] h-[500px] bg-amber-500/10 blur-[160px] rounded-full -z-10 pointer-events-none" />

      {/* HEADER SECTION */}
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

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 size={36} className="animate-spin text-emerald-400" />
          <p className="text-xs text-slate-400 font-medium">Memuat kabar terbaru...</p>
        </div>
      ) : articles.length === 0 ? (
        /* KONDISI JIKA BELUM ADA BERITA */
        <div className="text-center py-20 bg-slate-900/60 max-w-md mx-auto rounded-3xl border border-slate-800 p-8 mt-6">
          <Newspaper size={40} className="mx-auto text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-slate-300">Belum Ada Berita</h3>
          <p className="text-xs text-slate-500 mt-1">Silakan tambahkan berita baru melalui halaman Admin Dashboard Anda.</p>
        </div>
      ) : (
        <>
          {/* HERO / FEATURED ARTICLE (Berita Terbaru) */}
          {selectedCategory === "Semua" && searchQuery === "" && featuredArticle && (
            <section className="max-w-5xl mx-auto px-4 mb-14">
              <div className="relative bg-gradient-to-br from-slate-900 via-emerald-950/70 to-slate-900 text-white rounded-3xl overflow-hidden border border-emerald-500/40 shadow-2xl group ring-1 ring-white/10">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-700 pointer-events-none" />
                <Flame size={140} className="absolute -bottom-10 -right-10 text-emerald-500/10 pointer-events-none select-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[320px] overflow-hidden bg-slate-950">
                    {featuredArticle.image_url ? (
                      <Image
                        src={featuredArticle.image_url}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">Tanpa Gambar</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
                  </div>

                  <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4 relative z-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-slate-950 uppercase bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-1 rounded-full shadow-md">
                        <Sparkles size={12} className="text-slate-950" /> {featuredArticle.category || 'Berita Utama'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-200 bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                        <Calendar size={13} className="text-amber-400" /> {new Date(featuredArticle.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {featuredArticle.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <User size={14} className="text-emerald-400" /> <div className="flex items-center gap-2 text-xs text-slate-400">
                           <span>{featuredArticle.author || 'Humas FKI Rabbani'}</span>
                           </div>
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

          {/* FILTER & SEARCH BAR */}
          <section className="max-w-5xl mx-auto px-4 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-800 shadow-xl ring-1 ring-white/5">
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

          {/* ARTICLE GRID LIST */}
          <section className="max-w-5xl mx-auto px-4">
            {gridArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridArticles.map((article) => (
                  <div
                    key={article.id}
                    className="group relative bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800/80 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ring-1 ring-white/5"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      {article.image_url ? (
                        <Image
                          src={article.image_url}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">Tanpa Gambar</div>
                      )}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow">
                          {article.category || 'Kajian'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-2">
                          <Calendar size={13} /> {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>

                        <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-2">
                          {article.title}
                        </h3>

                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {article.content}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs mt-auto">
                        <span className="text-slate-400 font-medium text-[11px] truncate max-w-[140px]">
                          Humas FKI Rabbani
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
              <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800">
                <Search size={36} className="mx-auto text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-slate-300">Artikel Tidak Ditemukan</h3>
                <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian atau kategori yang berbeda.</p>
              </div>
            )}
          </section>
        </>
      )}

    </div>
  );
}