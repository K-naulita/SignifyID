import { useState } from "react";
import {
  ChevronLeft, Home, Languages, BookOpen, Siren, User,
  Users, Check, UserPlus, Heart, MessageCircle, Share2,
  MoreVertical, Trophy, Video, Plus, Star
} from "lucide-react";

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

const leaderboard = [
  { rank: 1, nama: "Aria Thompson", level: "Lvl 42 • Grandmaster", xp: "2,450 XP", inisial: "AT", warna: "#1849A6", top: true },
  { rank: 2, nama: "Leo Garcia", level: "Lvl 38 • Expert", xp: "1,920 XP", inisial: "LG", warna: "#4db89e", top: false },
  { rank: 3, nama: "Sari Dewi", level: "Lvl 35 • Advanced", xp: "1,740 XP", inisial: "SD", warna: "#c0956a", top: false },
];

const highlights = [
  { id: 1, judul: "Song: Imagine (ASL...)", oleh: "@signer_sky", views: "1.2k", bg: "#c0956a" },
  { id: 2, judul: "Quick Tip: Slang Sign", oleh: "@deaf_culture", views: "856", bg: "#4db89e" },
];

const discussions = [
  {
    id: 1, nama: "Aria Thompson", waktu: "1 hour ago", inisial: "AT", warna: "#1849A6",
    isi: "Just hit Grandmaster rank! The daily challenges really pushed me to practice consistently. Anyone else doing the gratitude sign challenge today?",
    likes: 34, comments: 12,
  },
  {
    id: 2, nama: "Sari Dewi", waktu: "3 hours ago", inisial: "SD", warna: "#c0956a",
    isi: "Looking for a practice partner for advanced BISINDO! I'm available on weekday evenings. Drop a comment if you're interested 🤙",
    likes: 21, comments: 8,
  },
];

export default function SignersCommunity({ onKembali }) {
  const [activeNav, setActiveNav] = useState("kamus");
  const [leaderTab, setLeaderTab] = useState("Global");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen overflow-x-hidden">

        {/* ── HEADER ── */}
        <div className="bg-gray-100 px-4 pt-10 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onKembali} className="text-gray-500">
              <ChevronLeft size={22} />
            </button>
            <span className="font-extrabold text-gray-800 text-base">Signers Community</span>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#e8eeff" }}
          >
            <User size={18} style={{ color: "#1849A6" }} />
          </div>
        </div>

        {/* ── DAILY CHALLENGE BANNER ── */}
        <div
          className="mx-4 mb-4 rounded-3xl overflow-hidden relative"
          style={{ background: "linear-gradient(160deg, #FEF3B3 0%, #1849A6 40%, #010451 100%)", minHeight: 180 }}
        >
          <div className="px-5 pt-5 pb-4">
            <span
              className="text-xs font-bold px-2 py-1 rounded-md mb-3 inline-block"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#FEF3B3" }}
            >
              DAILY CHALLENGE
            </span>
            <h2 className="text-white font-extrabold text-2xl leading-tight mb-2">
              Mastering{"\n"}"Gratitude"
            </h2>
            <p className="text-white/75 text-sm leading-relaxed mb-4">
              Practice the sign for 'Thank You' in 3 different contexts to earn 250 XP.
            </p>
            <div className="flex items-center justify-between">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
                style={{ backgroundColor: "white", color: "#010451" }}
              >
                <Video size={15} />
                Record Now
              </button>
              {/* avatar stack */}
              <div className="flex items-center">
                {["#c0956a", "#4db89e"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: c, marginLeft: i === 0 ? 0 : -10 }}
                  />
                ))}
                <div
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: "#1849A6", marginLeft: -10 }}
                >
                  +42
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RANK & XP CARDS ── */}
        <div className="mx-4 mb-4 flex gap-3">
          <div className="flex-1 bg-white rounded-2xl px-4 py-3 border-l-4" style={{ borderColor: "#1849A6" }}>
            <p className="text-xs text-gray-400 font-semibold mb-1">GLOBAL RANK</p>
            <p className="font-extrabold text-lg" style={{ color: "#1849A6" }}>
              #1,248 <span className="text-green-500 text-xs font-bold">+12%</span>
            </p>
          </div>
          <div className="flex-1 bg-white rounded-2xl px-4 py-3 border-l-4" style={{ borderColor: "#f5a623" }}>
            <p className="text-xs text-gray-400 font-semibold mb-1">TOTAL XP</p>
            <p className="font-extrabold text-lg" style={{ color: "#f5a623" }}>8,420</p>
          </div>
        </div>

        {/* ── PRACTICE PARTNERS ── */}
        <div className="flex items-center justify-between px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-sm">Practice Partners</p>
          <button className="text-xs font-bold" style={{ color: "#1849A6" }}>See All</button>
        </div>
        <div className="mx-4 mb-4 bg-white rounded-2xl p-5 flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: "#e8eeff" }}
          >
            <Users size={28} style={{ color: "#1849A6" }} />
          </div>
          <p className="font-bold text-gray-800 mb-1">Ready to Sign?</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Match with a peer at your level for a 5-minute video call.
          </p>
          <button
            className="w-full py-3 rounded-xl font-bold text-sm"
            style={{ backgroundColor: "#FEF3B3", color: "#b45309" }}
          >
            Find Partner Now
          </button>
        </div>

        {/* ── WEEKLY LEADERBOARD ── */}
        <div className="flex items-center justify-between px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-sm">Weekly Leaderboard</p>
          <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "#e5e7eb" }}>
            {["Local", "Global"].map((t) => (
              <button
                key={t}
                onClick={() => setLeaderTab(t)}
                className="px-3 py-1 text-xs font-bold transition"
                style={
                  leaderTab === t
                    ? { backgroundColor: "#010451", color: "white" }
                    : { backgroundColor: "white", color: "#6b7280" }
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-4 mb-4 bg-white rounded-2xl overflow-hidden">
          {leaderboard.map((item, i) => (
            <div
              key={item.rank}
              className={`flex items-center gap-3 px-4 py-3 ${i < leaderboard.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <span
                className="w-6 text-center font-extrabold text-sm"
                style={{ color: item.rank === 1 ? "#1849A6" : "#9ca3af" }}
              >
                {item.rank}
              </span>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: item.warna }}
              >
                {item.inisial}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">{item.nama}</p>
                <p className="text-xs text-gray-400">{item.level}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm" style={{ color: item.top ? "#1849A6" : "#374151" }}>
                  {item.xp}
                </p>
                {item.top && <Trophy size={13} style={{ color: "#1849A6" }} className="ml-auto" />}
              </div>
            </div>
          ))}
          <div className="px-4 py-3 text-center">
            <button className="text-sm font-bold" style={{ color: "#1849A6" }}>View Full Leaderboard</button>
          </div>
        </div>

        {/* ── COMMUNITY HIGHLIGHTS ── */}
        <div className="flex items-center justify-between px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-sm">Community Highlights</p>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{ borderColor: "#e5e7eb" }}
          >
            <Plus size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1 mb-4">
          {highlights.map((h) => (
            <div key={h.id} className="flex-shrink-0 w-44">
              <div
                className="w-full h-28 rounded-2xl flex items-end p-2 mb-2 relative overflow-hidden"
                style={{ backgroundColor: h.bg }}
              >
                <div className="flex items-center gap-1 bg-black/40 rounded-lg px-2 py-0.5">
                  <Star size={10} color="white" />
                  <span className="text-white text-xs">{h.views}</span>
                </div>
              </div>
              <p className="font-bold text-gray-800 text-sm">{h.judul}</p>
              <p className="text-xs text-gray-400">{h.oleh}</p>
            </div>
          ))}
        </div>

        {/* ── LATEST DISCUSSIONS ── */}
        <div className="px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-sm">Latest Discussions</p>
        </div>
        <div className="px-4 flex flex-col gap-3 pb-24">
          {discussions.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: post.warna }}
                  >
                    {post.inisial}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{post.nama}</p>
                    <p className="text-xs text-gray-400">{post.waktu}</p>
                  </div>
                </div>
                <button className="text-gray-400"><MoreVertical size={18} /></button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{post.isi}</p>
              <div className="border-t border-gray-100 pt-3 flex gap-4">
                <button className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Heart size={14} /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <MessageCircle size={14} /> {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 text-xs ml-auto">
                  <Share2 size={14} />
                </button>
              </div>
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