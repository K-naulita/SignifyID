import { NavLink } from "react-router-dom";
import {
  Home,
  Languages,
  BookOpen,
  AlertCircle,
  User
} from "lucide-react";


const menus = [
  {
    name:"Beranda",
    path:"/dashboard",
    icon:Home
  },
  {
    name:"Terjemahkan",
    path:"/translate",
    icon:Languages
  },
  {
    name:"Kamus",
    path:"/dictionary",
    icon:BookOpen
  },
  {
    name:"Darurat",
    path:"/emergency",
    icon:AlertCircle
  },
  {
    name:"Profil",
    path:"/profile",
    icon:User
  },
];



export default function BottomNav(){


return (

<div className="
fixed
bottom-0
left-1/2
-translate-x-1/2
w-full
max-w-[430px]
bg-white
h-[72px]
rounded-t-2xl
shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
z-50
">


<div className="
h-full
flex
items-center
justify-around
px-3
">


{
menus.map((item)=>{


const Icon=item.icon;


return (

<NavLink

key={item.name}

to={item.path}

className={({isActive})=>`

flex
flex-col
items-center
justify-center
gap-1
w-[55px]
h-[52px]
rounded-xl
transition

${
isActive
?
"text-blue-600"
:
"text-slate-400"
}

`}

>


{({isActive})=>(

<>


<div className={`
w-9
h-7
rounded-full
flex
items-center
justify-center

${
isActive
?
"bg-blue-100"
:
"bg-transparent"
}

`}>

<Icon
size={18}
strokeWidth={2}
/>

</div>



<span className="
text-[10px]
font-medium
">

{item.name}

</span>



</>

)}


</NavLink>


)

})


}



</div>


</div>

)

}