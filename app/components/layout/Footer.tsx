"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

// Custom SVG Icons untuk Media Sosial dengan aria-hidden="true" (A11y)
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

function TiktokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.88V7.58a6.34 6.34 0 0 0-1 .08 6.34 6.34 0 1 0 7.34 6.25V8.58a8.27 8.27 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.01z" />
    </svg>
  );
}

const socials = [
  {
    title: "Instagram",
    value: "@rabbani_unand",
    href: "https://instagram.com/rabbani_unand",
    ariaLabel: "Buka halaman Instagram FKI Rabbani Universitas Andalas di tab baru",
    icon: InstagramIcon,
  },
  {
    title: "YouTube",
    value: "FKI Rabbani",
    href: "https://youtube.com/@fkirabbani",
    ariaLabel: "Buka kanal YouTube FKI Rabbani Universitas Andalas di tab baru",
    icon: YoutubeIcon,
  },
  {
    title: "TikTok",
    value: "@sobatrabbani",
    href: "https://tiktok.com/@sobatrabbani",
    ariaLabel: "Buka akun TikTok Sobat Rabbani di tab baru",
    icon: TiktokIcon,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="kontak"
      className="relative overflow-hidden bg-[#021d17] text-white"
    >
      {/* Background Glow */}
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-12">
        {/* ================= MAIN GRID ================= */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Kolom 1: Profil Organisasi (4 Column) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5">
                <Image
                  src="/logo/fki-logo.png"
                  alt="Logo Resmi FKI Rabbani Universitas Andalas"
                  width={56}
                  height={56}
                  className="object-contain"
                />
                <div>
                  <span className="block text-xl font-black tracking-wide text-white">
                    FKI Rabbani
                  </span>
                  <p className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                    Universitas Andalas
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-300">
                Forum Kajian Islam Rabbani merupakan Unit Kegiatan Mahasiswa
                Universitas Andalas yang berfokus pada dakwah, kaderisasi,
                pembinaan, dan pengembangan karakter mahasiswa muslim.
              </p>
            </div>

            <blockquote className="mt-6 rounded-xl border-l-2 border-emerald-500 bg-emerald-950/40 p-3.5 italic text-xs leading-relaxed text-emerald-200">
              &ldquo;Membentuk Mahasiswa Muslim Berilmu, Berakhlak, dan
              Berdampak.&rdquo;
            </blockquote>
          </div>

          {/* Kolom 2: Navigasi Cepat (2 Column) */}
          <div className="lg:col-span-2">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-emerald-400">
              Navigasi
            </h2>
            <nav aria-label="Navigasi Footer">
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <Link
                    href="/"
                    className="transition hover:text-emerald-400 hover:underline"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <a
                    href="#tentang"
                    className="transition hover:text-emerald-400 hover:underline"
                  >
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#program"
                    className="transition hover:text-emerald-400 hover:underline"
                  >
                    Program Kerja
                  </a>
                </li>
                <li>
                  <a
                    href="#kabar"
                    className="transition hover:text-emerald-400 hover:underline"
                  >
                    Kabar Rabbani
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Kolom 3: Informasi Kontak (3 Column) */}
          <div className="lg:col-span-3">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-emerald-400">
              Hubungi Kami
            </h2>
            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                <p className="leading-snug">
                  Gedung PKM Universitas Andalas Lt. 2, Kampus Limau Manis,
                  Pauh, Padang, Sumatera Barat 25176
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-emerald-400" aria-hidden="true" />
                {/* 🔒 16.7 Security & Standard: mailto: */}
                <a
                  href="mailto:kestarirabbaniunand@gmail.com"
                  className="transition hover:text-emerald-300 hover:underline truncate"
                  aria-label="Kirim email ke KESTARI FKI Rabbani"
                >
                  kestarirabbaniunand@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-emerald-400" aria-hidden="true" />
                {/* 🔒 16.7 Security: https://wa.me/ dan rel="noopener noreferrer" */}
                <a
                  href="https://wa.me/6288223893631"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-emerald-300 hover:underline"
                  aria-label="Hubungi WhatsApp FKI Rabbani"
                >
                  +62 882-2389-3631
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Clock size={18} className="shrink-0 text-emerald-400" aria-hidden="true" />
                <span>Senin – Jum'at, 08.00 – 17.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Kolom 4: Media Sosial (3 Column) */}
          <div className="lg:col-span-3">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-emerald-400">
              Media Sosial
            </h2>
            <div className="space-y-2.5">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer" // 🔒 16.7 Security: Melindungi dari serangan tabnabbing
                    aria-label={item.ariaLabel}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition hover:border-emerald-500/50 hover:bg-emerald-950/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/30 text-emerald-400 transition group-hover:bg-emerald-600 group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white">
                          {item.title}
                        </span>
                        <p className="text-[11px] text-slate-400">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <ExternalLink
                      size={14}
                      className="text-slate-500 transition group-hover:text-emerald-400"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= GOOGLE MAPS SECTION ================= */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2 shadow-inner">
          <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden">
            <iframe
              title="Peta Lokasi Sekretariat FKI Rabbani Universitas Andalas"
              src="https://www.google.com/maps?q=Gedung+PKM+Universitas+Andalas&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0 filter grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition duration-500"
              allowFullScreen
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-400 md:flex-row">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Forum Kajian Islam Rabbani Universitas
            Andalas. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <span className="text-slate-400">
              Developed by{" "}
              <strong className="text-emerald-400 font-semibold">
                Biro KESTARI
              </strong>
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Kembali ke bagian paling atas halaman"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-300 transition hover:bg-emerald-600 hover:text-white"
            >
              <ChevronUp size={15} aria-hidden="true" /> Ke Atas
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}