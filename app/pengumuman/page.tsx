import Link from "next/link";
import { Bell, ArrowLeft } from "lucide-react";
import Container from "../components/ui/Container";

export default function PengumumanPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white py-24 lg:py-32 flex items-center">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          
          {/* Ikon Pengumuman */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-inner">
            <Bell size={36} className="animate-bounce" />
          </div>

          <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            Segera Hadir
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-[#032b22] md:text-5xl">
            Pengumuman <span className="text-emerald-600">Rabbani</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Halaman ini sedang dalam tahap pengembangan. Nantikan berbagai informasi penting, pengumuman resmi, serta pendaftaran kader terbaru dari FKI Rabbani Universitas Andalas di sini.
          </p>

          {/* Tombol Kembali ke Beranda */}
          <div className="mt-10">
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#032b22]
                px-8
                py-4
                font-semibold
                text-white
                shadow-xl
                transition
                duration-300
                hover:bg-emerald-700
              "
            >
              <ArrowLeft size={18} />
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </Container>
    </main>
  );
}