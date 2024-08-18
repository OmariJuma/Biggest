"use client";
import { useUserStore } from "@/app/_zustand/userInfo";
import { removeCookie } from "@/lib/removeCookie";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeadphones, FaRegEnvelope, FaRegUser } from "react-icons/fa6";

const HeaderTop = () => {
  const { clearUserInfo, setUserInfo, email, id: storeId, token: storeToken } = useUserStore();
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
  }, [id, token]);

  useEffect(() => {
    if (token && id && !email) {
      const fetchUserInfo = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(data);
        } catch (error) {
          toast.error("Error during getting user info. Please refresh browser.");
        }
      };
      fetchUserInfo();
    }
  }, [id, token, setUserInfo]);

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
          {(!storeId || !email )? (
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
          ) : (
            <>
              <span className="ml-10 text-base">{email}</span>
              {pathname.startsWith("/admin") === false && (<li className="flex items-center">
                <button onClick={handleLogout} className="flex items-center gap-x-2 font-semibold">
                  <FaRegUser className="text-white" />
                  <span>Log out</span>
                </button>
              </li>)}
              
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;