'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Calendar, ArrowLeft, Image as ImageIcon, Loader2, X } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function GalleryDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [album, setAlbum] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk modal preview foto
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchAlbumDetail() {
      try {
        const { data: albumData, error: albumError } = await supabase
          .from('galleries')
          .select('*')
          .eq('id', id)
          .single();

        if (albumError) throw albumError;
        setAlbum(albumData);

        const { data: photosData, error: photosError } = await supabase
          .from('gallery_photos')
          .select('*')
          .eq('gallery_id', id)
          .order('created_at', { ascending: false });

        if (photosData) setPhotos(photosData);
      } catch (err) {
        console.error('Gagal memuat detail album:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbumDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-xl font-bold text-slate-800 mb-2">Album Tidak Ditemukan</h1>
          <p className="text-xs text-slate-500 mb-6">Album yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
          <Link href="/gallery" className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">
            Kembali ke Galeri
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Tombol Kembali */}
          <Link href="/gallery" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 mb-8 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Daftar Album
          </Link>

          {/* Header Album */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 mb-12 shadow-sm">
            <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full mb-3">
              {album.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              {album.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Calendar size={14} className="text-emerald-600" />
              {new Date(album.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          {/* Grid Kumpulan Foto */}
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ImageIcon size={20} className="text-emerald-600" /> Dokumentasi Foto ({photos.length})
          </h2>

          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  onClick={() => setActivePhoto(photo)}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img 
                      src={photo.image_url} 
                      alt={photo.caption || album.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {photo.caption && (
                    <div className="p-4">
                      <p className="text-xs text-slate-600 leading-relaxed">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <ImageIcon size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-semibold text-slate-600">Belum ada foto tambahan di dalam album ini.</p>
              <p className="text-xs text-slate-400 mt-1">Foto dokumentasi akan segera diunggah oleh pengurus.</p>
            </div>
          )}

        </div>
      </main>

      {/* Modal / Lightbox Preview Foto */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Tombol Tutup */}
            <button 
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 bg-slate-950/80 hover:bg-slate-800 text-white p-2 rounded-full transition-colors border border-slate-700"
            >
              <X size={20} />
            </button>

            {/* Gambar Diperbesar */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              <img 
                src={activePhoto.image_url} 
                alt={activePhoto.caption || album.title} 
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Keterangan Caption (Jika ada) */}
            {activePhoto.caption && (
              <div className="p-6 bg-slate-950 border-t border-slate-800">
                <p className="text-sm text-slate-200 text-center">{activePhoto.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}