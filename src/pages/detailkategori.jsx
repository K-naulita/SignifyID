import { useState } from "react";
import { Search, ChevronLeft, Home, Languages, BookOpen, Siren, User } from "lucide-react";
import DetailKata from "./DetailKata";

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

const daftarKata = [
  { id: 1, nama: "Ayah", warna: "#4a6fa5" },
  { id: 2, nama: "Ibu", warna: "#a8d8d0" },
  { id: 3, nama: "Nenek", warna: "#b8e0d8" },
  { id: 4, nama: "Kakek", warna: "#c8ebe4" },
  { id: 5, nama: "Paman", warna: "#010451" },
  { id: 6, nama: "Bibi", warna: "#6b8cc7" },
];

function KataCard({ item, index, onLihat }) {
  return (
    <div className="bg-white rounded-2xl px-4 py-4 flex items-center gap-4 shadow-sm">
      {/* lingkaran warna */}
      <div
        className="w-14 h-14 rounded-full flex-shrink-0"
        style={{ backgroundColor: item.warna }}
      />

      {/* nama */}
      <p className="flex-1 font-semibold text-gray-800 text-base">{item.nama}</p>

      {/* tombol lihat */}
      <button
        onClick={() => onLihat(index)}
        className="px-4 py-1.5 rounded-xl text-sm font-semibold transition hover:opacity-90"
        style={{ backgroundColor: "#FEF3B3", color: "#b8860b" }}
      >
        Lihat
      </button>
    </div>
  );
}

export default function DetailKategori({ namaKategori = "Keluarga", onKembali }) {
  const [activeNav, setActiveNav] = useState("kamus");
  const [search, setSearch] = useState("");
  const [kataIndex, setKataIndex] = useState(null);

  const filtered = daftarKata.filter((k) =>
    k.nama.toLowerCase().includes(search.toLowerCase())
  );

  if (kataIndex !== null) {
  return <DetailKata kataAwal={kataIndex} onKembali={() => setKataIndex(null)} />;
}

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen overflow-x-hidden">

        {/* ── HEADER ── */}
        <div
          className="px-4 pt-10 pb-10 rounded-b-3xl"
          style={{
            background: "linear-gradient(135deg, #FEF3B3 0%, #1849A6 60%, #010451 100%)",
          }}
        >
          {/* top bar */}
          <div className="flex items-center justify-center relative mb-5">
            <button
              onClick={onKembali}
              className="absolute left-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <h1 className="text-white font-bold text-lg">{namaKategori}</h1>
          </div>

          {/* search bar */}
          <div className="bg-white rounded-2xl flex items-center px-4 py-3 gap-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari kategori isyarat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-600 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* ── LIST KATA ── */}
        <div className="px-4 pt-5 pb-24 flex flex-col gap-3">
          {filtered.map((item, index) => (
            <KataCard key={item.id} item={item} index={index} onLihat={setKataIndex} />
          ))}
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