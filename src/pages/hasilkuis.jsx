import { RotateCcw, ChevronRight, Home, Languages, BookOpen, Siren, User } from "lucide-react";
import { FaGift } from "react-icons/fa6";
import { MdDiamond } from "react-icons/md";

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

function Bintang({ jumlah = 3 }) {
  return (
    <div className="flex items-end justify-center gap-2 mb-2">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="transition-all"
          style={{
            fontSize: i === 2 ? "2.8rem" : "2rem",
            filter: i <= jumlah ? "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" : "grayscale(1) opacity(0.4)",
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

export default function HasilKuis({ hasil = {}, onLanjut, onKembali }) {
  const { nilai = 40, total = 100, poin = 10, benar = 2, salah = 3, totalSoal = 5 } = hasil;

  return (
  <div className="min-h-screen bg-gray-100 flex justify-center overflow-x-hidden">
    <div className="w-full max-w-sm flex flex-col min-h-screen relative overflow-x-hidden">

        {/* ── HEADER background gradasi ── */}
        <div
            className="relative flex flex-col items-center pt-10 pb-24 px-4 rounded-b-3xl overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #010451 0%, #1849A6 100%)",
            }}
            >
          {/* icon kiri kanan */}
          <div className="w-full flex items-center justify-between mb-4">
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <span className="text-lg">☰</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <User size={18} />
            </button>
          </div>

          {/* bintang */}
          <Bintang jumlah={3} />

          {/* karakter */}
          <img
            src="/Gambar4.png"
            alt="karakter"
            className="w-52 h-52 object-contain"
          />
        </div>

        {/* ── CARD HASIL ── */}
        <div className="px-4 -mt-16 pb-32">
          <div className="bg-white rounded-3xl shadow-lg px-6 pt-6 pb-8">

            {/* tombol study more */}
            <div className="flex justify-center mb-4">
              <button
                className="flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-semibold transition hover:opacity-80"
                style={{ borderColor: "#010451", color: "#010451" }}
              >
                <RotateCcw size={15} />
                STUDY MORE
              </button>
            </div>

            {/* judul */}
            <h2
              className="text-center text-xl font-extrabold mb-5"
              style={{ color: "#1849A6" }}
            >
              Quiz Completed
            </h2>

            {/* nilai & poin */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gray-100 rounded-2xl px-4 py-4 flex flex-col gap-1 items-center">
                <p className="text-xs text-gray-400 font-semibold">Nilai</p>
                <div className="flex items-center gap-2">
                  <MdDiamond size={22} className="text-blue-400" />
                  <span className="font-extrabold text-lg" style={{ color: "#010451" }}>
                    {nilai}/{total}
                  </span>
                </div>
              </div>
              <div
                className="rounded-2xl px-4 py-4 flex flex-col gap-1 items-center"
                style={{ backgroundColor: "#FEF3B3" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#b8860b" }}>Poin</p>
                <div className="flex items-center gap-2">
                  <FaGift size={20} style={{ color: "#b8860b" }} />
                  <span className="font-extrabold text-lg" style={{ color: "#010451" }}>
                    {poin}
                  </span>
                </div>
              </div>
            </div>

            {/* divider */}
            <hr className="mb-5 border-gray-100" />

            {/* performa */}
            <p
              className="text-center font-extrabold text-base mb-5"
              style={{ color: "#1849A6" }}
            >
              Performa
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* benar */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <span className="font-extrabold text-lg text-green-500">{benar}</span>
                <span className="text-xs text-gray-400">Benar</span>
              </div>
              {/* salah */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✕</span>
                </div>
                <span className="font-extrabold text-lg text-red-500">{salah}</span>
                <span className="text-xs text-gray-400">Salah</span>
              </div>
              {/* total */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#e8eeff" }}
                >
                  <span style={{ color: "#1849A6" }} className="font-bold text-sm">?</span>
                </div>
                <span className="font-extrabold text-lg" style={{ color: "#1849A6" }}>
                  {totalSoal}
                </span>
                <span className="text-xs text-gray-400">Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TOMBOL LANJUT ── */}
        <div className="px-4 pb-24">
          <button
            onClick={onLanjut}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-between px-6 transition hover:opacity-90"
            style={{ backgroundColor: "#010451" }}
          >
            <span>Lanjut Kategori Lain</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ── BOTTOM NAV ── */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 flex justify-around items-center py-3 z-50">
          {navItems.map(({ label, icon: Icon, key }) => (
            <button
              key={key}
              style={key === "kamus" ? { color: "#1849A6" } : {}}
              className={`flex flex-col items-center gap-0.5 text-xs transition ${
                key === "kamus" ? "font-semibold" : "text-gray-400"
              }`}
            >
              <Icon size={20} strokeWidth={key === "kamus" ? 2.5 : 1.5} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}