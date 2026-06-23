import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

/* ================= SERVICES ================= */
const services = [
  { number: "110", label: "Polisi", color: "text-blue-600", icon: "🚓" },
  { number: "119", label: "Medis", color: "text-red-500", icon: "🏥" },
  { number: "113", label: "PMK", color: "text-amber-500", icon: "🔥" },
];

/* ================= ICON ================= */
const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
  </svg>
);

/* ================= MAIN ================= */
export default function Emergency() {

  const [gps, setGps] = useState(true);
  const [location, setLocation] = useState(null);

  const [contactList, setContactList] = useState([
    { id: 1, name: "Ibu (Rumah)", phone: "6281334567890", initial: "I" },
    { id: 2, name: "Ayah", phone: "6281398765432", initial: "A" },
    { id: 3, name: "Adik Budi", phone: "628555112233", initial: "A" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });

  const [pending, setPending] = useState(null);
  const [count, setCount] = useState(0);

  /* ================= GPS ================= */
  useEffect(() => {
  if (!gps) {
    setLocation(null);
    return;
  }

  if (!navigator.geolocation) return;

  const watch = navigator.geolocation.watchPosition(
    (pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    },
    (err) => {
      console.log("GPS error:", err);
    }
  );

  return () => navigator.geolocation.clearWatch(watch);
}, [gps]);

  /* ================= MESSAGE ================= */
  function buildMessage(loc) {
    return `🚨 SOS DARURAT 🚨
Saya membutuhkan bantuan!

Lokasi:
https://maps.google.com/?q=${loc.lat},${loc.lng}`;
  }

  function sendMessage(phone) {
    if (!location) return alert("Lokasi belum siap");

    const msg = buildMessage(location);

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    );
  }

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!pending) return;

    if (count === 0) {
      if (pending === "ALL") {
        contactList.forEach((c) => sendMessage(c.phone));
      } else {
        sendMessage(pending);
      }

      setPending(null);
      return;
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pending, count]);

  function triggerSend(phone) {
    setPending(phone);
    setCount(3);
  }

  function startEdit(c) {
    setEditingId(c.id);
    setEditForm({ name: c.name, phone: c.phone });
  }

  function saveEdit(id) {
    setContactList((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...editForm,
              initial: editForm.name?.charAt(0) || c.initial,
            }
          : c
      )
    );
    setEditingId(null);
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#F3F5F8] flex justify-center">

      {/* 📱 MOBILE CONTAINER */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#F3F5F8] relative pb-24">

        {/* NAVBAR */}
        <Navbar />

        {/* GPS */}
        <div className="mx-5 mt-4 flex items-center gap-3 bg-blue-50 p-4 rounded-2xl">
          📍
          <div className="flex-1">
            <p className="font-semibold text-sm">GPS Aktif</p>
            <p className="text-xs text-slate-500">
              Lokasi otomatis dilampirkan
            </p>
          </div>

          <button
            onClick={() => setGps(!gps)}
            className={`w-12 h-6 rounded-full flex items-center p-1 transition ${
              gps ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition ${
                gps ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* SOS */}
        <div className="flex flex-col items-center mt-10">
          <button
            onClick={() => triggerSend("ALL")}
            className="active:scale-95 transition"
          >
            <img
              src="/animasi12.png"
              className="w-40 h-40 rounded-full shadow-xl"
            />
          </button>

          <p className="text-sm text-slate-500 mt-4 text-center px-10 font-bold">
            Tekan SOS untuk mengirim sinyal bahaya ke semua kontak darurat
          </p>
        </div>

        {/* SERVICES */}
        <div className="px-5 mt-6">
          <h2 className="font-semibold mb-3">Layanan Darurat</h2>

          <div className="grid grid-cols-3 gap-3">
            {services.map((s) => (
              <a
                key={s.number}
                href={`tel:${s.number}`}
                className="bg-white rounded-2xl p-4 flex flex-col items-center shadow"
              >
                <div className={`text-xl ${s.color}`}>{s.icon}</div>
                <p className="font-bold mt-2">{s.number}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div className="px-5 mt-6">
          <h2 className="font-semibold mb-3">Kontak Keluarga</h2>

          <div className="flex flex-col gap-3">

            {contactList.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow"
              >
                <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                  {c.initial}
                </div>

                <div className="flex-1">

                  {editingId === c.id ? (
                    <>
                      <input
                        className="w-full text-sm font-semibold border-b outline-none"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />

                      <input
                        className="w-full text-xs text-slate-500 border-b outline-none mt-1"
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm({ ...editForm, phone: e.target.value })
                        }
                      />
                    </>
                  ) : (
                    <div onClick={() => startEdit(c)}>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.phone}</p>
                    </div>
                  )}

                </div>

                <button
                  onClick={() => triggerSend(c.phone)}
                  className="text-blue-600"
                >
                  📩
                </button>

                {editingId === c.id && (
                  <button
                    onClick={() => saveEdit(c.id)}
                    className="text-green-600 text-sm"
                  >
                    ✔
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MAP */}
        <div className="px-5 mt-6">
          <div className="rounded-2xl overflow-hidden shadow">
            {location ? (
              <>
                <iframe
                  width="100%"
                  height="180"
                  src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                />
                <div className="bg-white p-3 text-center text-xs text-slate-500">
                  📍 {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                </div>
              </>
            ) : (
              <div className="h-40 flex items-center justify-center bg-slate-200">
                Loading map...
              </div>
            )}
          </div>
        </div>

        {/* TIMER MODAL */}
        {pending && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white w-[85%] p-5 rounded-2xl text-center">

              <div className="text-5xl font-bold text-red-600">
                {count}
              </div>

              <p className="mt-3 font-semibold">
                Mengirim SOS...
              </p>

              <p className="text-xs text-slate-500 mb-2">
                {pending === "ALL"
                  ? "Mengirim ke semua kontak"
                  : `Mengirim ke ${contactList.find(c => c.phone === pending)?.name || pending}`}
              </p>

              <button
                onClick={() => setPending(null)}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded-xl"
              >
                BATAL
              </button>

            </div>
          </div>
        )}

        <BottomNav />

      </div>
    </div>
  );
}