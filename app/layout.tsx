import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

// ========================================
// Viewport Configuration
// ========================================
export const viewport: Viewport = {
  themeColor: "#065f46",
};

// ========================================
// Website Metadata (SEO)
// ========================================
export const metadata: Metadata = {
  metadataBase: new URL("https://fkirabbani.vercel.app"),

  title: {
    default: "FKI Rabbani Universitas Andalas",
    template: "%s | FKI Rabbani Universitas Andalas",
  },

  description:
    "Website resmi Forum Kajian Islam Rabbani Universitas Andalas. Menyajikan informasi mengenai profil organisasi, berita, galeri kegiatan, dakwah kampus, kaderisasi, serta berbagai aktivitas mahasiswa muslim Universitas Andalas.",

  applicationName: "FKI Rabbani Website",

  authors: [
    {
      name: "Forum Kajian Islam Rabbani Universitas Andalas",
    },
  ],

  creator: "Forum Kajian Islam Rabbani Universitas Andalas",

  publisher: "Forum Kajian Islam Rabbani Universitas Andalas",

  category: "Education",

  referrer: "origin-when-cross-origin",

  keywords: [
    "FKI Rabbani",
    "Forum Kajian Islam Rabbani",
    "Universitas Andalas",
    "Unand",
    "UKM Universitas Andalas",
    "UKM Unand",
    "Dakwah Kampus",
    "Lembaga Dakwah Kampus",
    "LDK",
    "Mahasiswa Muslim",
    "Kajian Islam",
    "FSI Universitas Andalas",
    "Organisasi Mahasiswa Islam",
  ],

  alternates: {
    canonical: "https://fkirabbani.vercel.app",
  },

  openGraph: {
    title: "FKI Rabbani Universitas Andalas",

    description:
      "Website resmi Forum Kajian Islam Rabbani Universitas Andalas.",

    url: "https://fkirabbani.vercel.app",

    siteName: "FKI Rabbani",

    locale: "id_ID",

    type: "website",

    images: [
      {
        url: "/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "FKI Rabbani Universitas Andalas",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "FKI Rabbani Universitas Andalas",

    description:
      "Website resmi Forum Kajian Islam Rabbani Universitas Andalas.",

    images: ["/images/og-banner.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// ========================================
// Root Layout
// ========================================
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