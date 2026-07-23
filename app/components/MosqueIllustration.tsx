// Premium MosqueIllustration.tsx
// Replace this file with a more detailed version later if desired.

export default function MosqueIllustration() {
  return (
    <div className="relative flex items-center justify-center w-[420px] h-[420px]">
      <div className="absolute inset-8 rounded-full border border-emerald-300/20" />
      <div className="absolute inset-16 rounded-full border border-emerald-300/10" />
      <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" />

      <div className="absolute top-8 text-yellow-300 text-3xl">☾</div>

      <div className="absolute left-14 bottom-24 w-5 h-44 rounded bg-emerald-600">
        <div className="absolute -top-4 left-[-5px] w-8 h-8 rotate-45 bg-emerald-400"></div>
      </div>

      <div className="absolute right-14 bottom-24 w-5 h-44 rounded bg-emerald-600">
        <div className="absolute -top-4 left-[-5px] w-8 h-8 rotate-45 bg-emerald-400"></div>
      </div>

      <div className="absolute bottom-20 w-56 h-28 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-100 shadow-2xl border border-emerald-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-20 w-36 h-24 rounded-t-full bg-gradient-to-b from-emerald-300 to-emerald-600"></div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-14 h-20 rounded-t-full bg-emerald-800"></div>

        <div className="absolute left-6 top-7 grid grid-cols-3 gap-2">
          <span className="w-3 h-8 rounded-t-full bg-emerald-700"></span>
          <span className="w-3 h-8 rounded-t-full bg-emerald-700"></span>
          <span className="w-3 h-8 rounded-t-full bg-emerald-700"></span>
        </div>

        <div className="absolute right-6 top-7 grid grid-cols-3 gap-2">
          <span className="w-3 h-8 rounded-t-full bg-emerald-700"></span>
          <span className="w-3 h-8 rounded-t-full bg-emerald-700"></span>
          <span className="w-3 h-8 rounded-t-full bg-emerald-700"></span>
        </div>
      </div>

      <div className="absolute left-2 top-28 rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/10">
        <p className="text-xs text-emerald-100">Pengurus</p>
        <h3 className="text-white font-bold">110+</h3>
      </div>

      <div className="absolute right-2 bottom-24 rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/10">
        <p className="text-xs text-emerald-100">FSI</p>
        <h3 className="text-white font-bold">16+</h3>
      </div>
    </div>
  );
}
