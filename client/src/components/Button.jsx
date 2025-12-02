import React from 'react'
import {useLocation, useNavigate } from "react-router-dom";

 const Button = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

  let label = "Button";

  if (pathname === "/") {
    label = "Login";
  } else {
    label = "Explore";
  };

    const handleClick = () => {
    const route = "/" + label.toLowerCase().replace(" ", "");
    navigate(route);''
    console.log('butoon cliked');
    
  };

  return (
    <>
    <button onClick={handleClick} className="
  relative px-6 py-2 rounded-xl font-semibold text-amber-200
  bg-blend-hard-light border 
  transition duration-300 group
  hover:scale-105 active:scale-95
">
  <span className="
    absolute inset-0 rounded-xl bg-linear-to-r
    from-green-300 via-orange-400 to-green-300
    blur-lg opacity-0 group-hover:opacity-20
    transition duration-500
  "></span>

  <span className="relative flex items-center gap-2">
    {label}
    <svg className="w-5 h-5 group-hover:translate-x-1 transition">
      <path fill="currentColor" d="M16.2 11L10.8 5.6l1.4-1.4L20 12l-7.8 7.8-1.4-1.4 5.4-5.4H4v-2z"/>
    </svg>
  </span>
</button>
</>
  )
}
export default Button