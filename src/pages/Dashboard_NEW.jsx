import {
  Mic,
  GraduationCap,
  Gamepad2,
  BookOpen,
  ArrowRight,
  Languages,
  Newspaper,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { id: "translate", label: "Translate Me", icon: Languages, path: "/translate" },
  { id: "transcribe", label: "Transcribe Me", icon: Mic, path: "/transcribe" },
  { id: "learn", label: "Learn Me", icon: GraduationCap, path: "/learn" },
  { id: "play", label: "Play Me", icon: Gamepad2, path: "/play" },
  { id: "artikel", label: "Artikel", icon: Newspaper, path: "/artikel" },
  { id: "komunitas", label: "Komunitas", icon: Users, path: "/komunitas" },
];

export default function Dashboard() {
const [name, setName] = useState("User");
const navigate = useNavigate();
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
return (

<div className="
min-h-screen 
bg-[#F5F7FB]
flex 
justify-center
">


<div className="
w-full
max-w-[430px]
min-h-screen
bg-[#F5F7FB]
relative
pb-24
">


<Navbar />



{/* HERO */}

<div className="
relative
mx-0
h-[170px]
overflow-hidden
px-5
pt-8
"
style={{
background:
"linear-gradient(105deg, #1E5ABA 12.13%, rgba(254, 243, 179, 0.87) 86.66%)"
}}
>


<h1 className="
text-white
font-bold
text-2xl
">
Hi, {name}!
</h1>


<p className="
text-white
text-sm
mt-1
w-[200px]
">
Yuk jelajahi Dunia Tuli
bersama Signey!
</p>



<img
src="/animasi2.png"
className="
absolute
right-[-1px]
bottom-1
w-[180px]
h-[180px]
object-contain
"
alt="Signey"
/>


</div>





{/* MENU */}

<div className="
relative
px-5
-mt-8
pt-8
pb-3
bg-[#F5F7FB]
rounded-t-[45px]
grid
grid-cols-2
gap-3
">

{menuItems.map((item) => {
  const Icon = item.icon;
  return (
    <MenuCard
      key={item.id}
      icon={<Icon />}
      label={item.label}
      onClick={() => navigate(item.path)}
    />
  );
})}

</div>







{/* DICTIONARY */}

<div className="px-5 -mt-2">

  <div className="
    bg-white
    rounded-xl
    p-4
    flex
    items-center
    justify-between
    shadow-sm
  ">

    <div className="flex gap-3 items-center">

      <div className="
        w-10
        h-10
        rounded-lg
        bg-yellow-100
        flex
        items-center
        justify-center
      ">

        <BookOpen
          className="text-yellow-500"
        />

      </div>


      <div>

        <p className="font-semibold text-sm">
          Dictionary
        </p>

        <p className="text-xs text-slate-400">
          Browse sign language signs
        </p>

      </div>

    </div>


    <span className="
      text-[10px]
      bg-orange-100
      text-orange-500
      px-2
      py-1
      rounded-full
    ">
      OFFLINE
    </span>


  </div>

</div>





{/* EMERGENCY */}

<div className="px-5 mt-3">

<Link
to="/emergency"
className="
w-full
bg-red-600
rounded-xl
p-4
text-white
flex
items-center
justify-between
shadow-md
active:scale-95
transition
"
>


<div className="flex gap-3 items-center">


<div className="
w-10
h-10
rounded-full
bg-white/20
flex
items-center
justify-center
">

✱

</div>



<div className="text-left">

<p className="font-semibold text-sm">
Emergency Call
</p>


<p className="text-xs">
Get immediate communication help
</p>


</div>


</div>



<ArrowRight size={20}/>


</Link>

</div>


{/* INFO */}

<div className="px-5 mt-6">


<div className="
flex
justify-between
items-center
">


<div>

<h2 className="font-semibold text-sm">
Informasi Terkini
</h2>


<p className="
text-xs
text-slate-400
">
Update terbaru dari komunitas
</p>


</div>



<span className="
text-xs
bg-yellow-100
text-yellow-600
rounded-full
px-3
py-1
">

Lihat Semua

</span>


</div>





<div className="
flex
gap-3
overflow-x-auto
mt-3
scrollbar-hide
">



<NewsCard
image="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=400"
title="Tips Berkomunikasi..."
desc="Pahami etika dasar saat berinteraksi dengan teman Tuli agar percakapan"
/>



<NewsCard
image="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400"
title="Event Bahasa Isyarat"
desc="Ikuti pelatihan bahasa isyarat dasar bersama komunitas"
/>



</div>


</div>





<BottomNav/>


</div>


</div>


)

}




function MenuCard({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        bg-white
        rounded-2xl
        h-[85px]
        shadow-sm
        flex
        flex-col
        items-center
        justify-center
        gap-2
        active:scale-95
        cursor-pointer
      "
    >
      <div className="
        w-11
        h-11
        rounded-full
        bg-blue-100
        flex
        items-center
        justify-center
        text-blue-600
      ">
        {icon}
      </div>

      <p className="text-xs font-medium">
        {label}
      </p>
    </div>
  );
}





function NewsCard({image,title,desc}){

return (

<div className="
min-w-[200px]
bg-white
rounded-xl
p-3
shadow-sm
">


<div className="
h-24
rounded-lg
overflow-hidden
">

<img
src={image}
className="
w-full
h-full
object-cover
"
/>


</div>



<p className="
text-sm
font-semibold
mt-2
">

{title}

</p>


<p className="
text-xs
text-slate-500
mt-1
">

{desc}

</p>


<p className="
text-xs
text-blue-600
mt-2
">

Baca Selengkapnya →

</p>



</div>


)

}
