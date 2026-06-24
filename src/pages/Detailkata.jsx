import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, PlayCircle, Home, Languages, BookOpen, Siren, User } from "lucide-react";

const navItems = [
  { label: "Beranda", icon: Home, key: "beranda" },
  { label: "Terjemah", icon: Languages, key: "terjemah" },
  { label: "Kamus", icon: BookOpen, key: "kamus" },
  { label: "Darurat", icon: Siren, key: "darurat" },
  { label: "Profil", icon: User, key: "profil" },
];

// DetailKata.jsx
const kosakata = [
  { id: 1, kata: "Ayah", kategori: "Keluarga", gambar: "/Gambar1.png", kataTerkait: ["Ibu", "Kakek", "Paman"] },
  { id: 2, kata: "Ibu", kategori: "Keluarga", gambar: "/Gambar2.png", kataTerkait: ["Ayah", "Adik", "Nenek"] },
  { id: 3, kata: "Nenek", kategori: "Keluarga", gambar: "/Gambar3.png", kataTerkait: ["Kakek", "Ibu", "Ayah"] },
  { id: 4, kata: "Kakek", kategori: "Keluarga", gambar: "/Gambar4.png", kataTerkait: ["Nenek", "Paman", "Bibi"] },
  { id: 5, kata: "Paman", kategori: "Keluarga", gambar: "/Gambar2.png", kataTerkait: ["Bibi", "Kakek", "Nenek"] },
  { id: 6, kata: "Bibi", kategori: "Keluarga", gambar: "/Gambar3.png", kataTerkait: ["Paman", "Ibu", "Ayah"] },
];



export default function DetailKata({ kataAwal = 0, onKembali }) {
  const [activeNav, setActiveNav] = useState("kamus");
  const [index, setIndex] = useState(kataAwal);
  const [gambarKey, setGambarKey] = useState(0);
  const [sudahDilihat, setSudahDilihat] = useState(new Set([kataAwal]));

  const kosakatKategori = kosakata.filter((k) => k.kategori === kosakata[kataAwal]?.kategori);
  const totalKata = kosakatKategori.length;
  const totalDikuasai = sudahDilihat.size;
  const progres = Math.round((totalDikuasai / totalKata) * 100);

  const kata = kosakata[index];
  const isFirst = index === kataAwal;
  const belumDilihat = kosakatKategori
    .map((k) => kosakata.indexOf(k))
    .filter((i) => !sudahDilihat.has(i));
  const isLast = belumDilihat.length === 0;

  function handleNext() {
    if (isLast) return;
    const random = belumDilihat[Math.floor(Math.random() * belumDilihat.length)];
    setIndex(random);
    setSudahDilihat((prev) => new Set([...prev, random]));
    setGambarKey((k) => k + 1);
  }

  function handlePrev() {
    const sudahArray = [...sudahDilihat].filter((i) => i !== index);
    if (sudahArray.length === 0) return;
    const prev = sudahArray[sudahArray.length - 1];
    setIndex(prev);
    setSudahDilihat((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(index);
      return newSet;
    });
    setGambarKey((k) => k + 1);
  }

  function handleReplay() {
    setGambarKey((k) => k + 1);
  }

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

        {/* ── CARD UTAMA ── */}
        <div className="px-4 mb-4">
          <div
            className="rounded-3xl overflow-hidden relative flex flex-col items-center pb-6"
            style={{
              background: "linear-gradient(180deg, #1849A6 0%, #010451 40%, #FEF3B3 100%)",
              minHeight: "420px",
            }}
          >
            {/* tombol replay & play */}
            <div className="w-full flex items-start justify-end px-4 pt-4 mb-2">
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleReplay}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "#1849A6" }}
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "#1849A6" }}
                >
                  <PlayCircle size={18} />
                </button>
              </div>
            </div>

            {/* gambar karakter */}
            <img
              key={gambarKey}
              src={kata.gambar}
              alt={kata.kata}
              className="w-56 h-56 object-contain"
            />

            {/* nama kata */}
            <p className="text-white font-extrabold text-3xl mt-2 mb-2">
              "{kata.kata}"
            </p>

            {/* badge kategori */}
            <div
              className="px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              Kategori :{kata.kategori}
            </div>

            {/* tombol prev */}
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className="absolute bottom-5 left-5 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: isFirst ? "#ccc" : "#fff" }}
            >
              <ChevronLeft size={22} style={{ color: "#010451" }} />
            </button>

            {/* tombol next */}
            <button
              onClick={handleNext}
              disabled={isLast}
              className="absolute bottom-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: isLast ? "#ccc" : "#fff" }}
            >
              <ChevronRight size={22} style={{ color: "#010451" }} />
            </button>
          </div>
        </div>

        {/* ── PROGRES BELAJAR ── */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#e8eeff" }}
                >
                  <span style={{ color: "#1849A6" }}>📈</span>
                </div>
                <p className="font-bold text-gray-800 text-sm">Progres Belajar</p>
              </div>
              <p className="font-bold text-sm" style={{ color: "#1849A6" }}>{progres}%</p>
            </div>
            {/* progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
              <div
                className="h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progres}%`, backgroundColor: "#f5c800" }}
              />
            </div>
            <p className="text-xs text-gray-400">{totalDikuasai} dari {totalKata} kata dikuasai</p>
          </div>
        </div>

        {/* ── KATA TERKAIT ── */}
        <div className="px-4 pb-24">
          <div
            className="rounded-2xl px-4 py-4"
            style={{ backgroundColor: "#FEF3B3" }}
          >
            <p className="font-bold text-gray-800 text-sm mb-3">Kata Terkait</p>
            <div className="flex gap-2 flex-wrap">
              {kata.kataTerkait.map((k, i) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm transition hover:opacity-80"
                >
                  {k}
                </button>
              ))}
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