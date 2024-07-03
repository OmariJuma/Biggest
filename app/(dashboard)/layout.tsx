"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Layout({ children }) {
  const [isClientCodeReady, setIsClientCodeReady] = useState(false);
  const [role, setRole] = useState("user");
  const [id, setId] = useState(null);

  useEffect(() => {
    setIsClientCodeReady(true);
    setId(localStorage.getItem("id"));
 
  }, []); // Empty dependency array ensures it runs only once on mount
  if(isClientCodeReady){
    const execute= async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data)
      setRole(data.role);
    };
    execute()
  }
  return (
    <div>
      {/* Server-side code can be rendered here */}
      {isClientCodeReady && (
        <div>
          {/* Use optional chaining for potential initial null values */}
          <h2>Your role is: {role?.toUpperCase()}</h2>
          <h2>Your ID is: {id?.toString()}</h2>

          {/* Example conditional rendering based on role */}
          {role === "admin" && <p>You have admin privileges.</p>}

          {/* Additional logic based on role and ID */}
          {children}
        </div>
      )}
    </div>
  );
}
