import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProgramKerja from "../components/program/ProgramKerja";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Kerja",
  description:
    "Berbagai program kerja Forum Kajian Islam Rabbani Universitas Andalas dalam bidang dakwah, kaderisasi, pengembangan, dan pelayanan mahasiswa.",
};

export default function ProgramKerjaPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24">
        <ProgramKerja />
      </main>

      <Footer />
    </>
  );
}