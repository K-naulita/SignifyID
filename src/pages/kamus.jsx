import { useState } from "react";
import { Search, SlidersHorizontal, Home, Languages, BookOpen, Siren, User, Camera } from "lucide-react";
import { TbTriangleSquareCircle } from "react-icons/tb";
import Kuis from "./Kuis";

// ── palet warna custom ───────────────────────────────────────────────────────
// #FEF3B3 = kuning muda (tombol selesai)
// #1849A6 = biru sedang (aksen)
// #010451 = biru tua/navy (primary)

const categories = [
  {
    id: 1,
    title: "Kata Tanya",
    icon: "❓",
    bgColor: "bg-orange-100",
    completed: false,
  },
  {
    id: 2,
    title: "Kata Kerja",
    label: "VERB",
    bgColor: "bg-teal-100",
    completed: false,
  },
  {
    id: 3,
    title: "Makanan",
    icon: "🍴",
    bgColor: "bg-red-100",
    completed: false,
  },
  {
    id: 4,
    title: "Keluarga",
    icon: "🧍",
    bgColor: "bg-gray-100",
    completed: false,
  },
];

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

function CategoryCard({ category, onMain }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
      {/* icon box */}
      <div
        className={`relative rounded-xl ${category.bgColor} flex items-center justify-center h-28`}
      >
        {category.completed && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            ✓ SELESAI
          </span>
        )}
        {category.label ? (
          <span style={{ color: "#010451" }} className="text-2xl font-extrabold tracking-wide">
            {category.label}
          </span>
        ) : (
          <span className="text-4xl">{category.icon}</span>
        )}
      </div>

      {/* title */}
      <p className="text-center font-semibold text-gray-800 text-sm">{category.title}</p>

      {/* button */}
      {category.completed ? (
        <button
          style={{ backgroundColor: "#FEF3B3", color: "#010451" }}
          className="w-full font-semibold text-sm py-2 rounded-full transition hover:opacity-90"
        >
          Main Lagi ↺
        </button>
      ) : (
        <button
          onClick={onMain}
          style={{ backgroundColor: "#010451" }}
          className="w-full text-white font-semibold text-sm py-2 rounded-full transition hover:opacity-90"
        >
          Main
        </button>
      )}
    </div>
  );
}

export default function Kamus() {
  const [activeNav, setActiveNav] = useState("kamus");
  const [search, setSearch] = useState("");
  const [halamanKuis, setHalamanKuis] = useState(null);

  if (halamanKuis) {
  return <Kuis onKembali={() => setHalamanKuis(null)} />;
}

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen relative">

        {/* ── HEADER — gradient diagonal kiri atas ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #FEF3B3 0%, #1849A6 60%, #010451 100%)",
          }}
          className="px-4 pt-10 pb-16 rounded-b-3xl"
        >
          {/* top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button className="text-white">
                <span className="text-xl">☰</span>
              </button>
              <div>
                <p className="text-white font-thin text-base">Selamat Datang</p>
                <p className="text-white font-bold text-base">Shafira NZ</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="rounded-full px-3 py-1.5 flex items-center gap-2"
                style={{ backgroundColor: "rgba(254,243,179,0.2)" }}
              >
                <span className="text-sm">🪙</span>
                <span className="font-bold text-sm" style={{ color: "#FEF3B3" }}>
                  2.450
                </span>
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
              >
                <User size={18} className="text-white" />
              </div>
            </div>
          </div>

          {/* tagline */}
          <div>
            <p className="text-white font-extrabold text-lg leading-tight">
              Yuk Main Games BISINDO!
            </p>
            <p className="text-white font-thin text-lg leading-tight">
              Kumpulin poin dan dapatkan hadiah spesial dari SignifyID!
            </p>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="px-4 -mt-6 mb-4">
          <div className="bg-white rounded-2xl shadow-md flex items-center px-4 py-3 gap-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari kata favorit kamu disini..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-600 outline-none placeholder:text-gray-400"
            />
            <button
              style={{ backgroundColor: "#010451" }}
              className="text-white p-2 rounded-xl"
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="px-4 pb-24 flex-1">
          {/* section header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: "#e8eeff" }}>
                <TbTriangleSquareCircle size={18} style={{ color: "#1849A6" }} />
              </div>
              <span className="font-bold text-gray-800 text-sm">Kategori Main</span>
            </div>
            <button style={{ color: "#1849A6" }} className="text-xs font-semibold">
              Lihat Semua
            </button>
          </div>

          {/* grid */}
          <div className="grid grid-cols-2 gap-3">
            {categories
              .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
              .map((cat) => (
                <CategoryCard key={cat.id} category={cat} onMain={() => setHalamanKuis(cat.id)} />
              ))}
          </div>
        </div>

        {/* ── FAB camera — fixed ── */}
        <button
          style={{ backgroundColor: "#e8eeff", color: "#1849A6" }}
          className="fixed bottom-20 right-4 p-3 rounded-full shadow-lg hover:opacity-90 transition z-40"
        >
          <Camera size={22} />
        </button>

        {/* ── BOTTOM NAV ── */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 flex justify-around items-center py-3 z-50">
          {navItems.map(({ label, icon: Icon, key }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              style={activeNav === key ? { color: "#1849A6" } : {}}
              className={`flex flex-col items-center gap-0.5 text-xs transition ${
                activeNav === key ? "font-semibold" : "text-gray-400"
              }`}
            >
              <Icon size={20} strokeWidth={activeNav === key ? 2.5 : 1.5} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}