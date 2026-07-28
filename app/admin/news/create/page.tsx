'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CreateNewsPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kajian');
  const [author, setAuthor] = useState('Humas FKI Rabbani');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let imageUrl = '';

      // 1. Upload gambar ke Supabase Storage (bucket 'uploads') jika ada file
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `news/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // Ambil Public URL dari gambar yang di-upload
        const { data: publicUrlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // 2. Buat slug otomatis dari judul berita
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');

      // 3. Simpan data berita beserta slug dan author ke tabel 'news'
      const { error: insertError } = await supabase.from('news').insert([
        {
          title,
          slug,
          category,
          author: author || 'Humas FKI Rabbani',
          content,
          image_url: imageUrl,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

      // 4. Arahkan kembali ke dashboard setelah sukses
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat menyimpan berita.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        
        {/* Tombol Kembali */}
        <Link 
          href="/admin/dashboard" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Link>

        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-black text-white tracking-tight mb-2">Tambah Berita Baru</h1>
          <p className="text-xs text-slate-400 mb-6">Publikasikan informasi atau kabar kegiatan terbaru FKI Rabbani.</p>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Judul Berita</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Sukses Gelar RABBIFEST 2026..." 
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Kategori</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="Kajian">Kajian</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Syiar">Syiar</option>
                  <option value="Pengabdian">Pengabdian</option>
                  <option value="Pelatihan">Pelatihan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Penulis / Author </label>
                <input 
                  type="text" 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Contoh: Tim Media FKI Rabbani" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Upload Gambar Utama</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Isi Konten Berita</label>
              <textarea 
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan isi berita atau laporan kegiatan secara lengkap di sini..." 
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Mengunggah & Menyimpan...
                </>
              ) : (
                <>
                  <Send size={18} /> Publikasikan Berita
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}