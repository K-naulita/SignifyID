import { useState } from "react";
import { X, RotateCcw, Menu } from "lucide-react";
import HasilKuis from "./HasilKuis";

// ── dummy data soal ──────────────────────────────────────────────────────────
const soalList = [
  {
    id: 1,
    gambar: "/Gambar1.png",
    pertanyaan: "Isyarat apakah ini?",
    pilihan: ["Apa?", "Kapan?", "Siapa?", "Dimana?"],
    jawaban: 2, // index jawaban benar (Siapa?)
  },
  {
    id: 2,
    gambar: "/Gambar1.png",
    pertanyaan: "Isyarat apakah ini?",
    pilihan: ["Apa?", "Kapan?", "Siapa?", "Dimana?"],
    jawaban: 0,
  },
  {
    id: 3,
    gambar: "/Gambar3.png",
    pertanyaan: "Isyarat apakah ini?",
    pilihan: ["Apa?", "Kapan?", "Siapa?", "Dimana?"],
    jawaban: 3,
  },
  {
    id: 4,
    gambar: "/Gambar1.png",
    pertanyaan: "Isyarat apakah ini?",
    pilihan: ["Apa?", "Kapan?", "Siapa?", "Dimana?"],
    jawaban: 1,
  },
  {
    id: 5,
    gambar: "/Gambar4.png",
    pertanyaan: "Isyarat apakah ini?",
    pilihan: ["Apa?", "Kapan?", "Siapa?", "Dimana?"],
    jawaban: 4,
  },
];

const HURUF = ["A", "B", "C", "D"];

export default function Kuis({ onKembali }) {
  const [soalIndex, setSoalIndex] = useState(0);
  const [dipilih, setDipilih] = useState(null);
  const [gambarKey, setGambarKey] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [skorBenar, setSkorBenar] = useState(0);

  const soal = soalList[soalIndex];
  const total = soalList.length;
  const progress = ((soalIndex + 1) / total) * 100;

  function handleLanjut() {
    if (dipilih === null) return;
    if (soalIndex < total - 1) {
      setSoalIndex(soalIndex + 1);
      setDipilih(null);
      setGambarKey((k) => k + 1);
    } else {
      // selesai semua soal — bisa navigasi ke halaman hasil
      setSelesai(true);
    }
  }

  function handleReplay() {
    setGambarKey((k) => k + 1);
  }

  if (selesai) {
  return (
    <HasilKuis
      hasil={{ nilai: skorBenar * 20, total: 100, poin: skorBenar * 5, benar: skorBenar, salah: total - skorBenar, totalSoal: total }}
      onLanjut={onKembali}
    />
  );
}

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen bg-gray-50">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-4 pt-10 pb-3">
          <button className="text-gray-500">
            <Menu size={22} />
          </button>
          <div className="text-center">
            <p className="font-bold text-base" style={{ color: "#1849A6" }}>
              {soal.pertanyaan.includes("Kata") ? "Kata Tanya" : "Kata Tanya"}
            </p>
            <p className="text-xs text-gray-400">
              {soalIndex + 1}/{total}
            </p>
          </div>
          <button onClick={onKembali} className="text-gray-500">
            <X size={22} />
          </button>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="px-4 mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: "#010451" }}
            />
          </div>
        </div>

        {/* ── GAMBAR KARAKTER ── */}
        <div className="px-4 mb-4 relative">
            <div
                className="rounded-2xl overflow-hidden w-full aspect-[4/3] flex items-center justify-center relative"
                style={{
                background: "linear-gradient(180deg, #1849A6 0%, #010451 40%, #FEF3B3 100%)",
                }}
            >
                <img
                key={gambarKey}
                src={soal.gambar}
                alt="isyarat"
                className="w-full h-full object-contain relative z-10"
                />
            </div>
            {/* tombol replay */}
            <button
                onClick={handleReplay}
                className="absolute bottom-4 right-8 p-2.5 rounded-full shadow-md text-white transition hover:opacity-90"
                style={{ backgroundColor: "#1849A6" }}
            >
                <RotateCcw size={18} />
            </button>
            </div>

        {/* ── PERTANYAAN ── */}
        <div className="px-4 mb-3">
          <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#c6f0e4" }}
            >
              <span style={{ color: "#1849A6" }} className="text-sm font-bold">?</span>
            </div>
            <p className="text-gray-700 text-sm font-medium">{soal.pertanyaan}</p>
          </div>
        </div>

        {/* ── PILIHAN JAWABAN ── */}
        <div className="px-4 grid grid-cols-2 gap-3 mb-4">
          {soal.pilihan.map((opsi, i) => {
            const dipilihIni = dipilih === i;
            return (
              <button
                key={i}
                onClick={() => setDipilih(i)}
                className="bg-white rounded-2xl px-4 py-4 flex items-center gap-3 shadow-sm text-left transition"
                style={
                  dipilihIni
                    ? { backgroundColor: "#FEF3B3", border: "2px solid #FEF3B3" }
                    : { border: "2px solid transparent" }
                }
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={
                    dipilihIni
                      ? { backgroundColor: "#e8c800", color: "#fff" }
                      : { backgroundColor: "#f0f0f0", color: "#888" }
                  }
                >
                  {HURUF[i]}
                </span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: dipilihIni ? "#010451" : "#333" }}
                >
                  {opsi}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── TOMBOL LANJUT ── */}
        <div className="px-4 mt-auto pb-8">
          <button
            onClick={handleLanjut}
            disabled={dipilih === null}
            className="w-full py-4 rounded-2xl font-bold text-sm transition"
            style={
              dipilih !== null
                ? { backgroundColor: "#010451", color: "#fff" }
                : { backgroundColor: "#d1d5db", color: "#9ca3af" }
            }
          >
            {dipilih !== null ? "Lanjutkan →" : "Pilih jawaban terlebih dahulu"}
          </button>
        </div>
      </div>
    </div>
  );
}