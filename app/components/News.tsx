import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";

import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

// Tentukan 1 path foto dummy yang sama di folder public
const DUMMY_IMAGE_PATH = "/images/dummy-kegiatan.jpg"; 
// Pastikan file foto tersimpan di: public/images/dummy-kegiatan.jpg

const news = [
  {
    image: DUMMY_IMAGE_PATH,
    category: "Kajian",
    date: "22 Juli 2026",
    title: "Judul Artikel Pertama",
    description:
      "Template artikel kegiatan FKI Rabbani. Nantinya dapat diganti dengan berita resmi organisasi.",
  },
  {
    image: DUMMY_IMAGE_PATH,
    category: "Kaderisasi",
    date: "20 Juli 2026",
    title: "Judul Artikel Kedua",
    description:
      "Template berita pembinaan, mentoring, ataupun agenda kaderisasi FKI Rabbani.",
  },
  {
    image: DUMMY_IMAGE_PATH,
    category: "Pengabdian",
    date: "18 Juli 2026",
    title: "Judul Artikel Ketiga",
    description:
      "Template berita kegiatan sosial, dakwah, maupun kolaborasi bersama FSI Universitas Andalas.",
  },
];

export default function News() {
  return (
    <section
      id="berita"
      className="bg-white py-24 lg:py-32"
    >
      <Container>

        <SectionTitle
          badge="Berita Terbaru"
          title="Kabar"
          highlight="Rabbani"
          description="Berbagai informasi, kegiatan, dan artikel terbaru dari Forum Kajian Islam Rabbani Universitas Andalas."
        />

        <div className="mt-16 lg:mt-20 grid gap-8 lg:grid-cols-3">

          {news.map((item, index) => (
            <article
              key={index}
              className="
                group
                overflow-hidden
                rounded-[32px]
                border
                border-emerald-100
                bg-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8">

                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={16} />
                    {item.date}
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold leading-snug text-[#032b22] line-clamp-1">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600 line-clamp-2">
                  {item.description}
                </p>

                <button
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-emerald-700
                    transition
                    hover:gap-3
                  "
                >
                  Baca Selengkapnya
                  <ArrowRight size={18} />
                </button>

              </div>

            </article>
          ))}

        </div>

        {/* BUTTON */}
        <div className="mt-16 text-center">
          <button
            className="
              rounded-xl
              bg-[#032b22]
              px-8
              py-4
              font-semibold
              text-white
              transition
              duration-300
              hover:bg-emerald-700
              hover:shadow-xl
            "
          >
            Lihat Semua Artikel
          </button>
        </div>

      </Container>
    </section>
  );
}