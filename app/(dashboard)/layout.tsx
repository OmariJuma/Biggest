"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const [isClientCodeReady, setIsClientCodeReady] = useState(false);
  const [role, setRole] = useState("user");
  const [id, setId] = useState(null);

  useEffect(() => {
    setIsClientCodeReady(true);
    setId(localStorage.getItem("id"));
  }, []); // Empty dependency array ensures it runs only once on mount

  if (isClientCodeReady) {
    const execute = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRole(data.role);
    };
    execute();
  }
  return (
    <div>
      {/* Server-side code can be rendered here */}
      {isClientCodeReady && role === "admin" && <>{children}</>}
      {isClientCodeReady && role === "user" && redirect("/")}
    </div>
  );
}
