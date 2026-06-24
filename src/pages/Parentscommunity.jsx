import { useState } from "react";
import {
  ChevronLeft, Home, Languages, BookOpen, Siren, User,
  Users, Check, UserPlus, Heart, MessageCircle, Share2,
  MapPin, Monitor, Download, MoreVertical,
} from "lucide-react";

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

const tabs = ["Discussions", "Resources", "Events", "Members"];

const resources = [
  { id: 1, judul: "Family BISINDO Guide", tipe: "PDF", ukuran: "4.2 MB", warnaBg: "#e8eeff", warnaIcon: "#1849A6", icon: BookOpen },
  { id: 2, judul: "Communication Tips", tipe: "DOCX", ukuran: "1.1 MB", warnaBg: "#fef3c7", warnaIcon: "#d97706", icon: BookOpen },
];

const events = [
  { id: 1, bulan: "OCT", tanggal: "25", judul: "Parent Sign Workshop", lokasi: "Jakarta Central Park", tipe: "offline", bg: "#2d8a6e" },
  { id: 2, bulan: "NOV", tanggal: "30", judul: "Sign Language Webinar", lokasi: "Online", tipe: "online", bg: "#1849A6" },
];

const discussions = [
  {
    id: 1, nama: "Sarah Wijaya", waktu: "2 hours ago", inisial: "SW", warna: "#c0956a",
    isi: "My daughter just learned her first sign for 'Milk' today! Feeling so proud and grateful for this community's resources. Has anyone else started with food signs?",
    likes: 12, comments: 4,
  },
  {
    id: 2, nama: "Andi Pratama", waktu: "5 hours ago", inisial: "AP", warna: "#7baee0",
    isi: "Question: Are there any specific BISINDO apps you recommend for toddlers? My son responds well to visual screens but I want something educational.",
    likes: 8, comments: 15,
  },
];

const members = [
  { nama: "Budi H.", inisial: "BH", warna: "#c0956a", online: true },
  { nama: "Dewi S.", inisial: "DS", warna: "#7baee0", online: true },
  { nama: "Eko W.", inisial: "EW", warna: "#4db89e", online: true },
  { nama: "Maria G.", inisial: "MG", warna: "#a78bfa", online: true },
  { nama: "Anton L.", inisial: "AL", warna: "#e07b7b", online: false },
];

export default function ParentsCommunity({ onKembali }) {
  const [activeNav, setActiveNav] = useState("kamus");
  const [activeTab, setActiveTab] = useState("Discussions");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen overflow-x-hidden">

        {/* ── HEADER ── */}
        <div className="bg-gray-100 px-4 pt-10 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onKembali} className="text-gray-500">
              <ChevronLeft size={22} />
            </button>
            <span className="font-extrabold text-gray-800 text-base">Parents Community</span>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#e8eeff" }}
          >
            <User size={18} style={{ color: "#1849A6" }} />
          </div>
        </div>

        {/* ── BANNER CARD ── */}
        <div className="mx-4 mb-4 rounded-3xl overflow-hidden shadow-sm">
          {/* hero image area */}
          <div className="relative h-36 flex items-end px-4 pb-4">
            <img
                src="/parent-banner.png"
                alt="parents banner"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative flex items-center gap-3">
                <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                <Users size={20} color="#fff" />
                </div>
                <div>
                <p className="text-white font-extrabold text-base">Parents Community</p>
                <p className="text-white/75 text-xs">Learning together for our families</p>
                </div>
            </div>
            </div>
          {/* info */}
          <div className="bg-white px-4 py-4">
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              A supportive space for parents learning sign language with their families to create an inclusive home environment.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Users size={13} className="text-gray-400" />
              <span className="text-xs text-gray-400">1.2K Members</span>
              <span className="text-gray-200 text-xs">•</span>
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              <span className="text-xs text-green-600 font-semibold">85 Online</span>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold"
                style={{ backgroundColor: "#010451" }}
              >
                <Check size={15} /> Joined
              </button>
              <button
                className="w-11 h-11 rounded-xl border flex items-center justify-center"
                style={{ borderColor: "#010451" }}
              >
                <UserPlus size={18} style={{ color: "#010451" }} />
              </button>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="mx-4 mb-4 bg-white rounded-2xl overflow-hidden">
          <div className="flex border-b border-gray-100">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 py-3 text-xs font-semibold transition border-b-2 ${
                  activeTab === t
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-gray-400"
                }`}
                style={activeTab === t ? { color: "#1849A6", borderColor: "#1849A6" } : {}}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── FEATURED DISCUSSION ── */}
        <div
          className="mx-4 mb-4 rounded-2xl p-4"
          style={{ backgroundColor: "#FEF3B3" }}
        >
          <p className="text-xs font-extrabold mb-1.5" style={{ color: "#b45309" }}>
            🔥 FEATURED DISCUSSION
          </p>
          <p className="font-extrabold text-gray-900 text-base leading-snug mb-3">
            How do you teach sign language to toddlers?
          </p>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-bold text-sm text-gray-800">24</p>
              <p className="text-xs text-gray-500">Replies</p>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">120</p>
              <p className="text-xs text-gray-500">Views</p>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">1h</p>
              <p className="text-xs text-gray-500">ago</p>
            </div>
            <button
              className="ml-auto text-white text-xs font-bold px-4 py-2.5 rounded-xl leading-tight text-center"
              style={{ backgroundColor: "#010451" }}
            >
              Join{"\n"}Discussion
            </button>
          </div>
        </div>

        {/* ── LEARNING RESOURCES ── */}
        <div className="flex items-center justify-between px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-sm">📚 Learning Resources</p>
          <button className="text-xs font-bold" style={{ color: "#1849A6" }}>View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1 mb-4">
          {resources.map((r) => (
            <div key={r.id} className="flex-shrink-0 w-40 bg-white rounded-2xl p-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                style={{ backgroundColor: r.warnaBg }}
              >
                <r.icon size={18} style={{ color: r.warnaIcon }} />
              </div>
              <p className="text-sm font-bold text-gray-800 mb-0.5">{r.judul}</p>
              <p className="text-xs text-gray-400 mb-2">{r.tipe} • {r.ukuran}</p>
              <button
                className="flex items-center gap-1 text-xs font-bold"
                style={{ color: "#1849A6" }}
              >
                DOWNLOAD <Download size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* ── COMMUNITY EVENTS ── */}
        <div className="px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-sm">📅 Community Events</p>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1 mb-4">
          {events.map((ev) => (
            <div key={ev.id} className="flex-shrink-0 w-52 bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-28 flex items-start p-3" style={{ backgroundColor: ev.bg }}>
                <div className="bg-white rounded-xl px-2 py-1 text-center min-w-[40px]">
                  <p className="text-xs font-bold" style={{ color: "#1849A6" }}>{ev.bulan}</p>
                  <p className="font-extrabold text-lg leading-none" style={{ color: "#010451" }}>{ev.tanggal}</p>
                </div>
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-800 text-sm mb-1">{ev.judul}</p>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  {ev.tipe === "online" ? <Monitor size={11} /> : <MapPin size={11} />}
                  <span>{ev.lokasi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── LATEST DISCUSSIONS ── */}
        <div className="px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-sm">Latest Discussions</p>
        </div>
        <div className="px-4 flex flex-col gap-3 mb-4">
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

        {/* ── ACTIVE MEMBERS ── */}
        <div className="px-4 mb-3">
          <p className="font-extrabold text-gray-800 text-sm">👥 Active Members</p>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-24">
          {members.map((m) => (
            <div key={m.nama} className="flex-shrink-0 flex flex-col items-center gap-1">
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: m.warna }}
                >
                  {m.inisial}
                </div>
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-100"
                  style={{ backgroundColor: m.online ? "#22c55e" : "#d1d5db" }}
                />
              </div>
              <p className="text-xs text-gray-500">{m.nama}</p>
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