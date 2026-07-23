import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
      {/* Visual Badge 404 */}
      <div className="relative mb-6">
        <span className="text-8xl sm:text-9xl font-extrabold text-emerald-950/10 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="px-4 py-1.5 bg-amber-100 text-amber-800 text-xs sm:text-sm font-bold rounded-full border border-amber-200">
            Halaman Tidak Ditemukan
          </span>
        </div>
      </div>

      {/* Deskripsi Error */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Waduh, Halaman yang Anda Cari Tidak Ada!
      </h1>
      <p className="text-gray-600 max-w-md mb-8 leading-relaxed text-sm sm:text-base">
        Kemungkinan halaman telah dipindahkan, dihapus, atau Anda salah mengetikkan alamat URL.
      </p>

      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/kabar"
          className="px-6 py-3 rounded-xl border border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-700 font-medium text-sm transition-all"
        >
          Lihat Kabar Terbaru
        </Link>
      </div>
    </div>
  );
}