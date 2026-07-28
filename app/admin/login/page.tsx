'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Lock, Mail, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal masuk. Periksa kembali email dan password Anda.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Tombol kembali ke Beranda */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>

        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Aksen Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-emerald-900/40 mb-4">
              <ShieldCheck size={26} />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Login</h1>
            <p className="text-xs text-slate-400 mt-1">FKI Rabbani Dashboard Management</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium leading-relaxed">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Email Admin</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fkirabbani.org" 
                  required
                  suppressHydrationWarning
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  suppressHydrationWarning
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sedang Masuk...
                </>
              ) : (
                'Login Admin'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}