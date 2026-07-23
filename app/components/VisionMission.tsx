"use client";

import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";
import Card from "./ui/Card";
import { Compass, Target, Sparkles, HeartHandshake } from "lucide-react";

export default function VisionMission() {
  const misiList = [
    {
      number: "01",
      icon: <Compass className="h-6 w-6 text-emerald-700" />,
      title: "Pembinaan & Kaderisasi",
      description:
        "Menyelenggarakan pembinaan dakwah dan kaderisasi mahasiswa muslim Universitas Andalas secara inklusif dan berkelanjutan.",
    },
    {
      number: "02",
      icon: <Target className="h-6 w-6 text-emerald-700" />,
      title: "Pengembangan Potensi",
      description:
        "Mengembangkan potensi kepemimpinan, keilmuan, dan karakter Rabbani pada setiap anggota.",
    },
    {
      number: "03",
      icon: <Sparkles className="h-6 w-6 text-emerald-700" />,
      title: "Syiar Islam Creative",
      description:
        "Membangun syiar Islam yang kreatif, edukatif, dan berdampak positif bagi lingkungan kampus maupun masyarakat.",
    },
    {
      number: "04",
      icon: <HeartHandshake className="h-6 w-6 text-emerald-700" />,
      title: "Sinergi & Kolaborasi",
      description:
        "Menjalin kolaborasi dan sinergi strategis dengan lembaga dakwah, elemen kampus, serta alumni.",
    },
  ];

  return (
    <section id="visi-misi" className="py-32 bg-[#ECFDF5] text-[#032b22] relative overflow-hidden">
      {/* Background Decor Glow */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="absolute left-0 bottom-1/4 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />

      <Container>
        {/* Section Title */}
        <SectionTitle
          badge="Arah Organisasi"
          title="Visi &"
          highlight="Misi Rabbani"
          description="Nilai dan tujuan utama yang menjadi landasan seluruh gerak langkah organisasi FKI Rabbani Universitas Andalas."
        />

        {/* Highlight Visi */}
        <div className="mb-16">
          <div className="rounded-[32px] bg-white border border-emerald-200 shadow-xl p-8 sm:p-12 text-center transition-all duration-300 hover:shadow-2xl hover:border-emerald-300">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800 border border-emerald-200 mb-6">
              Visi Utama
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#032b22] leading-relaxed max-w-4xl mx-auto italic">
              &ldquo;Menjadi wadah pembinaan dan gerakan dakwah kampus terdepan yang mewujudkan generasi Rabbani, berilmu, berakhlaqul karimah, serta berkontribusi nyata bagi bangsa dan umat.&rdquo;
            </h3>
          </div>
        </div>

        {/* Grid Misi */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {misiList.map((misi, index) => (
            <div
              key={index}
              className="group rounded-[28px] border border-emerald-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="rounded-2xl bg-emerald-100 p-3.5 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white">
                    {misi.icon}
                  </div>
                  <span className="text-3xl font-black text-emerald-200 group-hover:text-emerald-400 transition-colors">
                    {misi.number}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-[#032b22] mb-3">
                  {misi.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {misi.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}