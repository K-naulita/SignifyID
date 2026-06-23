import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEffect } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });

    if (error) {
      alert(error.message);
    }
  } catch (error) {
    alert(error.message);
  }
};
  
const handleLogin = async () => {
  if (!email || !password) {
    alert("Email dan password wajib diisi");
    return;
  }

  try {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    console.log("LOGIN SUCCESS:", data.user);

    navigate("/dashboard");

  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  const syncUser = async () => {
    const { data: authData } = await supabase.auth.getUser();

    const user = authData.user;
    if (!user) return;

    // cek apakah sudah ada di tabel users
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    // kalau belum ada → insert otomatis
    if (!data) {
      await supabase.from("users").insert([
        {
          id: user.id,
          nama_lengkap: user.user_metadata?.full_name || "User",
          email: user.email,
        },
      ]);
    }
  };

  syncUser();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-slate-50 to-white flex justify-center">
      <div className="w-[390px] p-6">

        {/* LOGO */}
        <div className="flex flex-col items-center mt-12">
          <img
            src="/logo.png"
            alt="SignifyID Logo"
            className="w-28 h-28 object-contain"
          />

          <h1 className="text-2xl font-bold mt-6">
            Selamat Datang Kembali!
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Masuk untuk melanjutkan aplikasi SignifyID
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="mt-8">
          <div className="w-full rounded-[32px] bg-white px-6 pt-6 pb-10 shadow-sm">

            <div className="flex flex-col gap-4">

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#E5E7EB] px-4 py-4 outline-none focus:border-[#023585]"
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#E5E7EB] px-4 py-4 pr-12 outline-none focus:border-[#023585]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  👁
                </button>
              </div>

              {/* OPTIONS */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  Ingat saya
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[#023585] font-medium"
                >
                  Lupa Password?
                </Link>
              </div>

              {/* BUTTON LOGIN */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-4 rounded-2xl text-white font-bold"
                style={{
                  background:
                    "linear-gradient(90deg, #FFF8CE 0%, #1D59BB 81.25%)",
                  boxShadow: "0 10px 15px -3px rgba(60,131,233,0.41)",
                }}
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>

            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-center">

          <p className="text-sm">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-[#023585] font-semibold"
            >
              Daftar Sekarang
            </Link>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-xs font-bold text-gray-400">
              ATAU
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* GOOGLE LOGIN (BELUM CONNECT) */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-gray-300 bg-white hover:shadow-md transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5 h-5"
              alt="google"
            />

            <span className="font-semibold text-gray-700">
              Masuk dengan Google
            </span>
          </button>
          

        </div>
      </div>
    </div>
  );
}