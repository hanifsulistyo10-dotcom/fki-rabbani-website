'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { LayoutDashboard, Newspaper, Settings, Image as ImageIcon, Inbox, LogOut, ShieldCheck, Trash2, Loader2, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminMessagesPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  // State untuk Pagination Pesan
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      setUserEmail(session.user.email ?? '');
      fetchMessages();
    }
    init();
  }, [router]);

  async function fetchMessages() {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return;
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (!error) fetchMessages();
  };

  // Logika Pagination Pesan
  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMessages = messages.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <p className="text-sm font-medium animate-pulse">Memuat kotak masuk pesan...</p>
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
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <LayoutDashboard size={18} /> Ringkasan
            </Link>
            <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <Newspaper size={18} /> Berita
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <ImageIcon size={18} /> Galeri
            </Link>
            <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-600/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
              <Inbox size={18} /> Kotak Masuk ({messages.length})
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <Settings size={18} /> Pengaturan
            </Link>
          </nav>
        </div>

        <button onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }} className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors w-full">
          <LogOut size={18} /> Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight">Kotak Masuk Kritik & Saran</h1>
          <p className="text-xs text-slate-400 mt-1">Daftar masukan dan pertanyaan yang dikirimkan oleh pengunjung melalui website.</p>
        </header>

        {messages.length > 0 ? (
          <div className="space-y-6">
            <div className="space-y-4">
              {currentMessages.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-4 font-medium">
                      <span>Pengirim: <strong className="text-white">{item.name}</strong></span>
                      <span>Kontak: <strong className="text-white">{item.email}</strong></span>
                    </div>
                    <p className="text-sm text-slate-100 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600/10 border border-red-500/20 hover:bg-red-600 text-red-400 hover:text-white p-2.5 rounded-xl transition-all self-end md:self-center"
                    title="Hapus Pesan"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Bagian Navigasi Pagination Pesan */}
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
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-950 rounded-3xl border border-slate-800">
            <Mail size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="text-sm font-semibold text-slate-300">Belum ada pesan atau kritik & saran yang masuk.</p>
          </div>
        )}
      </main>
    </div>
  );
}