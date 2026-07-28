'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kajian');
  const [content, setContent] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Ambil data berita berdasarkan ID saat halaman pertama kali dibuka
  useEffect(() => {
    if (!id) return;

    const fetchNewsDetail = async () => {
      setFetching(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setErrorMsg('Gagal memuat data berita.');
      } else if (data) {
        setTitle(data.title || '');
        setCategory(data.category || 'Kajian');
        setContent(data.content || '');
        setExistingImageUrl(data.image_url || '');
      }
      setFetching(false);
    };

    fetchNewsDetail();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let imageUrl = existingImageUrl;

      // Jika user mengupload gambar baru
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `news/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // Update data ke tabel 'news'
      const { error: updateError } = await supabase
        .from('news')
        .update({
          title,
          category,
          content,
          image_url: imageUrl,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // Kembali ke halaman admin berita
      router.push('/admin/news');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat memperbarui berita.');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        
        <Link 
          href="/admin/news" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Kelola Berita
        </Link>

        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-black text-white tracking-tight mb-2">Edit Berita</h1>
          <p className="text-xs text-slate-400 mb-6">Perbarui informasi atau isi konten berita FKI Rabbani.</p>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Judul Berita</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
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
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Ganti Gambar Utama (Opsional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {existingImageUrl && !imageFile && (
              <div className="text-xs text-slate-400">
                Gambar saat ini: <a href={existingImageUrl} target="_blank" rel="noreferrer" className="text-emerald-400 underline">Lihat Gambar</a>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Isi Konten Berita</label>
              <textarea 
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                  <Loader2 size={18} className="animate-spin" /> Menyimpan Perubahan...
                </>
              ) : (
                <>
                  <Save size={18} /> Simpan Perubahan Berita
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}