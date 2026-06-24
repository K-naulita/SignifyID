import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function TranslateMe() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [maskot, setMaskot] = useState("/halo.png");
  const [speed, setSpeed] = useState("1.0");

  const chipData = ["Apa kabar?", "Terima kasih", "Kerja bagus"];

  const handleInput = (value) => {
    setText(value);

    const words = value.trim() === "" ? [] : value.trim().split(/\s+/);
    setWordCount(words.length);

    if (value.trim() === "") {
      setMaskot("/halo.png");
    } else {
      syncVisual(value);
    }
  };

  const syncVisual = (val) => {
    const text = val.toLowerCase().trim();

    if (text === "terima kasih") {
      setMaskot("/terimakasih.png");
    } else if (text === "kerja bagus") {
      setMaskot("/jempol.png");
    } else {
      setMaskot("/halo.png");
    }
  };

  const handleTranslate = () => {
    if (!text.trim()) {
      alert("Silakan ketik atau pilih kalimat terlebih dahulu!");
      return;
    }
    syncVisual(text);
  };

  const repeatAnimation = () => {
    const img = document.getElementById("maskot");
    if (img) {
      img.style.opacity = "0.4";
      setTimeout(() => (img.style.opacity = "1"), 150);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">

      {/* MOBILE FRAME */}
      <div className="w-[390px] h-[844px] bg-white flex flex-col relative">

        {/* BACK BUTTON (KHUSUS PAGE INI) */}


        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">

          {/* MASKOT */}
          <div className="flex justify-center mt-6">
            <img
              id="maskot"
              src={maskot}
              className="w-44 h-44 object-contain"
            />
          </div>

          {/* INPUT */}
          <div className="px-5 mt-4">
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold">
                Masukkan Teks untuk Diterjemahkan
              </label>

              <span className="text-xs text-gray-400">
                {wordCount}/50 kata
              </span>
            </div>

            <textarea
              value={text}
              onChange={(e) => handleInput(e.target.value)}
              className="w-full h-32 border rounded-xl p-3 text-sm"
              placeholder="Ketik sesuatu..."
            />
          </div>

          {/* BUTTON */}
          <div className="px-5 mt-3">
            <button
              onClick={handleTranslate}
              className="w-full bg-blue-900 text-white py-3 rounded-xl"
            >
              Terjemahkan ke Isyarat
            </button>
          </div>

          {/* CHIPS */}
          <div className="px-5 mt-3 flex gap-2 overflow-x-auto">
            {chipData.map((item) => (
              <button
                key={item}
                onClick={() => handleInput(item)}
                className="px-4 py-2 border rounded-full text-xs"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CONTROL */}
          <div className="flex justify-between px-5 mt-4">
            <button
              onClick={repeatAnimation}
              className="px-4 py-2 border rounded-xl"
            >
              Ulangi
            </button>

            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="border rounded-xl px-3"
            >
              <option value="0.5">0.5x</option>
              <option value="1.0">1.0x</option>
              <option value="1.5">1.5x</option>
              <option value="2.0">2.0x</option>
            </select>
          </div>

        </div>

        {/* BOTTOM NAVBAR */}
        <BottomNav />

      </div>
    </div>
  );
}