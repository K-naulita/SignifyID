import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

/*
 * Offline dictionary home page
 *
 * This page lists all available vocabulary categories. Each card shows
 * the category name, how many words are included and whether those
 * words are cached for offline use. Users can tap a card to open
 * the list of words in that category.
 */
export default function Dictionary() {
  const navigate = useNavigate();

  // Define your categories here. In a real application this could
  // come from a backend or local data source. The `offline` flag
  // controls whether the category can be browsed without an
  // internet connection.
  const categories = [
    {
      id: "sapaan",
      name: "Sapaan",
      words: 24,
      offline: true,
      colorBg: "bg-blue-100",
      colorText: "text-blue-600",
      icon: "👋",
    },
    {
      id: "darurat",
      name: "Darurat",
      words: 12,
      offline: true,
      colorBg: "bg-red-100",
      colorText: "text-red-600",
      icon: "⚠️",
    },
    {
      id: "kesehatan",
      name: "Kesehatan",
      words: 18,
      offline: false,
      colorBg: "bg-green-100",
      colorText: "text-green-600",
      icon: "💊",
    },
    {
      id: "harian",
      name: "Harian",
      words: 20,
      offline: false,
      colorBg: "bg-yellow-100",
      colorText: "text-yellow-600",
      icon: "☀️",
    },
    {
      id: "pendidikan",
      name: "Pendidikan",
      words: 30,
      offline: false,
      colorBg: "bg-purple-100",
      colorText: "text-purple-600",
      icon: "🎓",
    },
  ];

  // Sum the number of offline words across categories to show at the bottom
  const totalOffline = categories
    .filter((c) => c.offline)
    .reduce((acc, c) => acc + c.words, 0);
  const totalWords = categories.reduce((acc, c) => acc + c.words, 0);

  return (
    <div className="min-h-screen bg-[#F3F5F8] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F3F5F8] relative pb-24">
        {/* Use the existing Navbar component for a consistent look */}
        <Navbar />

        {/* Grey banner prompting users to download vocab packages */}
        <div className="mx-5 mt-4 bg-gray-100 p-3 rounded-xl text-xs text-slate-600">
          Unduh kosakata untuk membuatnya tersedia offline
        </div>

        {/* Heading and description */}
        <div className="px-5 mt-5">
          <h2 className="font-bold text-lg">Semua Kategori</h2>
          <p className="text-sm text-slate-500 mt-1">
            Pilih kategori untuk menelusuri kosakata BISINDO
          </p>

          {/* Category grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/dictionary/category/${cat.id}`)}
                className={`p-4 rounded-xl shadow-sm active:scale-95 transition cursor-pointer ${
                  cat.offline ? "bg-white" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${cat.colorBg} ${cat.colorText}`}
                >
                  <span className="text-lg">{cat.icon}</span>
                </div>
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {cat.words} kata
                </p>
                <span
                  className={`text-[10px] mt-2 inline-block px-2 py-1 rounded-full ${
                    cat.offline
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {cat.offline ? "Offline" : "Akses Online"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info about total offline vocabulary */}
        <div className="px-5 mt-5 mb-4">
          <div className="bg-white p-3 rounded-xl text-xs text-slate-600 text-center shadow">
            Total {totalOffline} kata tersedia tanpa internet dari {totalWords}+ kata
          </div>
        </div>

        {/* Bottom navigation bar */}
        <BottomNav />
      </div>
    </div>
  );
}