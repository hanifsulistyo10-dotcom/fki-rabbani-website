'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { LayoutDashboard, Newspaper, Settings, Image as ImageIcon, LogOut, ShieldCheck, Plus, Trash2, Loader2, Upload, Edit3, Inbox } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface GalleryPhoto {
  id: number;
  gallery_id: number;
  image_url: string;
  caption?: string;
}

export default function AdminGalleryPage() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleries, setGalleries] = useState<any[]>([]);

  // Form Album Utama
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kajian');
  const [eventDate, setEventDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form Tambah Foto ke Album Tertentu
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('');
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);
  const [photoCaption, setPhotoCaption] = useState<string>('');
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  // State untuk Kelola, Hapus & Ubah Caption Foto di Dalam Album
  const [selectedAlbumForPhotos, setSelectedAlbumForPhotos] = useState<string>('');
  const [albumPhotos, setAlbumPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [selectedPhotosToDelete, setSelectedPhotosToDelete] = useState<number[]>([]);
  const [isDeletingPhotos, setIsDeletingPhotos] = useState(false);

  // State untuk Modal Ubah Caption
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [newCaption, setNewCaption] = useState<string>('');
  const [isUpdatingCaption, setIsUpdatingCaption] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      setUserEmail(session.user.email ?? '');
      fetchGalleries();
    }
    init();
  }, [router]);

  useEffect(() => {
    if (selectedAlbumForPhotos) {
      fetchAlbumPhotos(selectedAlbumForPhotos);
    } else {
      setAlbumPhotos([]);
      setSelectedPhotosToDelete([]);
    }
  }, [selectedAlbumForPhotos]);

  async function fetchGalleries() {
    const { data } = await supabase.from('galleries').select('*').order('event_date', { ascending: false });
    if (data) setGalleries(data);
    setLoading(false);
  }

  async function fetchAlbumPhotos(galleryId: string) {
    setLoadingPhotos(true);
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('gallery_id', galleryId);

      if (error) throw error;
      if (data) setAlbumPhotos(data);
    } catch (err) {
      console.error('Gagal memuat foto album:', err);
    } finally {
      setLoadingPhotos(false);
    }
  }

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('Pilih foto sampul terlebih dahulu!');
    setSubmitting(true);
    setSuccessMsg('');

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, imageFile);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(filePath);
      const coverUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from('galleries').insert([
        { title, category, event_date: eventDate, cover_image: coverUrl }
      ]);
      if (insertError) throw insertError;

      setSuccessMsg('Album galeri berhasil ditambahkan!');
      setTitle('');
      setEventDate('');
      setImageFile(null);
      fetchGalleries();
    } catch (err: any) {
      alert('Gagal menambah album: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddPhotosToAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbumId || !photoFiles || photoFiles.length === 0) {
      return alert('Pilih album dan minimal satu foto dokumentasi!');
    }
    setUploadingPhotos(true);

    try {
      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `detail_${Date.now()}_${i}.${fileExt}`;
        const filePath = `gallery/details/${fileName}`;

        const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(filePath);
        
        await supabase.from('gallery_photos').insert([
          { 
            gallery_id: selectedAlbumId, 
            image_url: publicUrlData.publicUrl,
            caption: photoCaption.trim() ? photoCaption : null
          }
        ]);
      }

      alert('Berhasil mengunggah foto dokumentasi ke album!');
      setPhotoFiles(null);
      setPhotoCaption('');
      setSelectedAlbumId('');
      if (selectedAlbumForPhotos === selectedAlbumId) {
        fetchAlbumPhotos(selectedAlbumForPhotos);
      }
    } catch (err: any) {
      alert('Gagal mengunggah foto: ' + err.message);
    } finally {
      setUploadingPhotos(false);
    }
  };

  const handleDeleteAlbum = async (id: number) => {
    if (!confirm('Yakin ingin menghapus album ini beserta seluruh fotonya?')) return;
    try {
      await supabase.from('gallery_photos').delete().eq('gallery_id', id);
      const { error } = await supabase.from('galleries').delete().eq('id', id);
      if (error) throw error;

      if (selectedAlbumForPhotos === String(id)) setSelectedAlbumForPhotos('');
      fetchGalleries();
    } catch (err) {
      alert('Gagal menghapus album.');
    }
  };

  const toggleSelectPhoto = (photoId: number) => {
    if (selectedPhotosToDelete.includes(photoId)) {
      setSelectedPhotosToDelete(selectedPhotosToDelete.filter(id => id !== photoId));
    } else {
      setSelectedPhotosToDelete([...selectedPhotosToDelete, photoId]);
    }
  };

  const handleDeleteSelectedPhotos = async () => {
    if (selectedPhotosToDelete.length === 0) return;
    if (!confirm(`Hapus ${selectedPhotosToDelete.length} foto yang dipilih?`)) return;

    setIsDeletingPhotos(true);
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .in('id', selectedPhotosToDelete);

      if (error) throw error;

      alert('Foto berhasil dihapus!');
      setSelectedPhotosToDelete([]);
      fetchAlbumPhotos(selectedAlbumForPhotos);
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus foto.');
    } finally {
      setIsDeletingPhotos(false);
    }
  };

  const handleUpdateCaption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    setIsUpdatingCaption(true);
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .update({ caption: newCaption.trim() ? newCaption : null })
        .eq('id', editingPhoto.id);

      if (error) throw error;

      alert('Caption berhasil diperbarui!');
      setEditingPhoto(null);
      setNewCaption('');
      fetchAlbumPhotos(selectedAlbumForPhotos);
    } catch (err: any) {
      alert('Gagal memperbarui caption: ' + err.message);
    } finally {
      setIsUpdatingCaption(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <p className="text-sm font-medium animate-pulse">Memuat panel galeri...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row relative">
      {/* Sidebar Lengkap */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/30">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Admin Panel</h2>
              <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{userEmail}</p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link 
              href="/admin/dashboard" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === '/admin/dashboard' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <LayoutDashboard size={18} /> Ringkasan
            </Link>
            <Link 
              href="/admin/news" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === '/admin/news' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Newspaper size={18} /> Berita
            </Link>
            <Link 
              href="/admin/gallery" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === '/admin/gallery' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <ImageIcon size={18} /> Galeri
            </Link>
            <Link 
              href="/admin/messages" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === '/admin/messages' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Inbox size={18} /> Kotak Masuk
            </Link>
            <Link 
              href="/admin/settings" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === '/admin/settings' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Settings size={18} /> Pengaturan
            </Link>
          </nav>
        </div>

        <button onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }} className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors w-full">
          <LogOut size={18} /> Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-10">
        <header>
          <h1 className="text-2xl font-black text-white tracking-tight">Kelola Galeri & Album</h1>
          <p className="text-xs text-slate-400 mt-1">Tambah album kegiatan dan unggah dokumentasi foto di dalamnya.</p>
        </header>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <span>✅</span> {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Tambah Album */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-bold text-white mb-4 pb-2 border-b border-slate-900 flex items-center gap-2">
              <Plus size={16} className="text-emerald-500" /> 1. Tambah Album Baru
            </h2>

            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">Judul Kegiatan</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Contoh: Kajian Akbar 2026" 
                  required 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">Kategori</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Kajian">Kajian</option>
                    <option value="Pengabdian">Pengabdian</option>
                    <option value="Kaderisasi">Kaderisasi</option>
                    <option value="Acara Besar">Acara Besar</option>
                    <option value="Kebersamaan">Kebersamaan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">Tanggal</label>
                  <input 
                    type="date" 
                    value={eventDate} 
                    onChange={(e) => setEventDate(e.target.value)} 
                    required 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">Foto Sampul</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
                  required 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white cursor-pointer"
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} 
                Buat Album Utama
              </button>
            </form>
          </div>

          {/* Form Tambah Banyak Foto ke Album */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-bold text-white mb-4 pb-2 border-b border-slate-900 flex items-center gap-2">
              <Upload size={16} className="text-emerald-500" /> 2. Unggah Foto ke Dalam Album
            </h2>

            <form onSubmit={handleAddPhotosToAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">Pilih Album Tujuan</label>
                <select 
                  value={selectedAlbumId} 
                  onChange={(e) => setSelectedAlbumId(e.target.value)} 
                  required 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">-- Pilih Album --</option>
                  {galleries.map((album) => (
                    <option key={album.id} value={album.id}>{album.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">Pilih Foto-Foto (Bisa Banyak Sekaligus)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={(e) => setPhotoFiles(e.target.files)} 
                  required 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">Anda dapat menahan tombol Ctrl/Command untuk memilih lebih dari satu foto.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">Keterangan / Caption Foto (Opsional)</label>
                <input 
                  type="text" 
                  value={photoCaption} 
                  onChange={(e) => setPhotoCaption(e.target.value)} 
                  placeholder="Kosongkan saja jika tidak ingin diberi keterangan" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button 
                type="submit" 
                disabled={uploadingPhotos}
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-teal-900/30 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
              >
                {uploadingPhotos ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} 
                Unggah Foto Dokumentasi
              </button>
            </form>
          </div>
        </div>

        {/* 3. Kotak Khusus Kelola, Hapus & Ubah Caption Foto di Dalam Album */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-slate-900">
            <div>
              <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Trash2 size={16} /> 3. Kelola, Hapus & Ubah Caption Foto di Dalam Album
              </h2>
              <p className="text-xs text-slate-400 mt-1">Pilih album untuk melihat foto, klik untuk memilih & menghapus, atau klik tombol edit pada foto untuk mengubah caption.</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select 
                value={selectedAlbumForPhotos} 
                onChange={(e) => setSelectedAlbumForPhotos(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 min-w-[240px]"
              >
                <option value="">-- Pilih Album untuk Dikelola --</option>
                {galleries.map(album => (
                  <option key={album.id} value={album.id}>{album.title}</option>
                ))}
              </select>

              {selectedPhotosToDelete.length > 0 && (
                <button
                  onClick={handleDeleteSelectedPhotos}
                  disabled={isDeletingPhotos}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-lg"
                >
                  {isDeletingPhotos ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  Hapus Foto ({selectedPhotosToDelete.length})
                </button>
              )}
            </div>
          </div>

          {loadingPhotos ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 size={24} className="animate-spin text-emerald-500" />
            </div>
          ) : !selectedAlbumForPhotos ? (
            <div className="text-center py-10 text-slate-500 text-xs bg-slate-900/50 rounded-xl border border-slate-800">
              Silakan pilih album di atas terlebih dahulu untuk melihat foto-fotonya.
            </div>
          ) : albumPhotos.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs bg-slate-900/50 rounded-xl border border-slate-800">
              Belum ada foto dokumentasi di dalam album ini.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {albumPhotos.map((photo) => {
                const isSelected = selectedPhotosToDelete.includes(photo.id);
                return (
                  <div 
                    key={photo.id}
                    className={`relative group rounded-xl overflow-hidden border-2 transition-all bg-slate-900 flex flex-col justify-between ${
                      isSelected ? 'border-red-500 ring-2 ring-red-500/50 scale-95 shadow-lg' : 'border-slate-800 hover:border-emerald-500'
                    }`}
                  >
                    <div 
                      onClick={() => toggleSelectPhoto(photo.id)}
                      className="h-32 bg-slate-950 relative cursor-pointer"
                    >
                      <img 
                        src={photo.image_url} 
                        alt="Dokumentasi" 
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 transition-opacity flex items-start p-2 justify-end ${
                        isSelected ? 'opacity-100 bg-red-950/40' : 'opacity-0 group-hover:opacity-100 bg-slate-950/40'
                      }`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300 border border-slate-600'
                        }`}>
                          {isSelected ? '✓' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 flex flex-col justify-between flex-1 gap-2">
                      <p className="text-[11px] text-slate-300 truncate" title={photo.caption || ''}>
                        {photo.caption ? photo.caption : <span className="italic text-slate-500">Tanpa caption</span>}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPhoto(photo);
                          setNewCaption(photo.caption || '');
                        }}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] font-bold py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit3 size={12} /> Ubah Caption
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Daftar Album Tersimpan */}
        <div>
          <h2 className="text-sm font-bold text-white mb-4">Daftar Album Tersimpan ({galleries.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleries.map((item) => (
              <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between">
                <div>
                  <div className="relative h-40 bg-slate-900">
                    <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-slate-400 mb-1">{item.event_date}</p>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-0 flex justify-end">
                  <button 
                    onClick={() => handleDeleteAlbum(item.id)}
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors text-xs flex items-center gap-1 font-semibold"
                  >
                    <Trash2 size={14} /> Hapus Album
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal Ubah Caption */}
      {editingPhoto && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Edit3 size={16} className="text-emerald-500" /> Perbarui Caption Foto
            </h3>
            
            <div className="h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img src={editingPhoto.image_url} alt="Preview" className="w-full h-full object-cover" />
            </div>

            <form onSubmit={handleUpdateCaption} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">Caption Baru</label>
                <input 
                  type="text" 
                  value={newCaption} 
                  onChange={(e) => setNewCaption(e.target.value)} 
                  placeholder="Masukkan caption baru..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingCaption}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isUpdatingCaption ? <Loader2 size= {14} className="animate-spin" /> : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}