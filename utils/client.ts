import { useUserStore } from "@/app/_zustand/userInfo";
import axios from "axios";

const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;

export const baseUrl = `${backendUri}/api`;

const getUserToken = () => {
 return useUserStore.getState().token;
};

const axiosBaseUrl = axios.create({
 baseURL: baseUrl,
 headers: {
  Authorization: `Bearer ${getUserToken()}`,
 },
});

export const apiClient = axiosBaseUrl;
