import { useState } from "react";
import { Search, Home, Languages, BookOpen, Siren, User, Menu, ChevronRight } from "lucide-react";
import DetailKategori from "./DetailKategori";

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

const kategori = [
  {
    id: 1,
    nama: "Sapaan",
    kosakata: 42,
    bg: "#1a7a5e",
    icon: "🤚",
  },
  {
    id: 2,
    nama: "Keluarga",
    kosakata: 28,
    bg: "#ffd6d6",
    icon: null,
  },
  {
    id: 3,
    nama: "Kesehatan",
    kosakata: 56,
    bg: "#e8eeff",
    icon: "🧰",
  },
  {
    id: 4,
    nama: "Kebutuhan Dasar",
    kosakata: 35,
    bg: "#fff3e0",
    icon: "🏠",
  },
];

function KategoriCard({ item,  onLihat }) {

  return (
    <div className="bg-white rounded-2xl px-4 py-4 flex items-center gap-4 shadow-sm">
      {/* icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
        style={{ backgroundColor: item.bg }}
      >
        {item.icon ? item.icon : ""}
      </div>

      {/* info */}
      <div className="flex-1">
        <p className="font-bold text-gray-800 text-sm">{item.nama}</p>
        <p className="text-xs text-gray-400">{item.kosakata} kosakata</p>
      </div>

      {/* tombol */}
      <button
        onClick={() => onLihat(item.nama)}
        className="px-5 py-2 rounded-full text-white text-sm font-semibold transition hover:opacity-90"
        style={{ backgroundColor: "#010451" }}
      >
        Lihat
      </button>
    </div>
  );
}

export default function KamusIsyarat() {
  const [activeNav, setActiveNav] = useState("kamus");
  const [search, setSearch] = useState("");
  const [kategoriDipilih, setKategoriDipilih] = useState(null);

  const filtered = kategori.filter((k) =>
    k.nama.toLowerCase().includes(search.toLowerCase())
  );

  if (kategoriDipilih) {
        return <DetailKategori namaKategori={kategoriDipilih} onKembali={() => setKategoriDipilih(null)} />;
        }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen overflow-x-hidden">

        {/* ── NAVBAR TOP ── */}
        <div className="bg-gray-100 px-4 pt-10 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-gray-500">
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
              <img src="/logoku.png" alt="logo" className="h-8 w-auto" />
              <span className="font-bold text-gray-800 text-sm">SignifyID</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-green-600 text-xs font-semibold">Online</span>
          </div>
        </div>

        {/* ── BANNER ── */}
        <div className="px-4 mb-4">
          <div
            className="rounded-2xl px-5 py-6"
            style={{ backgroundColor: "#dce8ff" }}
          >
            <h1 className="font-extrabold text-xl mb-2" style={{ color: "#010451" }}>
              Kamus Isyarat
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Cari dan pelajari ribuan kosakata bahasa isyarat kapan saja.
            </p>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="px-4 mb-5">
          <div className="bg-white rounded-2xl shadow-sm flex items-center px-4 py-3 gap-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari kosakata isyarat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-600 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* ── KATEGORI POPULER ── */}
        <div className="px-4 pb-24">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-extrabold text-gray-800 text-base">Kategori Populer</p>
              <p className="text-xs text-gray-400">Dipilih oleh ribuan pengguna</p>
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "#FEF3B3", color: "#b8860b" }}
            >
              Lihat Semua
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((item) => (
              <KategoriCard key={item.id} item={item} onLihat={setKategoriDipilih} />
            ))}
          </div>
        </div>

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