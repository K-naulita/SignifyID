import { useState } from "react";
import {
  ChevronLeft, Home, Languages, BookOpen, Siren, User,
  Search, TrendingUp, Users, MapPin, Clock, UserPlus
} from "lucide-react";

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

const filterTabs = ["All Groups", "Students", "Workplace"];

const recommended = [
  {
    id: 1,
    judul: "Campus Signers Union",
    deskripsi: "Connecting students through visual...",
    members: "1.2k members",
    activeNow: true,
    bg: "#2d8a6e",
    avatars: ["#1849A6", "#c0956a", "#4db89e"],
    extraAvatar: "L+",
  },
  {
    id: 2,
    judul: "Inclusive Professionals",
    deskripsi: "Professional network for...",
    members: "980 members",
    activeNow: false,
    bg: "#1849A6",
    avatars: ["#e07b7b", "#a78bfa"],
    extraAvatar: null,
  },
];

const smallGroups = [
  { id: 1, judul: "ASL Tutors", sub: "12 new today", icon: "👩‍🏫", bg: "#e8f5f0", iconBg: "#4db89e" },
  { id: 2, judul: "Coda Support", sub: "4.2k active", icon: "👨‍👩‍👧", bg: "#fef3e8", iconBg: "#f5a623" },
];

const events = [
  {
    id: 1, tanggal: "24", bulan: "OCT", judul: "Digital Inclusion Summit",
    waktu: "10:00 AM", lokasi: "Online", attending: "450 attending", tipe: "online",
  },
  {
    id: 2, tanggal: "02", bulan: "NOV", judul: "Community Silent Cafe",
    waktu: null, lokasi: "Central Library", attending: "82 attending", tipe: "offline",
  },
];

const experts = [
  { nama: "Dr. Sarah Chen", peran: "ASL Linguistics Specialist", inisial: "SC", warna: "#c0956a" },
  { nama: "Markus Rivera", peran: "Accessibility Tech Lead", inisial: "MR", warna: "#1849A6" },
];

export default function ExploreCommunity({ onKembali }) {
  const [activeNav, setActiveNav] = useState("kamus");
  const [activeFilter, setActiveFilter] = useState("All Groups");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen overflow-x-hidden">

        {/* ── HEADER ── */}
        <div className="bg-gray-100 px-4 pt-10 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onKembali} className="text-gray-500">
              <ChevronLeft size={22} />
            </button>
            <span className="font-extrabold text-gray-800 text-base">Explore Communities</span>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#e8eeff" }}
          >
            <User size={18} style={{ color: "#1849A6" }} />
          </div>
        </div>

        {/* ── SEARCH ── */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 text-sm text-gray-500 outline-none bg-transparent"
            />
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 mb-5">
          {filterTabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveFilter(t)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition"
              style={
                activeFilter === t
                  ? { backgroundColor: "#010451", color: "white" }
                  : { backgroundColor: "white", color: "#6b7280" }
              }
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── RECOMMENDED FOR YOU ── */}
        <div className="flex items-center justify-between px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-base">Recommended for You</p>
          <button className="text-xs font-bold" style={{ color: "#1849A6" }}>See All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1 mb-5">
          {recommended.map((r) => (
            <div key={r.id} className="flex-shrink-0 w-48 bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* image area */}
              <div className="relative h-28" style={{ backgroundColor: r.bg }}>
                {r.activeNow && (
                  <span
                    className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-md"
                    style={{ backgroundColor: "#1849A6" }}
                  >
                    ACTIVE NOW
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-800 text-sm mb-0.5">{r.judul}</p>
                <p className="text-xs text-gray-400 mb-2">{r.deskripsi}</p>
                <div className="flex items-center justify-between">
                  {/* avatar stack */}
                  <div className="flex items-center">
                    {r.avatars.map((c, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: c, marginLeft: i === 0 ? 0 : -8 }}
                      />
                    ))}
                    {r.extraAvatar && (
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: "#9ca3af", marginLeft: -8 }}
                      >
                        {r.extraAvatar}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{r.members}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── WHAT'S TRENDING ── */}
        <div className="px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-base">What's Trending</p>
        </div>

        {/* trending big card */}
        <div
          className="mx-4 mb-3 rounded-2xl p-4 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #010451 0%, #1849A6 60%, #FEF3B3 100%)" }}
        >
          <div className="flex items-start justify-between mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <TrendingUp size={16} color="white" />
            </div>
            <span
              className="text-xs font-bold px-2 py-1 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#FEF3B3" }}
            >
              +40% this week
            </span>
          </div>
          <p className="text-white font-extrabold text-lg mb-1">Global Sign Bridge</p>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            The world's largest initiative for universal sign translation patterns.
          </p>
          <button className="w-full py-3 rounded-xl bg-white font-bold text-sm" style={{ color: "#1849A6" }}>
            Join Community
          </button>
        </div>

        {/* small group cards */}
        <div className="flex gap-3 px-4 mb-5">
          {smallGroups.map((g) => (
            <div key={g.id} className="flex-1 bg-white rounded-2xl p-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2"
                style={{ backgroundColor: g.bg }}
              >
                {g.icon}
              </div>
              <p className="font-bold text-gray-800 text-sm">{g.judul}</p>
              <p className="text-xs text-gray-400">{g.sub}</p>
            </div>
          ))}
        </div>

        {/* ── POPULAR EVENTS ── */}
        <div className="px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-base">Popular Events</p>
        </div>
        <div className="mx-4 mb-5 bg-white rounded-2xl overflow-hidden">
          {events.map((ev, i) => (
            <div
              key={ev.id}
              className={`flex items-center gap-4 px-4 py-4 ${i < events.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              {/* date box */}
              <div
                className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <p className="font-extrabold text-gray-800 text-lg leading-none">{ev.tanggal}</p>
                <p className="text-xs font-bold text-gray-400">{ev.bulan}</p>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm mb-1">{ev.judul}</p>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-0.5">
                  {ev.waktu && <><Clock size={11} /><span>{ev.waktu} •</span></>}
                  {ev.tipe === "online"
                    ? <span>Online</span>
                    : <><MapPin size={11} /><span>{ev.lokasi}</span></>
                  }
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#1849A6" }}>
                  <Users size={11} />
                  <span>{ev.attending}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── EXPERTS TO FOLLOW ── */}
        <div className="px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-base">Experts to Follow</p>
        </div>
        <div className="mx-4 mb-24 bg-white rounded-2xl overflow-hidden">
          {experts.map((e, i) => (
            <div
              key={e.nama}
              className={`flex items-center gap-3 px-4 py-4 ${i < experts.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: e.warna }}
              >
                {e.inisial}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">{e.nama}</p>
                <p className="text-xs text-gray-400">{e.peran}</p>
              </div>
              <button
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "#e8eeff", color: "#1849A6" }}
              >
                Follow
              </button>
            </div>
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