import { ArrowRight, Mail, Users } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#032b22] via-[#064e3b] to-[#0f766e] py-28">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-green-300/10 blur-3xl" />

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">

        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/10 p-14 text-center shadow-2xl backdrop-blur-xl">

          {/* Icon */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400 text-white shadow-xl">

            <Users size={38} />

          </div>

          {/* Heading */}

          <h2 className="mt-10 text-4xl font-black leading-tight text-white md:text-5xl">

            Siap Menjadi Bagian dari
            <br />

            <span className="text-emerald-300">

              Generasi Rabbani?

            </span>

          </h2>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100">

            Bergabunglah bersama FKI Rabbani Universitas Andalas
            untuk bertumbuh dalam ilmu, dakwah,
            kepemimpinan, dan pengabdian kepada umat.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <button className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-green-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

              Gabung Sekarang

              <ArrowRight size={20} />

            </button>

            <button className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10">

              <Mail size={20} />

              Hubungi Kami

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}