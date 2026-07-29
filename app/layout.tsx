import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next";
import "./globals.css";

// Konfigurasi Viewport (Theme Color & Tampilan Mobile)
export const viewport: Viewport = {
  themeColor: "#065f46",
};

// Konfigurasi Metadata Utama & Security Policy
export const metadata: Metadata = {
  metadataBase: new URL("https://fkirabbaniunand.vercel.app"), // ganti jika nanti memakai domain sendiri

  referrer: "origin-when-cross-origin", // 👈 16.7 Security: Melindungi kebocoran URL internal saat mengklik link keluar

  title: {
    default: "FKI Rabbani Universitas Andalas",
    template: "%s | FKI Rabbani Universitas Andalas",
  },

  description:
    "Website resmi Forum Kajian Islam Rabbani Universitas Andalas. Menyajikan informasi mengenai profil organisasi, program kerja, berita, agenda, serta kegiatan dakwah dan kaderisasi mahasiswa muslim.",

  keywords: [
    "FKI Rabbani",
    "Forum Kajian Islam Rabbani",
    "Universitas Andalas",
    "UKM Unand",
    "Organisasi Islam Kampus",
    "Dakwah Kampus",
    "Mahasiswa Muslim",
    "FSI Universitas Andalas",
  ],

  authors: [
    {
      name: "Forum Kajian Islam Rabbani Universitas Andalas",
    },
  ],

  creator: "Forum Kajian Islam Rabbani Universitas Andalas",

  publisher: "Forum Kajian Islam Rabbani Universitas Andalas",

  applicationName: "FKI Rabbani Website",

  category: "Education",

  openGraph: {
    title: "FKI Rabbani Universitas Andalas",
    description:
      "Website resmi Forum Kajian Islam Rabbani Universitas Andalas.",
    url: "https://fkirabbaniunand.vercel.app",
    siteName: "FKI Rabbani",
    locale: "id_ID",
    type: "website",

    images: [
      {
        url: "https://fkirabbaniunand.vercel.app/logo/fki-logo.png", // Ubah dengan domain lengkap Anda
        // width: 512,
        // height: 512,
        // alt: "Logo Resmi FKI Rabbani Universitas Andalas",
      },
    ],
  },

  twitter: {
    card: "summary", // Diubah ke summary agar sesuai untuk logo kotak/square
    title: "FKI Rabbani Universitas Andalas",
    description:
      "Website resmi Forum Kajian Islam Rabbani Universitas Andalas.",
    images: ["/logo/fki-logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-[#021d17] text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}