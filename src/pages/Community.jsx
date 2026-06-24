  import { useState } from "react";
  import { Home, Languages, BookOpen, Siren, User, Menu, MapPin, Monitor, MoreVertical, Plus } from "lucide-react";
  import ParentsCommunity from "./ParentsCommunity";
  import SignersCommunity from "./SignersCommunity";
  import ExploreCommunity from "./ExploreCommunity";
  import EventDetails from "./EventDetails";

  const navItems = [
    { label: "Beranda", icon: Home, key: "beranda" },
    { label: "Terjemah", icon: Languages, key: "terjemah" },
    { label: "Kamus", icon: BookOpen, key: "kamus" },
    { label: "Darurat", icon: Siren, key: "darurat" },
    { label: "Profil", icon: User, key: "profil" },
  ];

  const kategoriKomunitas = [
    { id: 1, label: "Parents", icon: "👨‍👩‍👧", bg: "#4db89e" },
    { id: 2, label: "Students", icon: "🎓", bg: "#f5a623" },
    { id: 3, label: "Workplace", icon: "💼", bg: "#e07b7b" },
    { id: 4, label: "Signers", icon: "👥", bg: "#7baee0" },
    { id: 5, label: "Explore", icon: "🧠", bg: "#a78bfa" },
  ];

  const events = [
    {
      id: 1,
      bulan: "OCT",
      tanggal: "24",
      judul: "Weekly Sign & Coffee",
      lokasi: "Jakarta Central Park",
      tipe: "offline",
      bg: "#2d8a6e",
    },
    {
      id: 2,
      bulan: "NOV",
      tanggal: "02",
      judul: "Career in Sign Language",
      lokasi: "Online",
      tipe: "online",
      bg: "#1849A6",
    },
  ];

  const posts = [
    {
      id: 1,
      nama: "Aria Putri",
      waktu: "2 hours ago",
      isi: "Just finished my level 3 sign language course! It was challenging but so rewarding. The community here helped",
      inisial: "AP",
      warna: "#c0956a",
    },
  ];

  export default function Community() {
    const [activeNav, setActiveNav] = useState("kamus");
    const [halaman, setHalaman] = useState("community");
    const [selectedEventId, setSelectedEventId] = useState(null);

    if (halaman === "parents") {
      return <ParentsCommunity onKembali={() => setHalaman("community")} />;
    }

    if (halaman === "signers") {
      return <SignersCommunity onKembali={() => setHalaman("community")} />;
    }

    if (halaman === "explore") {
      return <ExploreCommunity onKembali={() => setHalaman("community")} />;
    }

    if (halaman === "eventdetails") {
      return <EventDetails
        eventId={selectedEventId}
        onKembali={() => setHalaman("community")}
      />;
    }

    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-sm flex flex-col min-h-screen overflow-x-hidden">

          {/* ── HEADER ── */}
          <div className="bg-gray-100 px-4 pt-10 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="text-gray-500">
                <Menu size={22} />
              </button>
              <div className="flex items-center gap-2">
                <img src="/logoku.png" alt="logo" className="h-8 w-auto" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                <span className="text-green-600 text-xs font-semibold">Online</span>
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#e8eeff" }}
              >
                <User size={18} style={{ color: "#1849A6" }} />
              </div>
            </div>
          </div>

          {/* ── BANNER ── */}
          <div
            className="mx-4 rounded-2xl px-5 py-6 mb-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #010451 0%, #1849A6 60%, #FEF3B3 100%)",
            }}
          >
            <h1 className="text-white font-extrabold text-xl mb-1">Signify Community</h1>
            <p className="text-white/80 text-sm leading-relaxed mb-3">
              Connect, share, and learn with friends who understand your journey.
            </p>
          </div>

          {/* ── KATEGORI SCROLL ── */}
          <div className="px-4 mb-5">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {kategoriKomunitas.map((k) => (
              <button
                key={k.id}
                onClick={() => {
                  if (k.label === "Parents") setHalaman("parents");
                  if (k.label === "Signers") setHalaman("signers");
                  if (k.label === "Explore") setHalaman("explore");
                }}
                className="flex flex-col items-center gap-1 flex-shrink-0 bg-transparent border-0 p-0 cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm"
                  style={{ backgroundColor: k.bg }}
                >
                  {k.icon}
                </div>
                <span className="text-xs text-gray-600 font-medium">{k.label}</span>
              </button>
            ))}
            </div>
          </div>

          {/* ── UPCOMING EVENTS ── */}
          <div className="mb-5">
            <div className="flex items-center justify-between px-4 mb-3">
              <p className="font-extrabold text-gray-800 text-base">Upcoming Events</p>
              <button className="text-xs font-bold" style={{ color: "#1849A6" }}>See All</button>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex-shrink-0 w-52 bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* gambar/warna event */}
                  <div
                    className="relative h-28 flex items-start p-3"
                    style={{ backgroundColor: ev.bg }}
                  >
                    {/* tanggal */}
                    <div className="bg-white rounded-xl px-2 py-1 text-center">
                      <p className="text-xs font-bold" style={{ color: "#1849A6" }}>{ev.bulan}</p>
                      <p className="font-extrabold text-lg leading-none" style={{ color: "#010451" }}>{ev.tanggal}</p>
                    </div>
                  </div>

                  {/* info */}
                  <div className="p-3">
                    <p className="font-bold text-gray-800 text-sm mb-1">{ev.judul}</p>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                      {ev.tipe === "online" ? (
                        <Monitor size={11} />
                      ) : (
                        <MapPin size={11} />
                      )}
                      <span>{ev.lokasi}</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedEventId(ev.id);
                        setHalaman("eventdetails");
                      }}
                      className="w-full py-2 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
                      style={{ backgroundColor: "#010451" }}
                    >
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── EXPERIENCE SHARING ── */}
          <div className="px-4 pb-24">
            <p className="font-extrabold text-gray-800 text-base mb-3">Experience Sharing</p>

            <div className="flex flex-col gap-3">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  {/* user info */}
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
                    <button className="text-gray-400">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  {/* isi post */}
                  <p className="text-sm text-gray-600 leading-relaxed">{post.isi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAB post baru ── */}
          <button
            className="fixed bottom-20 right-4 p-3 rounded-full shadow-lg text-white transition hover:opacity-90 z-40"
            style={{ backgroundColor: "#1849A6" }}
          >
            <Plus size={22} />
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