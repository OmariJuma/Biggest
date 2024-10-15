"use client";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "../../SearchInput";
import Link from "next/link";
import { FaBell } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import CartElement from "../../CartElement";
import HeartElement from "../../HeartElement";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { useUserStore } from "@/app/_zustand/userInfo";
import axios from "axios";
import { removeCookie } from "@/lib/removeCookie";
import { useRouter } from "next/navigation";
import { apiClient } from "@/utils/client";

const Header = () => {
 const pathname = usePathname();
 const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
 const [id, setId] = useState<string | null>(null);
 const [dropdownVisible, setDropdownVisible] = useState(false);
 const clearUserInfo = useUserStore((state) => state.clearUserInfo);
 const router = useRouter();

 useEffect(() => {
  setId(localStorage?.getItem("id"));
 }, []);

 const handleLogout = () => {
  try {
   localStorage.removeItem("id");
   localStorage.removeItem("token");
   removeCookie("token");
   clearUserInfo();
   toast.success("Logout successful!");
   console.log("Local storage cleared and user info reset.");
   router.replace("/");
  } catch (error) {
   console.error("Error during logout:", error);
   toast.error("Logout failed. Please try again.");
  }
 };

 const getWishlistByUserId = async (id: string) => {
  const response = await apiClient.get("/wishlist/${id}");

  const wishlist = await response.data;
  const productArray: {
   id: string;
   title: string;
   price: number;
   image: string;
   slug: string;
   stockAvailabillity: number;
  }[] = [];

  wishlist.map((item: any) =>
   productArray.push({
    id: item?.product?.id,
    title: item?.product?.title,
    price: item?.product?.price,
    image: item?.product?.mainImage,
    slug: item?.product?.slug,
    stockAvailabillity: item?.product?.inStock,
   })
  );

  setWishlist(productArray);
 };

 const getUser = async () => {
  if (id) {
   const response = await apiClient.get(`/users/${localStorage.getItem("id")}`);

   if (response.data) {
    getWishlistByUserId(response.data?.id);
   }
  }
 };

 useEffect(() => {
  getUser();
 }, [wishlist.length, id]);

 return (
  <header className="bg-white">
   <HeaderTop />
   {pathname.startsWith("/admin") === false && (
    <div className="h-auto bg-white flex flex-col sm:flex-row gap-2 py-1 sm:py-4  items-center justify-between max-[1320px]:px-16 max-md:px-6 max-lg:flex-col max-lg:gap-y-7 max-lg:justify-center max-lg:h-60 max-w-screen-2xl mx-auto ">
     <Link href="/">
      <Image
       src="/logo v1.svg"
       width={300}
       height={300}
       alt="Biggest logo"
       className="relative z-0 right-5 max-[1023px]:w-56"
      />
     </Link>

     <div className="flex-1 flex flex-col sm:flex-row gap-8 items-center">
      <SearchInput />
      <div className="flex flex-row gap-x-10">
       <HeartElement wishQuantity={wishQuantity} />
       <CartElement />
      </div>
     </div>
    </div>
   )}
   {pathname.startsWith("/admin") === true && (
    <div className="flex justify-between h-32 bg-white items-center px-16 max-[1320px]:px-10  max-w-screen-2xl mx-auto max-[400px]:px-5">
     <Link href="/">
      <Image
       src="/logo v1.svg"
       width={130}
       height={130}
       alt="Biggest logo"
       className="w-56 h-auto"
      />
     </Link>
     <div className="flex gap-x-5 items-center">
      <FaBell className="text-xl" />
      <div className="relative">
       <div
        tabIndex={0}
        role="button"
        className="w-10"
        onClick={() => setDropdownVisible(!dropdownVisible)}
       >
        <RxHamburgerMenu
         width={30}
         height={30}
         className="w-full h-full text-xl"
        />
       </div>
       {dropdownVisible && (
        <ul className="absolute right-0 mt-2 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
         <li>
          <Link href="/admin">Dashboard</Link>
         </li>
         <li>
          <a>Profile</a>
         </li>
         <li onClick={handleLogout}>
          <a href="#">Logout</a>
         </li>
        </ul>
       )}
      </div>
     </div>
    </div>
   )}
  </header>
 );
};

export default Header;
