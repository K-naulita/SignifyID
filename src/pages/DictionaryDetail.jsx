import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "../components/BottomNav";

/*
 * Word detail page
 *
 * Presents the sign illustration (placeholder), word title, category,
 * playback controls and descriptive information about the movement.
 * At the bottom of the card users can see related words and a call
 * to action to practise the sign in the Play Me section.
 */

// Mock dataset containing detailed information for each word.
const wordDetails = {
  halo: {
    id: "halo",
    name: "Halo",
    category: "Sapaan",
    offline: true,
    description:
      "Angkat tangan kanan ke depan dada dan gerakkan sedikit ke kiri dan kanan sambil tersenyum.",
    example: "Halo! Senang berkenalan denganmu.",
    related: ["Sapaan", "Selamat Pagi", "Selamat Siang"],
  },
  "terima-kasih": {
    id: "terima-kasih",
    name: "Terima Kasih",
    category: "Sapaan",
    offline: true,
    description:
      "Satukan kedua telapak tangan di depan dada, lalu dorong perlahan ke depan sambil tersenyum.",
    example: "Terima kasih atas bantuanmu.",
    related: ["Tolong", "Maaf", "Selamat"],
  },
  tolong: {
    id: "tolong",
    name: "Tolong",
    category: "Darurat",
    offline: true,
    description:
      "Angkat tangan kanan ke udara lalu goyangkan dengan gerakan memanggil sambil menunjuk diri sendiri.",
    example: "Tolong! Saya butuh bantuan segera.",
    related: ["Bahaya", "SOS", "Darurat", "Bantuan"],
  },
};

export default function DictionaryDetail() {
  const { wordId } = useParams();
  const navigate = useNavigate();
  const word = wordDetails[wordId] || {
    id: wordId,
    name: "Kata",
    category: "Kategori",
    offline: false,
    description: "",
    example: "",
    related: [],
  };

  return (
    <div className="min-h-screen bg-[#F3F5F8] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F3F5F8] relative pb-24">
        {/* Header with gradient and offline badge */}
        <div className="relative h-48" style={{ background: "linear-gradient(120deg, #2563EB, #6EE7B7)" }}>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-white text-xl font-bold"
          >
            &lt;
          </button>
          {word.offline && (
            <span className="absolute top-4 right-4 text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Offline
            </span>
          )}
          {/* Placeholder for sign illustration */}
          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-slate-400">
            🎬
          </div>
        </div>

        {/* Content area */}
        <div className="px-5 mt-24">
          <h1 className="font-bold text-2xl">{word.name}</h1>
          <p className="text-sm text-slate-500 mt-1">Kategori: {word.category}</p>
          <button
            onClick={() => {
              /* In a real app this would trigger video replay */
            }}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-full active:scale-95"
          >
            Putar Ulang
          </button>

          <div className="bg-white p-4 rounded-xl mt-5 shadow">
            <h2 className="font-semibold text-sm">Deskripsi Gerakan</h2>
            <p className="text-sm text-slate-600 mt-1 leading-snug">
              {word.description || "Deskripsi belum tersedia."}
            </p>

            <h2 className="font-semibold text-sm mt-4">Contoh Penggunaan</h2>
            <p className="text-sm italic text-slate-600 mt-1">
              {word.example || "Belum ada contoh."}
            </p>

            <h2 className="font-semibold text-sm mt-4">Kata Terkait</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              {word.related.length > 0 ? (
                word.related.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">Tidak ada kata terkait</span>
              )}
            </div>

            <button
              onClick={() => {
                /* Navigate to Play Me training page */
                window.location.href = "/play";
              }}
              className="block w-full mt-5 bg-yellow-400 text-white py-2 rounded-xl active:scale-95 text-sm font-semibold text-center"
            >
              Latih kata ini di Play Me
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}