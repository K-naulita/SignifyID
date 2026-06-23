import { useState } from "react";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabaseClient";
import { useEffect } from "react";
export default function Profile() {
  const navigate = useNavigate();

  const [gps, setGps] = useState(true);
  const [notif, setNotif] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
  const getProfile = async () => {
    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    if (!user) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile({
        name: data.nama_lengkap,
        email: data.email,
        phone: data.telepon || "",
      });
    }
  };

  getProfile();
}, []);

  const [editOpen, setEditOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex justify-center">

      <div className="w-full max-w-[430px] min-h-screen pb-24">

        {/* ================= HEADER ================= */}
        <div className="m-5 rounded-3xl p-5 text-white shadow-lg"
style={{
  background: "linear-gradient(180deg, #FEF3B3 0%, #1849A6 55%, #010451 100%)"
}}>

          <div className="flex items-center gap-4">

            {/* AVATAR CLICK EDIT */}
            <div
              onClick={() => setEditOpen(true)}
              className="cursor-pointer"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${profile.name}&background=4F46E5&color=fff`}
                className="w-16 h-16 rounded-full"
                alt="avatar"
              />
            </div>

            <div>
              <h2 className="font-bold text-lg">{profile.name}</h2>

              <div className="text-xs bg-white/20 px-2 py-1 rounded-full w-fit mt-1">
                🪙 0 Koin
              </div>
            </div>

          </div>

          {/* INFO */}
            <div className="mt-4 space-y-3 text-sm">

              {/* EMAIL */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  📧
                </div>

                <div>
                  <p className="text-xs text-white/70">EMAIL</p>
                  <p className="font-semibold text-white">
                    {profile.email}
                  </p>
                </div>

              </div>

              {/* TELEPON */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  📞
                </div>

                <div>
                  <p className="text-xs text-white/70">TELEPON</p>
                  <p className="font-semibold text-white">
                    {profile.phone && profile.phone !== ""
                      ? profile.phone
                      : "Tidak ada No Telepon"}
                  </p>
                </div>

              </div>

          </div>
        </div>

        {/* ================= MENU ================= */}
        <div className="px-5">

          <h3 className="text-sm font-semibold mb-3">Akun</h3>

          <div className="space-y-3">

            <MenuItem
              icon="👤"
              title="Edit Profil"
              desc="Ubah nama & data akun"
              onClick={() => setEditOpen(true)}
            />

            <MenuItem
              icon="🎧"
              title="Hubungi SignifyID"
              desc="Bantuan & support"
              onClick={() => alert("Support: signifyid@email.com")}
            />
          </div>

          <h3 className="text-sm font-semibold mt-6 mb-3">Lainnya</h3>

          <div className="space-y-3">

            <ToggleItem
              icon="📍"
              title="GPS"
              desc="Berbagi lokasi otomatis"
              value={gps}
              setValue={() => {
                setGps(!gps);
              }}
            />

            <ToggleItem
              icon="🔔"
              title="Notifikasi"
              desc="Kelola pemberitahuan"
              value={notif}
              setValue={() => {
                setNotif(!notif);
                
              }}
            />

            <MenuItem
              icon="📄"
              title="Ketentuan Layanan"
              desc="Syarat & aturan penggunaan"
              onClick={() => navigate("/terms")}
            />

            <MenuItem
              icon="🛡️"
              title="Kebijakan Privasi"
              desc="Keamanan data pengguna"
              onClick={() => navigate("/privacy")}
            />

            {/* LOGOUT */}
            <div
              onClick={() => setLogoutOpen(true)}
              className="p-4 bg-red-50 rounded-xl flex justify-between items-center mt-4 cursor-pointer"
            >
              <div>
                <p className="text-red-600 font-semibold">Keluar</p>
                <p className="text-xs text-red-400">Logout dari akun</p>
              </div>
              <span className="text-red-500">⎋</span>
            </div>

          </div>
        </div>

        <BottomNav />
      </div>

      {/* ================= MODAL EDIT PROFILE ================= */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white w-[85%] p-5 rounded-2xl">

            <h2 className="font-bold mb-3">Edit Profil</h2>

            <input
              className="w-full border p-2 mb-2 rounded"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Nomor HP"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />

            <button
              onClick={() => setEditOpen(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-xl"
            >
              Simpan
            </button>

          </div>

        </div>
      )}

      {/* ================= LOGOUT MODAL ================= */}
      {logoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center">

          <div className="bg-white w-full sm:w-[400px] p-5 rounded-t-2xl sm:rounded-2xl text-center">

            <p className="font-semibold mb-3">
              Yakin ingin keluar?
            </p>

            <div className="flex gap-2">

              <button
                onClick={() => setLogoutOpen(false)}
                className="flex-1 bg-gray-200 py-2 rounded-xl"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  navigate("/");
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl"
              >
                Keluar
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* ================= COMPONENT ================= */

function MenuItem({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      </div>

      <span className="text-slate-400">›</span>
    </div>
  );
}

function ToggleItem({ icon, title, desc, value, setValue }) {
  return (
    <div className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      </div>

      <button
        onClick={setValue}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
          value ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>

    </div>
  );
}