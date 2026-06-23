import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TermsOfService() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex justify-center">

      {/* MOBILE WRAPPER */}
      <div className="w-full max-w-[430px] min-h-screen bg-white relative">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white sticky top-0">

          <button
            onClick={() => navigate(-1)}
            className="text-xl"
          >
            ←
          </button>

          <h1 className="text-sm font-semibold">
            Ketentuan Layanan
          </h1>

          <div className="w-6" />
        </div>

        {/* CONTENT */}
        <div className="px-5 py-4 space-y-4 text-sm text-slate-700 leading-relaxed">

          <p className="text-xs text-slate-500">
            Terakhir diperbarui: Januari 2026 – SignifyID
          </p>

          <section>
            <h2 className="font-semibold">1. Penggunaan Aplikasi</h2>
            <p>
              SignifyID adalah platform komunikasi darurat termasuk SOS,
              GPS, dan kontak cepat.
            </p>
          </section>

          <section>
            <h2 className="font-semibold">2. Layanan Darurat</h2>
            <p>
              Fitur SOS membantu pengguna dalam kondisi darurat, namun tidak
              menjamin respons instan dari pihak eksternal.
            </p>
          </section>

          <section>
            <h2 className="font-semibold">3. GPS & Lokasi</h2>
            <p>
              Lokasi hanya digunakan saat fitur SOS aktif dan tidak disimpan
              permanen tanpa izin.
            </p>
          </section>

          <section>
            <h2 className="font-semibold">4. Privasi</h2>
            <p>
              Data pengguna tidak dijual atau dibagikan tanpa persetujuan.
            </p>
          </section>

          <section>
            <h2 className="font-semibold">5. Tanggung Jawab</h2>
            <p>
              Pengguna bertanggung jawab atas data kontak yang dimasukkan.
            </p>
          </section>

          <section>
            <h2 className="font-semibold">6. Perubahan</h2>
            <p>
              SignifyID dapat mengubah layanan tanpa pemberitahuan terlebih dahulu.
            </p>
          </section>

        </div>

        {/* FOOTER BUTTON */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-[#F5F7FB] p-4">

          <div className="w-full max-w-[430px] flex gap-3">

            {/* BACK */}
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-xl bg-slate-200 font-medium"
            >
              Kembali
            </button>

            {/* ACCEPT */}
            <button
              onClick={() => {
                setAccepted(true);
                setTimeout(() => navigate("/profile"), 800);
              }}
              className={`flex-1 py-3 rounded-xl font-semibold text-white ${
                accepted ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {accepted ? "Disetujui ✓" : "Setujui Semua"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}