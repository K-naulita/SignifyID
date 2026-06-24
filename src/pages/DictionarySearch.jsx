import { useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

/*
 * Search page for the dictionary
 *
 * Provides an input to search across all vocabulary and filter chips
 * to narrow results by category. The results are split into two
 * sections: words available offline and words that require an
 * internet connection to download.
 */

// Sample dataset containing words across categories. Each entry
// defines the word, its category and whether it's stored locally.
const allWords = [
  { id: "halo", name: "Halo", category: "Sapaan", offline: true },
  { id: "selamat-pagi", name: "Selamat Pagi", category: "Sapaan", offline: true },
  { id: "terima-kasih", name: "Terima Kasih", category: "Sapaan", offline: true },
  { id: "tolong", name: "Tolong", category: "Darurat", offline: true },
  { id: "bahaya", name: "Bahaya", category: "Darurat", offline: false },
  { id: "polisi", name: "Polisi", category: "Darurat", offline: false },
  { id: "dokter", name: "Dokter", category: "Kesehatan", offline: false },
  { id: "obat", name: "Obat", category: "Kesehatan", offline: false },
  { id: "universitas", name: "Universitas", category: "Pendidikan", offline: false },
  { id: "sekolah", name: "Sekolah", category: "Pendidikan", offline: false },
];

const filters = ["Semua", "Sapaan", "Darurat", "Kesehatan", "Harian", "Pendidikan"];

export default function DictionarySearch() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");

  // Filter words by selected category and search query
  const filtered = allWords.filter((word) => {
    const matchesCategory = filter === "Semua" || word.category === filter;
    const matchesQuery = word.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
  const offlineWords = filtered.filter((w) => w.offline);
  const onlineWords = filtered.filter((w) => !w.offline);

  return (
    <div className="min-h-screen bg-[#F3F5F8] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F3F5F8] relative pb-24">
        <Navbar />

        {/* Information banner about offline vocabulary */}
        <div className="mx-5 mt-4 bg-blue-100 text-blue-700 text-xs p-3 rounded-xl">
          120 kata tersedia untuk penggunaan offline
        </div>

        {/* Search input */}
        <div className="mx-5 mt-4">
          <div className="bg-white flex items-center rounded-full shadow-sm px-4 py-2 gap-2">
            <span className="text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Cari kata isyarat..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")}>✕</button>
            )}
          </div>
        </div>

        {/* Filter chips */}
        <div className="mx-5 mt-3 overflow-x-auto flex gap-2 scrollbar-hide">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`whitespace-nowrap text-xs font-medium px-3 py-1 rounded-full border transition ${
                filter === item
                  ? "bg-blue-100 text-blue-600 border-blue-200"
                  : "bg-white text-slate-500 border-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Offline section */}
        <div className="mx-5 mt-5">
          {offlineWords.length > 0 && (
            <>
              <h3 className="font-semibold text-sm mb-2">Tersedia Offline</h3>
              <div className="bg-white rounded-xl shadow divide-y">
                {offlineWords.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center justify-between p-3 cursor-pointer active:bg-gray-50"
                    onClick={() => (window.location.href = `/dictionary/word/${word.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
                        {word.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{word.name}</p>
                        <p className="text-xs text-slate-400">{word.category}</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full">Offline</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Online section */}
        <div className="mx-5 mt-5">
          {onlineWords.length > 0 && (
            <>
              <h3 className="font-semibold text-sm mb-2">Butuh Koneksi Internet</h3>
              <div className="bg-white rounded-xl shadow divide-y">
                {onlineWords.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-bold">
                        {word.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{word.name}</p>
                        <p className="text-xs text-slate-400">{word.category}</p>
                      </div>
                    </div>
                    <button className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-full active:scale-95">Unduh</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}