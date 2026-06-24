import { useState } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  MoreVertical,
  Heart,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

const eventData = {
  1: {
    id: 1,
    judul: "Weekly Sign & Coffee",
    kategori: "Community Meetup",
    tanggal: "Oct 24, 2026",
    waktuMulai: "09:00",
    waktuSelesai: "11:00",
    lokasi: "Jakarta Central Park",
    alamat: "Jalan S. Parman Kav. 28, Jakarta",
    bg: "#2d8a6e",
    peserta: 125,
    deskripsi:
      "Weekly Sign & Coffee is a regular gathering designed to bridge the gap between learners and the Deaf community in Jakarta. Whether you're a beginner or fluent, join us for a morning of meaningful connection, skill-sharing, and caffeine!",
    pembelajaran: [
      "Basic conversational signs",
      "Communication confidence",
      "Cultural etiquette",
    ],
    jadwal: [
      { waktu: "09:00", judul: "Registration & Networking", sub: "Arrival and warm-up signs", aktif: true },
      { waktu: "09:30", judul: "Ice Breaking Session", sub: "Fun group activities", aktif: false },
      { waktu: "10:00", judul: "Group Sign Practice", sub: "Thematic vocabulary session", aktif: false },
    ],
    hosts: [
      { nama: "Sarah Wijaya", peran: "Educator", inisial: "SW", warna: "#c0956a" },
      { nama: "Budi Hartono", peran: "Language Coach", inisial: "BH", warna: "#5a8a6e" },
    ],
    diskusi: [
      {
        id: 1,
        nama: "Aria Putri",
        inisial: "AP",
        warna: "#c0956a",
        waktu: "2 hours ago",
        isi: "Can't wait for Sunday! Is it okay to bring my own notebook for practicing vocabulary? 📖✨",
        likes: 24,
        komentar: 8,
        baru: 12,
      },
    ],
  },
  2: {
    id: 2,
    judul: "Career in Sign Language",
    kategori: "Online Webinar",
    tanggal: "Nov 02, 2026",
    waktuMulai: "10:00",
    waktuSelesai: "12:00",
    lokasi: "Online",
    alamat: "Zoom Meeting — link dikirim via email",
    bg: "#1849A6",
    peserta: 87,
    deskripsi:
      "Discover career paths in sign language interpretation, education, and advocacy. Join industry professionals as they share their journey and open doors for you.",
    pembelajaran: [
      "Career paths in sign language",
      "Interview tips for interpreters",
      "Building your portfolio",
    ],
    jadwal: [
      { waktu: "10:00", judul: "Opening & Intro", sub: "Meet the speakers", aktif: true },
      { waktu: "10:30", judul: "Panel Discussion", sub: "Career experiences shared", aktif: false },
      { waktu: "11:30", judul: "Q&A Session", sub: "Ask the professionals", aktif: false },
    ],
    hosts: [
      { nama: "Dewi Santoso", peran: "Interpreter", inisial: "DS", warna: "#7baee0" },
      { nama: "Reza Pratama", peran: "Career Coach", inisial: "RP", warna: "#a78bfa" },
    ],
    diskusi: [
      {
        id: 1,
        nama: "Bima Kurnia",
        inisial: "BK",
        warna: "#7baee0",
        waktu: "1 hour ago",
        isi: "Super excited for this! Been waiting for a webinar like this for ages 🙌",
        likes: 15,
        komentar: 4,
        baru: 5,
      },
    ],
  },
};

export default function EventDetails({ eventId = 1, onKembali }) {
  const ev = eventData[eventId] ?? eventData[1];
  const [joined, setJoined] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen overflow-x-hidden relative">

        {/* ── HERO ── */}
        <div className="relative h-52 flex-shrink-0" style={{ backgroundColor: ev.bg }}>
          {/* back button */}
          <button
            onClick={onKembali}
            className="absolute top-10 left-4 z-10 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          {/* profile button */}
          <button className="absolute top-10 right-4 z-10 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <User size={18} className="text-white" />
          </button>

          {/* badge + judul */}
          <div className="absolute bottom-5 left-4 right-4">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block"
              style={{ backgroundColor: "#4db89e", color: "#fff" }}
            >
              {ev.kategori}
            </span>
            <h1 className="text-white font-extrabold text-2xl leading-tight">{ev.judul}</h1>
          </div>
        </div>

        {/* ── INFO CARD ── */}
        <div className="mx-4 -mt-4 bg-white rounded-2xl shadow-sm px-4 py-4 mb-4 z-10 relative">
          <div className="flex gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} style={{ color: "#1849A6" }} />
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Date</p>
                <p className="text-gray-800 font-bold text-sm">{ev.tanggal}</p>
              </div>
            </div>
            <div className="w-px bg-gray-100" />
            <div className="flex items-center gap-2">
              <Clock size={16} style={{ color: "#1849A6" }} />
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Time</p>
                <p className="text-gray-800 font-bold text-sm">{ev.waktuMulai} – {ev.waktuSelesai}</p>
              </div>
            </div>
          </div>
          <div className="h-px bg-gray-100 mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={16} style={{ color: "#1849A6" }} />
              <p className="text-gray-800 font-bold text-sm">{ev.lokasi}</p>
            </div>
            {/* avatar stack */}
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: ["#c0956a", "#7baee0", "#4db89e"][i] }}
                >
                  {["A", "B", "C"][i]}
                </div>
              ))}
              <span
                className="w-7 h-7 rounded-full border-2 border-white -ml-2 flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: "#010451", color: "#fff" }}
              >
                +{ev.peserta}
              </span>
            </div>
          </div>
        </div>

        {/* ── SCROLL CONTENT ── */}
        <div className="px-4 pb-28 flex flex-col gap-5">

          {/* About */}
          <div>
            <p className="font-extrabold text-gray-800 text-base mb-2">About This Event</p>
            <p className="text-gray-500 text-sm leading-relaxed">{ev.deskripsi}</p>
          </div>

          {/* What You'll Learn */}
          <div>
            <p className="font-extrabold text-gray-800 text-base mb-3">What You'll Learn</p>
            <div className="flex flex-col gap-2">
              {ev.pembelajaran.map((item, i) => (
                <div key={i} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
                  <CheckCircle2 size={18} style={{ color: "#2d8a6e" }} />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Schedule */}
          <div>
            <p className="font-extrabold text-gray-800 text-base mb-3">Event Schedule</p>
            <div className="flex flex-col gap-0">
              {ev.jadwal.map((item, i) => (
                <div key={i} className="flex gap-3 relative">
                  {/* timeline line */}
                  {i < ev.jadwal.length - 1 && (
                    <div className="absolute left-[9px] top-5 bottom-0 w-px bg-gray-200" />
                  )}
                  <div
                    className="w-[18px] h-[18px] rounded-full flex-shrink-0 mt-0.5 border-2"
                    style={{
                      backgroundColor: item.aktif ? "#1849A6" : "#e5e7eb",
                      borderColor: item.aktif ? "#1849A6" : "#d1d5db",
                    }}
                  />
                  <div className="pb-4 flex-1 flex items-start justify-between">
                    <div>
                      <p className="text-gray-800 font-semibold text-sm">{item.judul}</p>
                      <p className="text-gray-400 text-xs">{item.sub}</p>
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#1849A6" }}>{item.waktu}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meet the Hosts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-extrabold text-gray-800 text-base">Meet the Hosts</p>
              <button className="text-xs font-bold" style={{ color: "#1849A6" }}>View All</button>
            </div>
            <div className="flex gap-3">
              {ev.hosts.map((host, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 flex flex-col items-center shadow-sm flex-1">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base mb-2"
                    style={{ backgroundColor: host.warna }}
                  >
                    {host.inisial}
                  </div>
                  <p className="text-gray-800 font-semibold text-sm text-center">{host.nama}</p>
                  <p className="text-gray-400 text-xs text-center">{host.peran}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="font-extrabold text-gray-800 text-base mb-3">Location</p>
            {/* map placeholder */}
            <div
              className="w-full h-32 rounded-2xl mb-3 flex items-center justify-center"
              style={{ backgroundColor: "#e8f0fb" }}
            >
              <MapPin size={28} style={{ color: "#1849A6" }} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 font-bold text-sm">{ev.lokasi}</p>
                <p className="text-gray-400 text-xs">{ev.alamat}</p>
              </div>
              <button
                className="px-3 py-2 rounded-xl text-xs font-semibold border"
                style={{ color: "#1849A6", borderColor: "#1849A6" }}
              >
                View Location
              </button>
            </div>
          </div>

          {/* Discussion */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-extrabold text-gray-800 text-base">Discussion</p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#f5a623", color: "#fff" }}
              >
                {ev.diskusi[0].baru} New
              </span>
            </div>
            {ev.diskusi.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: post.warna }}
                    >
                      {post.inisial}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{post.nama}</p>
                      <p className="text-xs text-gray-400">{post.waktu}</p>
                    </div>
                  </div>
                  <button className="text-gray-400"><MoreVertical size={16} /></button>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{post.isi}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-400 text-xs">
                    <Heart size={14} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 text-xs">
                    <MessageCircle size={14} /> {post.komentar}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 z-50">
          <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center flex-shrink-0">
            <Heart size={18} className="text-gray-400" />
          </button>
          <button
            onClick={() => setJoined(!joined)}
            className="flex-1 py-3 rounded-2xl text-white font-bold text-base transition"
            style={{ backgroundColor: joined ? "#2d8a6e" : "#010451" }}
          >
            {joined ? "✓ Joined!" : "Join Event →"}
          </button>
        </div>

      </div>
    </div>
  );
}