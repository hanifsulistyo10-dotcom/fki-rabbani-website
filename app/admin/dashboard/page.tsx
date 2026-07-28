'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { LayoutDashboard, Newspaper, Settings, Image as ImageIcon, LogOut, Plus, ShieldCheck, Inbox, FolderKanban } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ActivityItem {
  id: string | number;
  title: string;
  category: string;
  authorOrDate: string;
  created_at: string;
  type: 'news' | 'gallery';
}

export default function AdminDashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk data dinamis dari Supabase
  const [totalNews, setTotalNews] = useState<number>(0);
  const [totalGalleries, setTotalGalleries] = useState<number>(0);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    async function checkUserAndFetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }

      setUserEmail(session.user.email ?? 'Admin');

      // 1. Ambil jumlah total berita
      const { count: newsCount } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true });
      setTotalNews(newsCount || 0);

      // 2. Ambil jumlah total album galeri
      const { count: galleryCount } = await supabase
        .from('galleries')
        .select('*', { count: 'exact', head: true });
      setTotalGalleries(galleryCount || 0);

      // 3. Ambil jumlah total pesan masuk
      const { count: messageCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });
      setTotalMessages(messageCount || 0);

      // 4. Ambil data berita terbaru
      const { data: newsData } = await supabase
        .from('news')
        .select('id, title, category, author, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // 5. Ambil data album galeri terbaru
      const { data: galleryData } = await supabase
        .from('galleries')
        .select('id, title, category, event_date, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Format data berita
      const formattedNews: ActivityItem[] = (newsData || []).map((item) => ({
        id: `news-${item.id}`,
        title: item.title,
        category: item.category,
        authorOrDate: `Penulis: ${item.author || 'Humas FKI Rabbani'}`,
        created_at: item.created_at,
        type: 'news'
      }));

      // Format data galeri
      const formattedGalleries: ActivityItem[] = (galleryData || []).map((item) => ({
        id: `gallery-${item.id}`,
        title: item.title,
        category: item.category || 'Galeri',
        authorOrDate: `Tanggal Kegiatan: ${item.event_date}`,
        created_at: item.created_at || new Date().toISOString(),
        type: 'gallery'
      }));

      // Gabungkan dan urutkan aktivitas berdasarkan waktu input terbaru
      const combinedActivities = [...formattedNews, ...formattedGalleries]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      setRecentActivities(combinedActivities);
      setLoading(false);
    }

    checkUserAndFetchData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <p className="text-sm font-medium animate-pulse">Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
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
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-600/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
              <LayoutDashboard size={18} /> Ringkasan
            </Link>
            <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <Newspaper size={18} /> Berita
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <ImageIcon size={18} /> Galeri
            </Link>
            
            {/* Menu Kotak Masuk */}
            <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <Inbox size={18} /> Kotak Masuk ({totalMessages})
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Ringkasan Sistem</h1>
            <p className="text-sm text-slate-400">Selamat datang kembali di panel pengelola website FKI Rabbani.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/news/create" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-2">
              <Plus size={16} /> Tambah Berita
            </Link>
          </div>
        </header>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Berita</span>
              <Newspaper className="text-emerald-500" size={20} />
            </div>
            <h3 className="text-3xl font-black text-white">{totalNews}</h3>
            <p className="text-xs text-slate-500 mt-1">Artikel dipublikasikan</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Album Galeri</span>
              <FolderKanban className="text-teal-500" size={20} />
            </div>
            <h3 className="text-3xl font-black text-white">{totalGalleries}</h3>
            <p className="text-xs text-slate-500 mt-1">Album dokumentasi tersimpan</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pesan Masuk</span>
              <Inbox className="text-blue-500" size={20} />
            </div>
            <h3 className="text-3xl font-black text-white">{totalMessages}</h3>
            <p className="text-xs text-slate-500 mt-1">Kritik, saran, dan pertanyaan</p>
          </div>
        </div>

        {/* Recent Activity Table Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white mb-4">Aktivitas Terakhir</h3>
          
          {recentActivities.length > 0 ? (
            <div className="divide-y divide-slate-900 border border-slate-800/60 rounded-xl overflow-hidden">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 flex items-center justify-between gap-4 bg-slate-950 hover:bg-slate-900/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        activity.type === 'news' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-teal-950 text-teal-400 border border-teal-500/20'
                      }`}>
                        {activity.type === 'news' ? 'Berita' : 'Galeri Album'}
                      </span>
                      <h4 className="text-sm font-semibold text-white line-clamp-1">{activity.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Kategori: <span className="text-slate-200 font-medium">{activity.category}</span> &bull; {activity.authorOrDate}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-500 whitespace-nowrap bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    {activity.created_at ? new Date(activity.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-slate-800/60 rounded-xl p-8 text-center text-slate-500 text-sm">
              Belum ada data atau aktivitas yang tercatat. Silakan buat berita atau album galeri baru.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}