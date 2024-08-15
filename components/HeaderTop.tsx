// *********************
// Role of the component: Topbar of the header
// Name of the component: HeaderTop.tsx
// Developer: Omar Juma
// Version: 1.0
// Component call: <HeaderTop />
// Input parameters: no input parameters
// Output: topbar with phone, email and login and register links
// *********************

"use client";
import { useUserStore } from "@/app/_zustand/userInfo";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";

const HeaderTop = () => {
  const {id, token, email, clearUserInfo, setUserInfo } = useUserStore();
  console.log(id, token, email)
  useEffect(()=>{
    if(!email && token &&id ){
      const execute = async () => {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserInfo(data)
      }
        execute()
    }
  }
  
  ,[])

  const handleLogout = () => {
    try {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      clearUserInfo();
      toast.success("Logout successful!");
      console.log("Local storage cleared and user info reset.");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };  return (
    <div className="h-10 text-white bg-blue-500 max-lg:px-5 max-lg:h-16 max-[573px]:px-0">
      <div className="flex justify-between h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-w-screen-2xl mx-auto px-12 max-[573px]:px-0">
        <ul className="flex items-center h-full gap-x-5 max-sm:text-sm max-sm:gap-y- max-sm:flex-col max-w">
          <li className="flex items-center gap-x-2 font-semibold">
            <FaHeadphones className="text-white" />
            <span>+381 61 123 321</span>
          </li>
          <li className="flex items-center gap-x-2 font-semibold">
            <FaRegEnvelope className="text-white text-xl" />
            <span>biggestSupport@gmail.com</span>
          </li>
        </ul>
        <ul className="flex items-center gap-x-5 h-full max-sm:text-sm max-sm:gap-x-2 font-semibold">
          {!id ? ( 
          <>
          <li className="flex items-center">
            <Link href="/login" className="flex items-center gap-x-2 font-semibold">
              <FaRegUser className="text-white" />
              <span>Login</span>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/register" className="flex items-center gap-x-2 font-semibold">
              <FaRegUser className="text-white" />
              <span>Register</span>
            </Link>
          </li>
          </>
          ) :  (<>
          <span className="ml-10 text-base">{email}</span>
          <li className="flex items-center">
            <button onClick={() => handleLogout()} className="flex items-center gap-x-2 font-semibold">
              <FaRegUser className="text-white" />
              <span>Log out</span>
            </button>
          </li>
          </>)}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
