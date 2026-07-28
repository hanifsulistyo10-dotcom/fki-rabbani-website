import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import Container from "../components/ui/Container";

export default function KolaborasiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white py-24 lg:py-32 flex items-center">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          
          {/* Ikon Kolaborasi */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-inner">
            <Users size={36} className="animate-pulse" />
          </div>

          <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            Segera Hadir
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-[#032b22] md:text-5xl">
            Kolaborasi <span className="text-emerald-600">& Jaringan</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Halaman ini sedang dalam tahap pengembangan. Nantikan informasi lengkap seputar jaringan dan aliansi kebaikan, serta kemitraan strategis bersama FKI Rabbani di sini.
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