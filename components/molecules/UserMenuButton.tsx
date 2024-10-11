"use client";

import { useUserStore } from "@/app/_zustand/userInfo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser, FaRegCircleUser } from "react-icons/fa6";

import { removeCookie } from "@/lib/removeCookie";
import { apiClient } from "@/utils/client";

export default function UserMenuButton() {
 const {
  clearUserInfo,
  setUserInfo,
  email,
  id: storeId,
  token: storeToken,
 } = useUserStore();
 const [id, setId] = useState<string>(storeId);
 const [token, setToken] = useState<string | null>(storeToken);
 const pathname = usePathname();

 useEffect(() => {
  if (!storeId || !storeToken) {
   const storedId = localStorage.getItem("id");
   const storedToken = localStorage.getItem("token");
   setId(storedId);
   setToken(storedToken);
  }
 }, [id, token, storeId, storeToken]);

 useEffect(() => {
  if (token && id && !email) {
   const fetchUserInfo = async () => {
    try {
     const { data } = await apiClient.get(`/users/${id}`);
     setUserInfo(data);
    } catch (error) {
     console.error(error);
     toast.error("Error during getting user info. Please refresh browser.");
    }
   };
   fetchUserInfo();
  }
 }, [id, token, setUserInfo, email]);

 const handleLogout = () => {
  try {
   localStorage.removeItem("id");
   localStorage.removeItem("token");
   clearUserInfo();
   removeCookie("token");
   toast.success("Logout successful!");
  } catch (error) {
   toast.error("Logout failed. Please try again.");
  }
 };

 return (
  <>
   <ul className="hidden sm:flex items-center gap-x-5 h-full max-sm:text-sm max-sm:gap-x-2 font-semibold">
    {!storeId || !email ? (
     <>
      <li className="flex items-center">
       <Link href="/login" className="flex items-center gap-x-2 font-semibold">
        <FaRegUser className="text-white" />
        <span>Login</span>
       </Link>
      </li>
      <li className="flex items-center">
       <Link
        href="/register"
        className="flex items-center gap-x-2 font-semibold"
       >
        <FaRegUser className="text-white" />
        <span>Register</span>
       </Link>
      </li>
     </>
    ) : (
     <>
      <span className="ml-10 text-base">{email}</span>
      {pathname.startsWith("/admin") === false && (
       <li className="flex items-center">
        <button
         onClick={handleLogout}
         className="flex items-center gap-x-2 font-semibold"
        >
         <FaRegUser className="text-white" />
         <span>Log out</span>
        </button>
       </li>
      )}
     </>
    )}
   </ul>

   <div className="dropdown dropdown-end sm:hidden ">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
     <FaRegCircleUser title="anonymous uer" size={28} />
    </div>
    <ul
     tabIndex={0}
     className="menu menu-sm dropdown-content text-left bg-blue-500 rounded-box z-[1] mt-3 p-2 shadow"
    >
     {!storeId || !email ? (
      <>
       <li className="flex items-center ">
        <Link href="/login" className=" font-semibold">
         <span>Login</span>
        </Link>
       </li>
       <li className="flex items-center">
        <Link href="/register" className=" font-semibold">
         <span>Register</span>
        </Link>
       </li>
      </>
     ) : (
      <>
       <span className="ml-10 text-base">{email}</span>
       {pathname.startsWith("/admin") === false && (
        <li className="flex items-center">
         <button onClick={handleLogout} className=" font-semibold">
          <span>Log out</span>
         </button>
        </li>
       )}
      </>
     )}
    </ul>
   </div>
  </>
 );
}
