'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  Calendar,
  FolderOpen,
  Loader2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  event_date: string;
  cover_image: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = [
    'Semua',
    'Kajian',
    'Pengabdian',
    'Kaderisasi',
    'Acara Besar',
    'Kebersamaan',
  ];

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const { data } = await supabase
          .from('galleries')
          .select('*')
          .order('event_date', { ascending: false });

        if (data) setGalleries(data);
      } catch (err) {
        console.error('Gagal memuat galeri:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleries();
  }, []);

  const filteredGalleries =
    selectedCategory === 'Semua'
      ? galleries
      : galleries.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-36 pb-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles
                size={14}
                className="text-emerald-600 animate-pulse"
              />
              Dokumentasi Dakwah & Kegiatan
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Galeri{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                FKI Rabbani
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 mt-4 leading-relaxed font-normal">
              Jejak langkah, kebersamaan, dan momen berharga dalam perjalanan
              dakwah keluarga besar FKI Rabbani Universitas Andalas.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 transform active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/25 ring-2 ring-emerald-600/20'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:border-emerald-500/40 hover:bg-emerald-50/30 hover:text-emerald-700 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2
                size={36}
                className="animate-spin text-emerald-600"
              />
            </div>
          ) : filteredGalleries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredGalleries.map((item) => (
                <Link
                  key={item.id}
                  href={`/gallery/${item.id}`}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 group flex flex-col"
                >
                  <div className="relative h-52 bg-slate-900 overflow-hidden flex items-center justify-center border-b border-slate-100">
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-10" />

                    <span className="absolute top-3 left-3 z-20 text-[10px] font-black uppercase tracking-wider bg-emerald-950/85 backdrop-blur-md text-emerald-200 px-3 py-1 rounded-full border border-emerald-500/30 shadow-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mb-2">
                        <Calendar
                          size={13}
                          className="text-emerald-500"
                        />
                        {new Date(item.event_date).toLocaleDateString(
                          'id-ID',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-emerald-600 group-hover:text-emerald-700">
                      <span>Lihat Semua Foto</span>

                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <ArrowRight
                          size={13}
                          className="transform group-hover:translate-x-0.5 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto">
              <FolderOpen
                size={48}
                className="mx-auto text-emerald-500/60 mb-3 animate-bounce"
              />

              <p className="text-sm font-bold text-slate-700">
                Belum ada album galeri untuk kategori ini.
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Silakan pilih kategori lainnya.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}