"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-[#032b22]/85 py-3.5 shadow-xl backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm transition duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
            <Image
              src="/logo/fki-logo.png"
              alt="Logo Resmi FKI Rabbani Universitas Andalas"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div>
            <span className="block text-lg font-bold tracking-wide text-white sm:text-xl lg:text-2xl">
              FKI RABBANI
            </span>
            <p className="hidden text-[10px] font-medium uppercase tracking-wider text-emerald-300 sm:block">
              UKM Kebatinan &amp; Kerohanian Islam UNAND
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigasi Utama">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`relative text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-400 after:transition-all hover:text-emerald-300 hover:after:w-full ${
              pathname === "/" ? "text-emerald-300 after:w-full" : "text-white/90"
            }`}
          >
            Beranda
          </Link>

          <Link
            href="/tentang"
            aria-current={pathname === "/tentang" ? "page" : undefined}
            className={`relative text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-400 after:transition-all hover:text-emerald-300 hover:after:w-full ${
              pathname === "/tentang" ? "text-emerald-300 after:w-full" : "text-white/90"
            }`}
          >
            Tentang Kami
          </Link>

          <Link
            href="/program-kerja"
            aria-current={pathname === "/program-kerja" ? "page" : undefined}
            className={`relative text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-400 after:transition-all hover:text-emerald-300 hover:after:w-full ${
              pathname === "/program-kerja" ? "text-emerald-300 after:w-full" : "text-white/90"
            }`}
          >
            Program Kerja
          </Link>

          <Link
            href="/kabar"
            aria-current={pathname === "/kabar" ? "page" : undefined}
            className={`relative text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-400 after:transition-all hover:text-emerald-300 hover:after:w-full ${
              pathname === "/kabar" ? "text-emerald-300 after:w-full" : "text-white/90"
            }`}
          >
            Kabar Rabbani
          </Link>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Link
            href="#kontak"
            className="rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-5 py-2.5 text-sm font-semibold text-emerald-100 backdrop-blur-md transition duration-300 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-900/40"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Mobile Button (Accessibility Fixed) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-xl p-2 text-white transition hover:bg-white/10 md:hidden"
          aria-label={isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isMobileMenuOpen}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 top-full w-full border-t border-white/10 bg-[#032b22]/95 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6">
              <nav className="space-y-2" aria-label="Navigasi Mobile">
                {[
                  ["Beranda", "/"],
                  ["Tentang Kami", "/tentang"],
                  ["Program Kerja", "/program-kerja"],
                  ["Kabar Rabbani", "/kabar"],
                  ["Kontak", "#kontak"],
                ].map(([title, href]) => (
                  <Link
                    key={title}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-white transition hover:bg-white/10 hover:text-emerald-300"
                  >
                    {title}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 border-t border-white/10 pt-6">
                <Link
                  href="#kontak"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl bg-emerald-500 py-3 text-center font-semibold text-white transition hover:bg-emerald-600"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}