import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Organization from "../components/about/Organization";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Mengenal lebih dekat Forum Kajian Islam Rabbani Universitas Andalas, mulai dari sejarah, visi, misi, hingga struktur organisasi.",
};

export default function TentangPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24">
        <Organization />
      </main>

      <Footer />
    </>
  );
}