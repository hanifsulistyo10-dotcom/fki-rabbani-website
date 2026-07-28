'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Send, Loader2, MessageSquarePlus, CheckCircle2 } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Kritik & Saran');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('messages').insert([
        { name: name || 'Anonim', email: email || '-', category, message }
      ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      alert('Gagal mengirim pesan: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
          
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full mb-3">
              <MessageSquarePlus size={14} /> Suara Anda
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Kritik, Saran & Pertanyaan
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Sampaikan masukan, ide, atau pertanyaan Anda untuk kemajuan FKI Rabbani Universitas Andalas.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 size={48} className="mx-auto text-emerald-600 mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">Pesan Berhasil Dikirim!</h3>
              <p className="text-xs text-slate-600 mb-6">Jazakumullahu khairan, masukan Anda telah diterima oleh tim pengurus.</p>
              <button 
                onClick={() => { setSubmitted(false); setMessage(''); setName(''); setEmail(''); }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-500 transition-all"
              >
                Kirim Pesan Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Nama (Opsional)</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Nama Anda" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Email / Kontak (Opsional)</label>
                  <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email / No WhatsApp" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Kategori</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="Kritik & Saran">Kritik & Saran</option>
                  <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Pesan / Masukan Anda <span className="text-red-500">*</span></label>
                <textarea 
                  rows={5} 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Tuliskan kritik, saran, atau pertanyaan Anda secara detail di sini..." 
                  required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} 
                Kirim Pesan ke Admin
              </button>
            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}