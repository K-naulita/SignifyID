import { useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function TranscribeMe() {
  const [isFinished, setIsFinished] = useState(false);

  const [text, setText] = useState("Mulai merekam...");
  const [status, setStatus] = useState("Saya mendengarkan...");
  const [wordCount, setWordCount] = useState("0/50 kata");

  const [maskot, setMaskot] = useState("/dengar.png");

  const toggleState = () => {
    if (!isFinished) {
      setIsFinished(true);

      setStatus("Halo");
      setMaskot("/halo.png");
      setText('"Halo, bagaimana kabar Anda hari ini?"');
      setWordCount("6/50 kata");
    } else {
      setIsFinished(false);

      setStatus("Saya mendengarkan...");
      setMaskot("/dengar.png");
      setText("Mulai merekam...");
      setWordCount("0/50 kata");
    }
  };

  const ulangi = () => {
    const img = document.getElementById("maskot");

    if (img) {
      img.style.opacity = "0.5";
      setTimeout(() => {
        img.style.opacity = "1";
      }, 150);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">

      <div className="w-[390px] h-[844px] bg-white relative flex flex-col overflow-hidden">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <div className="flex-1 px-5 pt-4 pb-24 flex flex-col items-center overflow-y-auto">

          {/* STATUS */}
          <div className="w-full flex justify-end mb-2">
            <div className="bg-white border text-xs px-4 py-2 rounded-2xl">
              {status}
            </div>
          </div>

          {/* MASKOT */}
          <img
            id="maskot"
            src={maskot}
            className="w-48 h-48 object-contain transition"
          />

          {/* TEXT */}
          <div className="w-full mt-4 p-4 border rounded-xl min-h-[120px]">
            <div className="flex justify-between text-sm mb-2">
              <b>Transkripsi Suara</b>
              <span className="text-gray-400">{wordCount}</span>
            </div>

            <p className="text-sm text-gray-500">{text}</p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-6 mt-8 items-center">

            <button
              onClick={ulangi}
              className="w-14 h-14 bg-yellow-100 rounded-full"
            >
              ↻
            </button>

            <button
              onClick={toggleState}
              className={`w-20 h-20 rounded-full ${
                isFinished ? "bg-yellow-400" : "bg-yellow-200"
              }`}
            >
              🎤
            </button>

            <button className="w-14 h-14 bg-yellow-100 rounded-full">
              1.0x
            </button>

          </div>

          {/* ACTION */}
          <button
            onClick={toggleState}
            className="mt-8 bg-blue-900 text-white px-10 py-3 rounded-full"
          >
            {isFinished ? "Selesai Berbicara" : "Mulai Berbicara"}
          </button>

        </div>

        {/* BOTTOM NAV */}
        <BottomNav />

      </div>
    </div>
  );
}