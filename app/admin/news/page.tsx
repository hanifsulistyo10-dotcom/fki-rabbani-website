'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { LayoutDashboard, Newspaper, Settings, Inbox, LogOut, Plus, ShieldCheck, Trash2, Edit, Search, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface NewsItem {
  id: number | string;
  title: string;
  category: string;
  author?: string;
  created_at: string;
}

export default function AdminNewsPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const router = useRouter();

  useEffect(() => {
    async function checkUserAndFetchNews() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }

      setUserEmail(session.user.email ?? 'Admin');

      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setNewsList(data);
      }
      setLoading(false);
    }

    checkUserAndFetchNews();
  }, [router]);

  const handleDelete = async (id: number | string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini secara permanen dari database?')) return;

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (!error) {
      setNewsList(newsList.filter((item) => item.id !== id));
      router.refresh();
    } else {
      alert('Gagal menghapus berita: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // Filter berita berdasarkan pencarian
  const filteredNews = newsList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logika pembagian halaman (Pagination)
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // Reset ke halaman 1 jika user mengetik di kolom pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <p className="text-sm font-medium animate-pulse">Memuat data berita...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Admin Lengkap */}
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
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <LayoutDashboard size={18} /> Ringkasan
            </Link>
            <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-600/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
              <Newspaper size={18} /> Berita
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <ImageIcon size={18} /> Galeri
            </Link>
            <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <Inbox size={18} /> Kotak Masuk
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <Settings size={18} /> Pengaturan
            </Link>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors w-full"
        >
          <LogOut size={18} /> Keluar
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Berita FKI Rabbani</h1>
            <p className="text-xs text-slate-400 mt-1">Kelola seluruh artikel, kabar, dan publikasi kegiatan organisasi.</p>
          </div>
          <Link 
            href="/admin/news/create" 
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/40"
          >
            <Plus size={16} /> Tambah Berita
          </Link>
        </header>

        {/* Statistik Ringkas Berita */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Berita Dipublikasikan</p>
            <h3 className="text-3xl font-black text-white mt-1">{newsList.length} Artikel</h3>
          </div>
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <Newspaper size={24} />
          </div>
        </div>

        {/* Kolom Pencarian Berita */}
        <div className="relative mb-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Cari judul berita..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
          />
        </div>

        {/* Daftar Berita */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl overflow-hidden mb-6">
          {currentNews.length > 0 ? (
            <div className="divide-y divide-slate-900">
              {currentNews.map((news) => (
                <div key={news.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {news.category || 'Berita'}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{news.title}</h3>
                    <p className="text-[11px] text-slate-400">
                      Penulis: <span className="text-slate-300 font-medium">{news.author || 'Humas FKI Rabbani'}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link 
                      href={`/admin/news/edit/${news.id}`} 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
                    >
                      <Edit size={13} className="text-amber-400" /> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(news.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors"
                    >
                      <Trash2 size={13} /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Belum ada berita yang ditemukan atau sesuai dengan pencarian Anda.
            </div>
          )}
        </div>

        {/* Bagian Navigasi Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 shadow-lg">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} /> Sebelumnya
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-500'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya <ChevronRight size={14} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}