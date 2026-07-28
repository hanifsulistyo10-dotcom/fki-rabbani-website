import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Calendar, User, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailKabarPage({ params }: PageProps) {
  const { slug } = await params;

  // Ambil data artikel berdasarkan slug dari Supabase
  const { data: article, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 via-[#012b22] to-slate-950 min-h-screen text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-24">
      <div className="max-w-3xl mx-auto px-4 pt-10">
        
        {/* Tombol Kembali */}
        <Link 
          href="/kabar" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8 transition-colors bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-md"
        >
          <ArrowLeft size={16} /> Kembali ke Kabar Rabbani
        </Link>

        {/* Header Artikel */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-slate-950 uppercase bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-1 rounded-full shadow-md">
              <Sparkles size={12} className="text-slate-950" /> {article.category || 'Berita'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-200 bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-sm">
              <Calendar size={13} className="text-amber-400" /> 
              {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <User size={14} className="text-emerald-400" />
            <span>{article.author || 'Humas FKI Rabbani'}</span>
          </div>
        </div>

        {/* Gambar Utama */}
        {article.image_url && (
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden mb-10 border border-slate-800 shadow-2xl bg-slate-950">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Konten Artikel */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
            {article.content}
          </div>
        </div>

      </div>
    </div>
  );
}