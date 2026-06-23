import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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

    // 1. REGISTER SUPABASE AUTH
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.kataSandi,
    });

    if (error) throw error;

    const user = data.user;

    // 2. SIMPAN KE TABLE USERS
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

    console.log("REGISTER SUCCESS");

    // 3. REDIRECT (INI TIDAK DIGANTI)
    navigate("/permission");

  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
};

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(213,228,253,0.19) 0%, #F8F9FD 40%), #FFF",
        fontFamily:
          "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
      }}
    >
      <div className="w-full max-w-[390px] flex flex-col">
        {/* Top App Bar */}
        <div className="flex items-center px-5 pt-14 pb-4 gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-10 h-10 items-center justify-center rounded-xl bg-white flex-shrink-0"
            style={{ boxShadow: "0 12px 32px -8px rgba(0,107,88,0.08)" }}
            aria-label="Kembali"
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
          <h1
            className="flex-1 text-center text-xl font-bold"
            style={{
              color: "#191C1F",
              lineHeight: "24px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Daftar Akun
          </h1>
          {/* Spacer to balance the back button */}
          <div className="w-10 flex-shrink-0" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 px-5 pb-12">
          {/* Welcome Text */}
          <div className="flex flex-col items-center gap-2 pt-4">
            <p
              className="text-base font-bold italic text-center"
              style={{ color: "#1D59BB", lineHeight: "24px" }}
            >
              Bergabunglah dengan Kami!
            </p>
            <p
              className="text-base text-center px-4"
              style={{ color: "#3E4945", lineHeight: "24px" }}
            >
              Daftar untuk memulai perjalanan belajar yang menakjubkan
            </p>
          </div>

          {/* Registration Form Card */}
          <div
            className="w-full rounded-3xl bg-white px-6 pt-6 pb-10"
            style={{ boxShadow: "0 12px 32px -8px rgba(0,107,88,0.08)" }}
          >
            <div className="flex flex-col gap-4">
              {/* Nama Lengkap */}
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={form.namaLengkap}
                onChange={(e) => handleChange("namaLengkap", e.target.value)}
                className="w-full h-12 rounded-xl border border-[#BDC9C4] bg-white px-4 text-base outline-none focus:border-[#013485] transition-colors"
                style={{
                  color: form.namaLengkap ? "#3E4945" : "rgba(62,73,69,0.5)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />

              {/* Tipe Pengguna */}
              <div className="flex flex-col gap-2">
                <div className="px-1">
                  <span
                    className="text-base"
                    style={{
                      color: "#3E4945",
                      fontFamily: "'Work Sans', sans-serif",
                      lineHeight: "24px",
                    }}
                  >
                    Tipe Pengguna
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Tuli Option */}
                  <button
                    type="button"
                    onClick={() => setUserType("tuli")}
                    className="flex flex-col items-center p-4 rounded-2xl border transition-colors"
                    style={{
                      background: userType === "tuli" ? "#EBF0FB" : "#F2F3F7",
                      borderColor: userType === "tuli" ? "#1D59BB" : "#BDC9C4",
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-full mb-3"
                      style={{ background: "#E1E2E6" }}
                    >
                      <svg
                        width="22"
                        height="23"
                        viewBox="0 0 22 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.8 22.1L12.475 14.775C12.1417 15.0417 11.8708 15.275 11.6625 15.475C11.4542 15.675 11.2792 15.875 11.1375 16.075C10.9958 16.275 10.8667 16.5042 10.75 16.7625C10.6333 17.0208 10.5083 17.35 10.375 17.75C10.0417 18.7167 9.52083 19.4667 8.8125 20C8.10417 20.5333 7.275 20.8 6.325 20.8C5.225 20.8 4.28333 20.4083 3.5 19.625C2.71667 18.8417 2.325 17.9 2.325 16.8H4.325C4.325 17.35 4.52083 17.8208 4.9125 18.2125C5.30417 18.6042 5.775 18.8 6.325 18.8C6.84167 18.8 7.27917 18.6333 7.6375 18.3C7.99583 17.9667 8.325 17.4167 8.625 16.65C8.80833 16.2 8.975 15.8167 9.125 15.5C9.275 15.1833 9.44167 14.9042 9.625 14.6625C9.80833 14.4208 10.0167 14.2 10.25 14C10.4833 13.8 10.7583 13.5917 11.075 13.375L4.425 6.725C4.39167 6.90833 4.36667 7.0875 4.35 7.2625C4.33333 7.4375 4.325 7.61667 4.325 7.8H2.325C2.325 7.31667 2.36667 6.85417 2.45 6.4125C2.53333 5.97083 2.65833 5.54167 2.825 5.125L0 2.3L1.425 0.875L21.225 20.675L19.8 22.1ZM17.975 14.575L16.55 13.15C17.1333 12.3667 17.575 11.5208 17.875 10.6125C18.175 9.70417 18.325 8.76667 18.325 7.8C18.325 6.58333 18.0958 5.425 17.6375 4.325C17.1792 3.225 16.525 2.25 15.675 1.4L17.125 0C18.1583 1.05 18.95 2.24583 19.5 3.5875C20.05 4.92917 20.325 6.33333 20.325 7.8C20.325 9.01667 20.125 10.2 19.725 11.35C19.325 12.5 18.7417 13.575 17.975 14.575ZM15.25 11.85L13.8 10.4C13.9833 10.0167 14.1167 9.60833 14.2 9.175C14.2833 8.74167 14.325 8.28333 14.325 7.8C14.325 6.38333 13.8458 5.19583 12.8875 4.2375C11.9292 3.27917 10.7417 2.8 9.325 2.8C8.89167 2.8 8.46667 2.85417 8.05 2.9625C7.63333 3.07083 7.23333 3.23333 6.85 3.45L5.375 1.975C5.95833 1.59167 6.58333 1.3 7.25 1.1C7.91667 0.9 8.60833 0.8 9.325 0.8C11.3083 0.8 12.9708 1.47083 14.3125 2.8125C15.6542 4.15417 16.325 5.81667 16.325 7.8C16.325 8.55 16.2375 9.2625 16.0625 9.9375C15.8875 10.6125 15.6167 11.25 15.25 11.85ZM11.75 8.35L8.75 5.35C8.83333 5.31667 8.925 5.3 9.025 5.3C9.125 5.3 9.225 5.3 9.325 5.3C10.025 5.3 10.6167 5.54167 11.1 6.025C11.5833 6.50833 11.825 7.1 11.825 7.8C11.825 7.9 11.8208 7.99583 11.8125 8.0875C11.8042 8.17917 11.7833 8.26667 11.75 8.35ZM9.325 10.3C8.625 10.3 8.03333 10.0542 7.55 9.5625C7.06667 9.07083 6.825 8.48333 6.825 7.8C6.825 7.58333 6.85 7.375 6.9 7.175C6.95 6.975 7.03333 6.78333 7.15 6.6L10.55 10C10.3667 10.1 10.1708 10.175 9.9625 10.225C9.75417 10.275 9.54167 10.3 9.325 10.3Z"
                          fill="#3E4945"
                        />
                      </svg>
                    </div>
                    <span
                      className="text-base mb-1"
                      style={{
                        color: "#191C1F",
                        fontFamily: "'Work Sans', sans-serif",
                        lineHeight: "24px",
                      }}
                    >
                      Tuli
                    </span>
                    <span
                      className="text-[10px] text-center leading-3"
                      style={{
                        color: "#3E4945",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      Saya memiliki keterbatasan pendengaran
                    </span>
                  </button>

                  {/* Dengar Option */}
                  <button
                    type="button"
                    onClick={() => setUserType("dengar")}
                    className="flex flex-col items-center p-4 rounded-2xl border transition-colors"
                    style={{
                      background: userType === "dengar" ? "#EBF0FB" : "#F2F3F7",
                      borderColor:
                        userType === "dengar" ? "#1D59BB" : "#BDC9C4",
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-full mb-3"
                      style={{ background: "#E1E2E6" }}
                    >
                      <svg
                        width="18"
                        height="21"
                        viewBox="0 0 18 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 20.8C5.03333 20.8 5.87917 20.5417 6.5375 20.025C7.19583 19.5083 7.7 18.75 8.05 17.75C8.33333 16.9167 8.60417 16.3333 8.8625 16C9.12083 15.6667 9.71667 15.1333 10.65 14.4C11.6833 13.5667 12.5 12.625 13.1 11.575C13.7 10.525 14 9.26667 14 7.8C14 5.81667 13.3292 4.15417 11.9875 2.8125C10.6458 1.47083 8.98333 0.8 7 0.8C5.01667 0.8 3.35417 1.47083 2.0125 2.8125C0.670833 4.15417 0 5.81667 0 7.8H2C2 6.38333 2.47917 5.19583 3.4375 4.2375C4.39583 3.27917 5.58333 2.8 7 2.8C8.41667 2.8 9.60417 3.27917 10.5625 4.2375C11.5208 5.19583 12 6.38333 12 7.8C12 8.93333 11.775 9.9 11.325 10.7C10.875 11.5 10.2333 12.2167 9.4 12.85C8.53333 13.4833 7.85833 14.1 7.375 14.7C6.89167 15.3 6.53333 15.95 6.3 16.65C6.06667 17.3833 5.7875 17.925 5.4625 18.275C5.1375 18.625 4.65 18.8 4 18.8C3.45 18.8 2.97917 18.6042 2.5875 18.2125C2.19583 17.8208 2 17.35 2 16.8H0C0 17.9 0.391667 18.8417 1.175 19.625C1.95833 20.4083 2.9 20.8 4 20.8ZM14.8 15.55C15.7833 14.55 16.5625 13.3875 17.1375 12.0625C17.7125 10.7375 18 9.31667 18 7.8C18 6.26667 17.7125 4.83333 17.1375 3.5C16.5625 2.16667 15.7833 1 14.8 0L13.35 1.4C14.1833 2.23333 14.8333 3.19583 15.3 4.2875C15.7667 5.37917 16 6.55 16 7.8C16 9.03333 15.7667 10.1917 15.3 11.275C14.8333 12.3583 14.1833 13.3167 13.35 14.15L14.8 15.55ZM7 10.3C7.7 10.3 8.29167 10.0542 8.775 9.5625C9.25833 9.07083 9.5 8.48333 9.5 7.8C9.5 7.1 9.25833 6.50833 8.775 6.025C8.29167 5.54167 7.7 5.3 7 5.3C6.3 5.3 5.70833 5.54167 5.225 6.025C4.74167 6.50833 4.5 7.1 4.5 7.8C4.5 8.48333 4.74167 9.07083 5.225 9.5625C5.70833 10.0542 6.3 10.3 7 10.3Z"
                          fill="#3E4945"
                        />
                      </svg>
                    </div>
                    <span
                      className="text-base mb-1"
                      style={{
                        color: "#191C1F",
                        fontFamily: "'Work Sans', sans-serif",
                        lineHeight: "24px",
                      }}
                    >
                      Dengar
                    </span>
                    <span
                      className="text-[10px] text-center leading-3"
                      style={{
                        color: "#3E4945",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      Saya dapat mendengar dengan normal
                    </span>
                  </button>
                </div>
              </div>

              {/* Tempat Tinggal */}
              <div className="relative w-full">
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
                  className="w-full h-12 rounded-xl border px-4 text-gray-400 focus:text-black appearance-none"
                >
                    <option value="">Pilih Kota</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Surabaya">Surabaya</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Medan">Medan</option>
                    <option value="lainnya">Lainnya</option>
                  </select>

                    {/* ICON LOKASI */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#013485">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                      </svg>
                    </div>
                  </div>

              {cityMode === "manual" && (
                <input
                  type="text"
                  placeholder="Masukkan nama kota"
                  value={customCity}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomCity(val);

                    // UPDATE FORM TAPI TIDAK MERUSAK REACT FLOW
                    handleChange("tempatTinggal", val);
                  }}
                  className="w-full h-12 rounded-xl border px-4 text-black"
                />
              )}

              {/* Tanggal Lahir */}
              <div className="relative w-full">
                <input
                type="date"
                value={form.tanggalLahir}
                onChange={(e) => handleChange("tanggalLahir", e.target.value)}
                className="w-full h-12 rounded-xl border border-[#BDC9C4] bg-white px-4 text-gray-400 focus:text-black"
              />
              </div>
              

              {/* Alamat Email */}
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Alamat Email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full h-12 rounded-xl border border-[#BDC9C4] bg-white pl-4 pr-12 text-base outline-none focus:border-[#013485] transition-colors"
                  style={{
                    color: form.email ? "#3E4945" : "rgba(62,73,69,0.5)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V4V14V4Z"
                      fill="#013485"
                    />
                  </svg>
                </div>
              </div>

              {/* Kata Sandi */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Kata Sandi"
                  value={form.kataSandi}
                  onChange={(e) => handleChange("kataSandi", e.target.value)}
                  className="w-full h-12 rounded-xl border border-[#BDC9C4] bg-white pl-4 pr-12 text-base outline-none focus:border-[#013485] transition-colors"
                  style={{
                    color: form.kataSandi ? "#3E4945" : "rgba(62,73,69,0.5)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 1C6.36 1 2.42 3.9 1 8C2.42 12.1 6.36 15 11 15C15.64 15 19.58 12.1 21 8C19.58 3.9 15.64 1 11 1ZM11 12.5C8.51 12.5 6.5 10.49 6.5 8C6.5 5.51 8.51 3.5 11 3.5C13.49 3.5 15.5 5.51 15.5 8C15.5 10.49 13.49 12.5 11 12.5ZM11 5.5C9.62 5.5 8.5 6.62 8.5 8C8.5 9.38 9.62 10.5 11 10.5C12.38 10.5 13.5 9.38 13.5 8C13.5 6.62 12.38 5.5 11 5.5Z"
                        fill="#013485"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="20"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.1 10.5L13.65 9.05C13.8 8.26667 13.575 7.53333 12.975 6.85C12.375 6.16667 11.6 5.9 10.65 6.05L9.2 4.6C9.48333 4.46667 9.77083 4.36667 10.0625 4.3C10.3542 4.23333 10.6667 4.2 11 4.2C12.25 4.2 13.3125 4.6375 14.1875 5.5125C15.0625 6.3875 15.5 7.45 15.5 8.7C15.5 9.03333 15.4667 9.34583 15.4 9.6375C15.3333 9.92917 15.2333 10.2167 15.1 10.5ZM18.3 13.65L16.85 12.25C17.4833 11.7667 18.0458 11.2375 18.5375 10.6625C19.0292 10.0875 19.45 9.43333 19.8 8.7C18.9667 7.01667 17.7708 5.67917 16.2125 4.6875C14.6542 3.69583 12.9167 3.2 11 3.2C10.5167 3.2 10.0417 3.23333 9.575 3.3C9.10833 3.36667 8.65 3.46667 8.2 3.6L6.65 2.05C7.33333 1.76667 8.03333 1.55417 8.75 1.4125C9.46667 1.27083 10.2167 1.2 11 1.2C13.5167 1.2 15.7583 1.89583 17.725 3.2875C19.6917 4.67917 21.1167 6.48333 22 8.7C21.6167 9.68333 21.1125 10.5958 20.4875 11.4375C19.8625 12.2792 19.1333 13.0167 18.3 13.65ZM18.8 19.8L14.6 15.65C14.0167 15.8333 13.4292 15.9708 12.8375 16.0625C12.2458 16.1542 11.6333 16.2 11 16.2C8.48333 16.2 6.24167 15.5042 4.275 14.1125C2.30833 12.7208 0.883333 10.9167 0 8.7C0.35 7.81667 0.791667 6.99583 1.325 6.2375C1.85833 5.47917 2.46667 4.8 3.15 4.2L0.4 1.4L1.8 0L20.2 18.4L18.8 19.8ZM4.55 5.6C4.06667 6.03333 3.625 6.50833 3.225 7.025C2.825 7.54167 2.48333 8.1 2.2 8.7C3.03333 10.3833 4.22917 11.7208 5.7875 12.7125C7.34583 13.7042 9.08333 14.2 11 14.2C11.3333 14.2 11.6583 14.1792 11.975 14.1375C12.2917 14.0958 12.6167 14.05 12.95 14L12.05 13.05C11.8667 13.1 11.6917 13.1375 11.525 13.1625C11.3583 13.1875 11.1833 13.2 11 13.2C9.75 13.2 8.6875 12.7625 7.8125 11.8875C6.9375 11.0125 6.5 9.95 6.5 8.7C6.5 8.51667 6.5125 8.34167 6.5375 8.175C6.5625 8.00833 6.6 7.83333 6.65 7.65L4.55 5.6Z"
                        fill="#013485"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Daftar Button */}
              <button
                type="button"
                onClick={handleRegister}
                className="w-full h-14 flex items-center justify-center rounded-2xl text-base text-white"
                style={{
                  background: "#013485",
                  boxShadow:
                    "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: "24px",
                }}
              >
                Daftar
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="flex justify-center">
            <p className="text-base text-center" style={{ lineHeight: "24px" }}>
              <span style={{ color: "#3E4945" }}>Sudah punya akun? </span>
              <Link to="/" className="font-normal" style={{ color: "#1D59BB" }}>
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
