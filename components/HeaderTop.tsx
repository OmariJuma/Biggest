"use client";
import React from "react";
import { FaHeadphones, FaRegEnvelope } from "react-icons/fa6";
import UserMenuButton from "./molecules/UserMenuButton";

const HeaderTop = () => {
 return (
  <div className="h-10 text-white bg-blue-500 max-lg:px-5 max-lg:h-16 max-[573px]:px-0">
   <div className="flex justify-between h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-w-screen-2xl mx-auto px-12 max-[573px]:px-0">
    <ul className="flex flex-col sm:flex-row items-center h-full gap-x-5 max-sm:text-sm max-sm:gap-y- max-sm:flex-col max-w">
     <li className="flex items-center gap-x-2 font-semibold">
      <FaHeadphones className="text-white" />
      <span>+381 61 123 321</span>
     </li>
     <li className="flex items-center gap-x-2 font-semibold">
      <FaRegEnvelope className="text-white text-xl" />
      <span>biggestSupport@gmail.com</span>
     </li>
    </ul>
    <UserMenuButton />
   </div>
  </div>
 );
};

export default HeaderTop;
