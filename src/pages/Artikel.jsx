import { useState } from "react";
import { Search, ChevronLeft, Home, Languages, BookOpen, Siren, User, Clock, Star } from "lucide-react";

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

const tabs = ["All", "Education", "Health", "Story"];

const latestStories = [
  {
    id: 1,
    kategori: "EDUCATION",
    judul: "Inclusive Classroom...",
    deskripsi: "How teachers are adapting methods to support deaf...",
    durasi: "5 min",
    waktu: "2 hours ago",
    warnKategori: "#f59e0b",
    gambar: null,
  },
  {
    id: 2,
    kategori: "HEALTH",
    judul: "Latest in Auditory Wellness",
    deskripsi: "Modern medical breakthroughs and daily habits for...",
    durasi: "12 min",
    waktu: "Yesterday",
    warnKategori: "#10b981",
    gambar: null,
  },
];

const inspirational = {
  kategori: "INSPIRATIONAL STORY",
  judul: "Breaking Barriers at 20",
  kutipan: '"Silence is not a barrier, it\'s just a different way of experiencing the world\'s music."',
  penulis: "Jane Doe",
  durasi: "4 min read",
  inisial: "JD",
  angka: "99",
};

export default function Artikel({ onKembali }) {
  const [activeNav, setActiveNav] = useState("kamus");
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen overflow-x-hidden">

        {/* ── HEADER ── */}
        <div className="bg-gray-100 px-4 pt-10 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onKembali} className="text-gray-500">
              <ChevronLeft size={22} />
            </button>
            <div className="flex items-center gap-2">
              <img src="/logoku.png" alt="logo" className="h-8 w-auto" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-green-600 text-xs font-semibold">Online</span>
          </div>
        </div>

        {/* ── SEARCH ── */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm flex items-center px-4 py-3 gap-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search articles or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-600 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* ── FEATURED ARTICLE ── */}
        <div className="px-4 mb-4">
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1a6b6b 0%, #2d9a9a 100%)", minHeight: "180px" }}
          >
            {/* overlay gelap bawah */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
            />
            {/* konten */}
            <div className="absolute bottom-0 left-0 p-4">
              <span
                className="text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block"
                style={{ backgroundColor: "#010451", color: "#FEF3B3" }}
              >
                FEATURED
              </span>
              <h2 className="text-white font-extrabold text-lg leading-tight mb-1">
                The Future of Sign Language Technology
              </h2>
              <div className="flex items-center gap-3 text-white/70 text-xs">
                <span className="flex items-center gap-1"><Clock size={11} /> 8 min read</span>
                <span className="flex items-center gap-1"><Star size={11} /> Educational</span>
              </div>
            </div>
            {/* dekorasi kanan atas */}
            <div className="absolute top-4 right-4 opacity-30">
              <div className="w-16 h-10 border border-white/50 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">Article</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition"
                style={
                  activeTab === tab
                    ? { backgroundColor: "#FEF3B3", color: "#b8860b" }
                    : { backgroundColor: "#fff", color: "#888" }
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── LATEST STORIES ── */}
        <div className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-extrabold text-gray-800 text-base">Latest Stories</p>
            <button style={{ color: "#b8860b" }} className="text-xs font-semibold">
              View all
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {latestStories.map((artikel) => (
              <div key={artikel.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm">
                {/* thumbnail */}
                <div
                  className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center bg-gray-100"
                  style={{ minWidth: "80px" }}
                >
                  {artikel.gambar ? (
                    <img src={artikel.gambar} alt={artikel.judul} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <span className="text-gray-300 text-2xl">🖼</span>
                  )}
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold mb-0.5" style={{ color: artikel.warnKategori }}>
                    {artikel.kategori}
                  </p>
                  <p className="font-bold text-gray-800 text-sm leading-tight mb-1">{artikel.judul}</p>
                  <p className="text-xs text-gray-400 leading-tight mb-2">{artikel.deskripsi}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <span className="flex items-center gap-1"><Clock size={10} /> {artikel.durasi}</span>
                    <span>•</span>
                    <span>{artikel.waktu}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── INSPIRATIONAL STORY ── */}
        <div className="px-4 pb-24">
          <div
            className="rounded-2xl p-4 relative"
            style={{ backgroundColor: "#dce8ff" }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: "#1849A6" }}>
                  {inspirational.kategori}
                </p>
                <p className="font-extrabold text-base" style={{ color: "#010451" }}>
                  {inspirational.judul}
                </p>
              </div>
              <span className="font-extrabold text-2xl" style={{ color: "#010451" }}>
                {inspirational.angka}
              </span>
            </div>
            <p className="text-xs text-gray-500 italic mb-3 leading-relaxed">
              {inspirational.kutipan}
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "#1849A6" }}
              >
                {inspirational.inisial}
              </div>
              <span className="text-xs text-gray-500 font-semibold">{inspirational.penulis}</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-400">{inspirational.durasi}</span>
            </div>
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