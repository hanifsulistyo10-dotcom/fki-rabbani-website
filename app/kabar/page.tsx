import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NewsList from "../components/news/NewsList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kabar Rabbani",
  description:
    "Berita, informasi, dan dokumentasi kegiatan terbaru Forum Kajian Islam Rabbani Universitas Andalas.",
};

export default function KabarRabbaniPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24">
        <NewsList />
      </main>

      <Footer />
    </>
  );
}