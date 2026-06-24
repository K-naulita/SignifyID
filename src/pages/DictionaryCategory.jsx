import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "../components/BottomNav";

/*
 * Category detail page
 *
 * Displays all words within a selected category. The header uses a
 * colourful gradient to highlight the category. Words are listed
 * in a scrollable panel with their status (offline / online) and
 * tapping a row navigates to the word detail page.
 */

// Define metadata for each category including a gradient for the header.
const categoryInfo = {
  sapaan: {
    name: "Sapaan",
    gradient: "linear-gradient(120deg, #1E3A8A, #60A5FA)",
  },
  darurat: {
    name: "Darurat",
    gradient: "linear-gradient(120deg, #B91C1C, #F87171)",
  },
  kesehatan: {
    name: "Kesehatan",
    gradient: "linear-gradient(120deg, #059669, #34D399)",
  },
  harian: {
    name: "Harian",
    gradient: "linear-gradient(120deg, #B45309, #FBBF24)",
  },
  pendidikan: {
    name: "Pendidikan",
    gradient: "linear-gradient(120deg, #7C3AED, #C084FC)",
  },
};

// Define some sample words for each category. In a real app this would
// likely come from an API or local JSON file.
const wordsByCategory = {
  sapaan: [
    { id: "halo", name: "Halo", offline: true },
    { id: "selamat-pagi", name: "Selamat Pagi", offline: true },
    { id: "terima-kasih", name: "Terima Kasih", offline: true },
    { id: "maaf", name: "Maaf", offline: false },
  ],
  darurat: [
    { id: "tolong", name: "Tolong", offline: true },
    { id: "bahaya", name: "Bahaya", offline: false },
    { id: "polisi", name: "Polisi", offline: false },
  ],
  kesehatan: [
    { id: "dokter", name: "Dokter", offline: false },
    { id: "obat", name: "Obat", offline: false },
  ],
  harian: [
    { id: "makan", name: "Makan", offline: false },
    { id: "minum", name: "Minum", offline: false },
  ],
  pendidikan: [
    { id: "universitas", name: "Universitas", offline: false },
    { id: "sekolah", name: "Sekolah", offline: false },
  ],
};

export default function DictionaryCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const info = categoryInfo[categoryId] || { name: "Kategori", gradient: "linear-gradient(to bottom, #eee, #ccc)" };
  const words = wordsByCategory[categoryId] || [];

  return (
    <div className="min-h-screen bg-[#F3F5F8] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F3F5F8] relative pb-24">
        {/* Gradient header */}
        <div className="relative h-36" style={{ background: info.gradient }}>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-white text-xl font-bold leading-none"
            >
              &lt;
            </button>
            <h1 className="text-white font-bold text-xl">{info.name}</h1>
          </div>
        </div>

        {/* Word list panel */}
        <div className="px-5 -mt-8">
          <div className="bg-white rounded-t-3xl p-4 shadow">
            {words.map((word) => (
              <div
                key={word.id}
                onClick={() => navigate(`/dictionary/word/${word.id}`)}
                className="flex items-center justify-between py-3 px-2 border-b last:border-b-0 active:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
                    {word.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{word.name}</p>
                    <p className="text-xs text-slate-400">{info.name}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-1 rounded-full ${
                    word.offline
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {word.offline ? "Offline" : "Akses Online"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom navigation bar */}
        <BottomNav />
      </div>
    </div>
  );
}