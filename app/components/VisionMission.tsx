"use client";

import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";
import { Globe, GraduationCap, Users, Sparkles, Building2 } from "lucide-react";

export default function VisionMission() {
  const misiList = [
    {
      number: "01",
      icon: <Globe className="h-6 w-6 text-emerald-700" />,
      title: "Poros Gerakan Kebaikan Kampus",
      description:
        "Menjadikan FKI Rabbani sebagai pusat penggerak, pengarah, dan penguat berbagai inisiatif kebaikan di kampus yang mampu menciptakan sinergi gerakan yang berdampak luas dan berkelanjutan.",
    },
    {
      number: "02",
      icon: <GraduationCap className="h-6 w-6 text-emerald-700" />,
      title: "Melahirkan Kader Unggul",
      description:
        "Mewujudkan kader Rabbani yang unggul secara kepribadian, intelektual, dan organisasi, serta mampu menjadi teladan dan berkontribusi aktif di lingkungan kampus.",
    },
    {
      number: "03",
      icon: <Users className="h-6 w-6 text-emerald-700" />,
      title: "Membuka Ruang Kolaborasi yang Luas",
      description:
        "Membangun kolaborasi strategis dengan berbagai lembaga, komunitas, dan civitas kampus untuk memperluas jangkauan manfaat dan memperkuat dampak gerakan.",
    },
    {
      number: "04",
      icon: <Sparkles className="h-6 w-6 text-emerald-700" />,
      title: "Menghadirkan Syiar yang Kreatif",
      description:
        "Menghadirkan syiar yang kreatif, adaptif, dan sesuai dengan karakter mahasiswa sehingga mampu menarik partisipasi dan mudah dipahami.",
    },
    {
      number: "05",
      icon: <Building2 className="h-6 w-6 text-emerald-700" />,
      title: "Memperkuat Peradaban Kebaikan di Unand",
      description:
        "Mendorong terbentuknya budaya kampus yang berlandaskan nilai kebaikan, kepedulian, dan tanggung jawab sebagai fondasi peradaban yang berkelanjutan.",
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
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#032b22] leading-relaxed max-w-5xl mx-auto italic">
              &ldquo;Menjadikan FKI Rabbani sebagai poros gerakan kebaikan kampus yang melahirkan kader unggul, membuka ruang kolaborasi yang luas, dan menghadirkan syiar yang kreatif untuk memperkuat peradaban kebaikan Universitas&nbsp;Andalas.&rdquo;
            </h3>
          </div>
        </div>

        {/* Swipe / Scroll Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 px-2 scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-emerald-100">
          {misiList.map((misi, index) => (
            <div
              key={index}
              className="min-w-[280px] sm:min-w-[320px] max-w-[350px] flex-shrink-0 snap-center group rounded-[28px] border border-emerald-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-300 flex flex-col justify-between"
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
        <p className="text-center text-xs text-emerald-700 mt-4 tracking-wide font-medium">
          ← Geser untuk melihat misi lainnya →
        </p>
      </Container>
    </section>
  );
}