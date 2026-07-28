import Link from "next/link";
import { Globe, ArrowLeft } from "lucide-react";
import Container from "../components/ui/Container";

// Komponen SVG Kustom untuk Ikon Media Sosial
const InstagramIcon = () => (
  <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

const TiktokIcon = () => (
  <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialMediaList = [
  {
    name: "Instagram",
    handle: "@rabbani_unand",
    desc: "Kajian, dokumentasi kegiatan, dan info seputar FKI Rabbani.",
    href: "https://instagram.com/rabbani_unand",
    icon: InstagramIcon,
    color: "from-pink-500 to-purple-600",
    shadowColor: "hover:shadow-pink-500/10",
  },
  {
    name: "YouTube",
    handle: "FKI Rabbani",
    desc: "Rekaman kajian, video profil, dan dokumentasi acara akbar.",
    href: "https://youtube.com",
    icon: YoutubeIcon,
    color: "from-red-500 to-red-700",
    shadowColor: "hover:shadow-red-500/10",
  },
  {
    name: "TikTok",
    handle: "@sobatrabbani",
    desc: "Konten video kreatif, edukasi, dan keseruan dakwah kampus.",
    href: "https://tiktok.com/@sobatrabbani",
    icon: TiktokIcon,
    color: "from-slate-900 to-slate-800",
    shadowColor: "hover:shadow-slate-500/10",
  },
  {
    name: "Facebook",
    handle: "FKI Rabbani Unand",
    desc: "Informasi resmi, artikel, dan ukhuwah civitas kampus.",
    href: "https://facebook.com",
    icon: FacebookIcon,
    color: "from-blue-600 to-blue-800",
    shadowColor: "hover:shadow-blue-500/10",
  },
  {
    name: "Twitter / X",
    handle: "rabbaniunand",
    desc: "Thread informasi, kabar terkini, dan interaksi interaktif.",
    href: "https://twitter.com/rabbaniunand",
    icon: TwitterIcon,
    color: "from-sky-400 to-sky-600",
    shadowColor: "hover:shadow-sky-500/10",
  },
  {
    name: "LinkedIn",
    handle: "FKI Rabbani Unand",
    desc: "Jaringan profesional, informasi karier, dan pengembangan diri.",
    href: "https://linkedin.com",
    icon: LinkedinIcon,
    color: "from-blue-700 to-blue-900",
    shadowColor: "hover:shadow-blue-700/10",
  },
];

export default function MediaSosialPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-inner animate-pulse">
            <Globe size={36} />
          </div>

          <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            Kanal Resmi
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-[#032b22] md:text-5xl">
            Media Sosial <span className="text-emerald-600">FKI Rabbani</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Terhubunglah dengan seluruh kanal resmi Forum Kajian Islam Rabbani Universitas Andalas untuk mendapatkan update kajian, informasi kegiatan, dan konten inspiratif lainnya.
          </p>

          {/* Daftar Kartu Media Sosial dengan Efek Interaktif */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 text-left">
            {socialMediaList.map((soc) => {
              const IconComponent = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-start gap-4 p-5 rounded-3xl bg-white/90 hover:bg-white border border-emerald-900/10 hover:border-emerald-500/40 transition-all duration-300 shadow-sm hover:shadow-2xl ${soc.shadowColor} hover:-translate-y-1.5`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${soc.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1.5">
                      {soc.name}
                      <span className="text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </h2>
                    <p className="text-xs font-medium text-emerald-600 mt-0.5">
                      {soc.handle}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {soc.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Tombol Kembali ke Beranda */}
          <div className="mt-12">
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
                hover:-translate-y-1
              "
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </Container>
    </main>
  );
}