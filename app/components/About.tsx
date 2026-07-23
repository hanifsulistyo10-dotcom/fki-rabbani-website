import Image from "next/image";
import {
  BookOpen,
  Users,
  Handshake,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

const highlights = [
  {
    icon: BookOpen,
    title: "Dakwah",
    desc: "Menyebarkan nilai-nilai Islam melalui pembinaan dan kajian.",
  },
  {
    icon: Users,
    title: "Kaderisasi",
    desc: "Mencetak mahasiswa muslim yang aktif dan berintegritas.",
  },
  {
    icon: Handshake,
    title: "Kolaborasi",
    desc: "Membangun sinergi bersama FSI dan berbagai lembaga kampus.",
  },
  {
    icon: Sparkles,
    title: "Pengembangan",
    desc: "Mengembangkan karakter, kepemimpinan, dan soft skill kader.",
  },
];

export default function About() {
  return (
    <section
      id="tentang"
      className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/50 to-white py-28"
    >
      {/* Top Divider Line */}
      <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute top-40 -left-20 h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl" />
        <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-green-100/30 blur-3xl" />

        {/* Noise Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <Container>
        {/* Wrapper z-10 agar konten berada di atas background glow/noise */}
        <div className="relative z-10">
          <SectionTitle
            badge="Tentang Kami"
            title="Mengenal Lebih Dekat"
            highlight="FKI Rabbani"
            description="Forum Kajian Islam Rabbani merupakan Unit Kegiatan Mahasiswa Universitas Andalas yang berfokus pada dakwah, kaderisasi, pembinaan, serta pengembangan karakter mahasiswa muslim."
          />

          <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">
            {/* FOTO */}
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-emerald-100 blur-3xl" />
              <div className="relative overflow-hidden rounded-[36px] border-4 border-emerald-100 shadow-2xl">
                <Image
                  src="/images/about.jpg"
                  alt="Tentang FKI Rabbani"
                  width={700}
                  height={800}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Sejak 2003
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight text-[#032b22]">
                Membentuk Mahasiswa Muslim
                <span className="block text-emerald-600">
                  Berilmu, Berakhlak, Berdampak
                </span>
              </h2>

              <p className="mt-8 leading-8 text-gray-600">
                Forum Kajian Islam Rabbani hadir sebagai wadah pembinaan,
                kaderisasi, dakwah, dan pengembangan karakter mahasiswa muslim di
                Universitas Andalas. Kami percaya bahwa perubahan besar dimulai
                dari pribadi yang baik, lingkungan yang sehat, serta ukhuwah yang
                kuat.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Kajian Islam yang berkelanjutan",
                  "Pembinaan karakter mahasiswa muslim",
                  "Pengembangan kepemimpinan kader",
                  "Kolaborasi bersama FSI Universitas Andalas",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-600" size={22} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HIGHLIGHT */}
          <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[28px] border border-emerald-100/70 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-emerald-50 shadow-md transition group-hover:scale-110">
                    <Icon size={30} className="text-emerald-700" />
                  </div>

                  <h3 className="text-xl font-bold text-[#032b22]">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}