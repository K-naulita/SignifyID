import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Ear, Volume2 } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [customCity, setCustomCity] = useState("");
  const [cityMode, setCityMode] = useState("select");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(null);

  const [form, setForm] = useState({
    namaLengkap: "",
    tempatTinggal: "",
    tanggalLahir: "",
    email: "",
    kataSandi: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      if (
        !form.namaLengkap ||
        !form.tempatTinggal ||
        !form.tanggalLahir ||
        !form.email ||
        !form.kataSandi ||
        !userType
      ) {
        alert("Lengkapi semua data terlebih dahulu");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.kataSandi,
      });

      if (error) throw error;

      const user = data.user;

      const { error: dbError } = await supabase.from("users").insert([
        {
          id: user.id,
          nama_lengkap: form.namaLengkap,
          user_type: userType,
          tempat_tinggal: form.tempatTinggal,
          tanggal_lahir: form.tanggalLahir,
          email: form.email,
        },
      ]);

      if (dbError) throw dbError;

      navigate("/permission");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F8F9FD]">

      <div className="w-full max-w-[390px] flex flex-col min-h-screen overflow-y-auto pb-10">

        {/* HEADER */}
<div className="relative px-5 pt-14 pb-6">

  {/* BACK BUTTON */}
  <button
    type="button"
    onClick={() => navigate("/")}
    className="absolute left-5 top-14 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm"
  >
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z"
        fill="#191C1F"
      />
    </svg>
  </button>

  {/* TITLE CENTER */}
  <h1 className="text-center text-xl font-bold text-[#191C1F]">
    Daftar Akun
  </h1>

  {/* SUBTITLE */}
  <div className="mt-3 text-center">
    <p className="text-blue-600 font-semibold">
      Bergabunglah dengan Kami!
    </p>

    <p className="text-sm text-slate-500 mt-1">
      Daftar untuk memulai perjalanan belajar yang menakjubkan
    </p>
  </div>

</div>

        {/* FORM */}
        <div className="px-5 flex flex-col gap-4">

          {/* NAMA */}
          <div>
            <label className="text-sm text-[#3E4945] mb-1 block">
              Nama Lengkap
            </label>

            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={form.namaLengkap}
              onChange={(e) => handleChange("namaLengkap", e.target.value)}
              className="w-full h-12 rounded-xl border px-4"
            />
          </div>

          {/* TIPE PENGGUNA */}
<div>
  <label className="text-sm text-[#3E4945] mb-2 block">
    Tipe Pengguna
  </label>

  <div className="grid grid-cols-2 gap-4">

    {/* TULI */}
    <button
      type="button"
      onClick={() => setUserType("tuli")}
      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${
        userType === "tuli"
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300"
      }`}
    >
      <Ear size={28} className="text-blue-600" />

      <p className="font-semibold">Tuli</p>
      <p className="text-xs text-slate-500 text-center">
        Memiliki keterbatasan pendengaran
      </p>
    </button>

    {/* DENGAR */}
    <button
      type="button"
      onClick={() => setUserType("dengar")}
      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${
        userType === "dengar"
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300"
      }`}
    >
      <Volume2 size={28} className="text-blue-600" />

      <p className="font-semibold">Dengar</p>
      <p className="text-xs text-slate-500 text-center">
        Dapat mendengar normal
      </p>
    </button>

  </div>
</div>

          {/* TEMPAT TINGGAL */}
          <div>
            <label className="text-sm mb-1 block">Tempat Tinggal</label>

            <select
              value={cityMode === "select" ? form.tempatTinggal : "lainnya"}
              onChange={(e) => {
                const val = e.target.value;

                if (val === "lainnya") {
                  setCityMode("manual");
                  handleChange("tempatTinggal", "");
                } else {
                  setCityMode("select");
                  handleChange("tempatTinggal", val);
                  setCustomCity("");
                }
              }}
              className="w-full h-12 border rounded-xl px-4"
            >
              <option value="">Pilih Kota</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Bandung">Bandung</option>
              <option value="Medan">Medan</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          {/* MANUAL CITY */}
          {cityMode === "manual" && (
            <div>
              <label className="text-sm mb-1 block">
                Kota Lainnya
              </label>

              <input
                type="text"
                placeholder="Masukkan nama kota"
                value={customCity}
                onChange={(e) => {
                  setCustomCity(e.target.value);
                  handleChange("tempatTinggal", e.target.value);
                }}
                className="w-full h-12 border rounded-xl px-4"
              />
            </div>
          )}

          {/* TANGGAL LAHIR */}
          <div>
            <label className="text-sm mb-1 block">
              Tanggal Lahir
            </label>

            <input
              type="date"
              value={form.tanggalLahir}
              onChange={(e) =>
                handleChange("tanggalLahir", e.target.value)
              }
              className="w-full h-12 border rounded-xl px-4"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm mb-1 block">Email</label>

            <input
              type="email"
              placeholder="contoh@email.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full h-12 border rounded-xl px-4"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm mb-1 block">Kata Sandi</label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={form.kataSandi}
              onChange={(e) => handleChange("kataSandi", e.target.value)}
              className="w-full h-12 border rounded-xl px-4"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            className="w-full h-12 bg-[#013485] text-white rounded-2xl font-semibold mt-2"
          >
            Daftar
          </button>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-6 text-sm">
          <span>Sudah punya akun? </span>
          <Link to="/" className="text-blue-600">
            Masuk
          </Link>
        </div>

      </div>
    </div>
  );
}