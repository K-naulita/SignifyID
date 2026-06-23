import { useEffect, useState } from "react";
import {
  MapPin,
  Bell,
  MessageSquare,
  Camera,
  Mic
} from "lucide-react";
import PermissionCard from "../components/PermissionCard";

const permissionsData = [
  {
    id: "gps",
    title: "GPS (Lokasi)",
    desc: "Digunakan untuk mengirimkan lokasi Anda saat darurat.",
    icon: <MapPin size={20} />
  },
  {
    id: "sms",
    title: "SMS",
    desc: "Mengirim pesan darurat ke keluarga.",
    icon: <MessageSquare size={20} />
  },
  {
    id: "notif",
    title: "Notifikasi",
    desc: "Memberikan info penting.",
    icon: <Bell size={20} />
  },
  {
    id: "camera",
    title: "Kamera",
    desc: "Akses kamera untuk fitur tertentu.",
    icon: <Camera size={20} />
  },
  {
    id: "mic",
    title: "Mikrofon",
    desc: "Akses suara untuk komunikasi.",
    icon: <Mic size={20} />
  }
];

export default function Permission() {
  const [mounted, setMounted] = useState(false);

  const [toggle, setToggle] = useState({
    gps: true,
    sms: true,
    notif: false,
    camera: false,
    mic: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (id) => {
    setToggle((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-[#EEF2F6] flex justify-center">
      <div className="w-[390px] min-h-screen bg-white flex flex-col relative overflow-hidden">

        {/* 🔵 BACKGROUND KOTAK-KOTAK (INI YANG KAMU MAU BALIK) */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-52 h-52 bg-[#EAF3FF] rounded-3xl blur-0 opacity-100" />
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#DCEBFF] rounded-2xl" />
        <div className="absolute top-36 right-8 w-16 h-16 bg-[#DCEBFF] rounded-xl" />

        {/* HEADER */}
        <div className="px-4 pt-4 text-2xl relative z-10">←</div>

        {/* IMAGE */}
        <div className="flex justify-center mt-4 relative z-10">
          <img
            src="/animasi1.png"
            className="w-44 h-44 object-contain"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-center text-2xl font-bold mt-4 relative z-10">
          Izin Akses Aplikasi
        </h1>

        <p className="text-center text-sm text-slate-500 mt-2 px-6 relative z-10">
          HearMe memerlukan beberapa izin agar aplikasi berjalan optimal
        </p>

        {/* CARDS */}
        <div className="mt-6 px-5 space-y-4 relative z-10">

          {permissionsData.map((item, index) => (
            <div
              key={item.id}
              className={`transition-all duration-500 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <PermissionCard
                title={item.title}
                desc={item.desc}
                icon={item.icon}
                enabled={toggle[item.id]}
                onToggle={() => handleToggle(item.id)}
              />
            </div>
          ))}

        </div>

        {/* FOOTER */}
        <div className="mt-auto px-5 pb-6 pt-4 relative z-10">
          <button className="w-full h-12 rounded-full bg-[#0A3D91] text-white font-semibold">
            Setujui Semua
          </button>

          <button className="w-full mt-3 text-sm text-slate-500">
            Atur Nanti
          </button>
        </div>

      </div>
    </div>
  );
}