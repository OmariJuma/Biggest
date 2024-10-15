"use client";
import React from "react";
import { FaHeadphones, FaRegEnvelope } from "react-icons/fa6";
import UserMenuButton from "../../molecules/UserMenuButton";

const HeaderTop = () => {
 return (
  <>
   <div className="py-1.5 text-white bg-blue-500">
    <div className="flex items-center justify-between px-8 sm:py-1">
     <BiggestContacts />
     <UserMenuButton />
    </div>
   </div>
  </>
 );
};

const BiggestContacts = () => {
 return (
  <div className="drawer">
   <ul className="hidden sm:flex flex-col sm:flex-row items-center  gap-x-5 max-sm:text-sm  max-sm:flex-col max-w">
    <li className="flex items-center gap-x-2 font-semibold">
     <FaHeadphones className="text-white" />
     <span>+381 61 123 321</span>
    </li>
    <li className="flex items-center gap-x-2 font-semibold">
     <FaRegEnvelope className="text-white text-xl" />
     <span>biggestSupport@gmail.com</span>
    </li>
   </ul>

   <div className="sm:hidden">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="flex-none drawer-content">
     <button className="btn btn-square btn-ghost drawer-button">
      <label htmlFor="my-drawer" className=" drawer-button">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth="2"
         d="M4 6h16M4 12h16M4 18h16"
        ></path>
       </svg>
      </label>
     </button>
    </div>

    <div className="drawer-side z-10">
     <label
      htmlFor="my-drawer"
      aria-label="close sidebar"
      className="drawer-overlay"
     ></label>
     <ul className="z-10 menu bg-base-200 text-base-content min-h-full w-[70vmin] p-4">
      {/* Sidebar content here */}
      <li className="flex items-center gap-x-2 font-semibold">
       <FaHeadphones className="text-white" size={24} />
       <span>+381 61 123 321</span>
      </li>
      <li className="flex items-center gap-x-2 font-semibold">
       <FaRegEnvelope className="text-white text-xl" />
       <span>biggestSupport@gmail.com</span>
      </li>
     </ul>
    </div>
   </div>
  </div>
 );
};

export default HeaderTop;
