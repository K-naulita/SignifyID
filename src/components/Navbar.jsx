import logo from "/Logo kotak.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data: userData } = await supabase.auth.getUser();

      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("nama_lengkap")
        .eq("id", user.id)
        .single();

      if (data) {
        setName(data.nama_lengkap);
      }
    };

    getUser();
  }, []);

  const showBack = location.pathname !== "/dashboard";

  return (
    <div className="
      h-[50px]
      w-full
      bg-white
      flex
      items-center
      justify-between
      px-5
    ">

      {/* KIRI: BACK + LOGO SEJAJAR */}
      <div className="flex items-center gap-3">

        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="text-xl font-bold text-slate-700"
          >
            {"<"}
          </button>
        )}

        <Link to="/dashboard">
          <img
            src={logo}
            alt="logo"
            className="w-[90px] h-[90px] object-contain mt-2"
          />
        </Link>

      </div>

      {/* PROFILE */}
      <Link to="/profile">
        <div className="
          w-14
          h-12
          rounded-full
          flex
          items-center
          justify-center
          text-slate-700
          cursor-pointer
          hover:text-[#023585]
          transition
        ">
          {name ? (
            <img
              src={`https://ui-avatars.com/api/?name=${name}&background=4F46E5&color=fff`}
              className="w-9 h-9 rounded-full"
            />
          ) : (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="10" r="3" />
              <path d="M6.5 19c1.5-3 3.5-4 5.5-4s4 1 5.5 4" />
            </svg>
          )}
        </div>
      </Link>

    </div>
  );
}