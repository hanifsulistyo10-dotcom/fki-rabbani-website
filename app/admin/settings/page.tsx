'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { LayoutDashboard, Newspaper, Settings, Image as ImageIcon, Inbox , LogOut, ShieldCheck, User, Globe, Info, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminSettingsPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // State form pengaturan
  const [nama, setNama] = useState('Admin FKI Rabbani');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function initData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }

      const emailVal = session.user.email ?? '';
      setUserEmail(emailVal);
      setEmail(emailVal);

      // Ambil status maintenance dari database tabel settings
      const { data: settingsData } = await supabase
        .from('settings')
        .select('maintenance_mode')
        .eq('id', 1)
        .single();

      if (settingsData) {
        setMaintenanceMode(settingsData.maintenance_mode);
      }

      setLoading(false);
    }

    initData();
  }, [router]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // 1. Jika user mengisi password baru
      if (newPassword.trim() !== '') {
        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (updateError) throw updateError;
      }

      // 2. Simpan status Maintenance Mode ke tabel settings di Supabase
      const { error: settingsError } = await supabase
        .from('settings')
        .update({ maintenance_mode: maintenanceMode, updated_at: new Date() })
        .eq('id', 1);

      if (settingsError) throw settingsError;

      setSuccessMsg('Pengaturan & status maintenance berhasil disimpan!');
      setNewPassword('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat menyimpan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <p className="text-sm font-medium animate-pulse">Memuat pengaturan...</p>
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
            <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <Newspaper size={18} /> Berita
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <ImageIcon size={18} /> Galeri
            </Link>
            <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors">
              <Inbox size={18} /> Kotak Masuk
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-600/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
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
        <header className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight">Pengaturan Sistem</h1>
          <p className="text-xs text-slate-400 mt-1">Kelola informasi akun admin, status website, dan informasi sistem.</p>
        </header>

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <span>✅</span> {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
            <span>⚠️</span> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
          
          {/* Section: Akun */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-900 text-white font-bold text-sm">
              <User size={18} className="text-emerald-500" /> Akun Administrator
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Nama Admin</label>
                <input 
                  type="text" 
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Ubah Password Baru (Opsional)</label>
                <input 
                  type="password" 
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section: Website */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-900 text-white font-bold text-sm">
              <Globe size={18} className="text-emerald-500" /> Konfigurasi Website
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Maintenance Mode</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Aktifkan untuk menutup sementara akses pengunjung publik ke website.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* Section: Tentang */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-900 text-white font-bold text-sm">
              <Info size={18} className="text-emerald-500" /> Tentang Sistem
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
                <p className="text-slate-400 font-medium">Versi CMS</p>
                <p className="text-white font-bold text-sm mt-1">FKI Rabbani CMS v1.2.0</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
                <p className="text-slate-400 font-medium">Developer</p>
                <p className="text-emerald-400 font-bold text-sm mt-1">Kestari Digital Team FKI&nbsp;Rabbani&nbsp;Universitas&nbsp;Andalas</p>
              </div>
            </div>
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit" 
            disabled={saving}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Menyimpan Pengaturan...
              </>
            ) : (
              <>
                <Save size={18} /> Simpan Perubahan Pengaturan
              </>
            )}
          </button>

        </form>
      </main>
    </div>
  );
}