import { create } from "zustand";

type user = {
  id: string | undefined;
  email: string | undefined;
  role: string | undefined;
  firstName: string | undefined;
  secondName: string | undefined;
  token: string | undefined;
  clearUserInfo: () => void;
  setUserInfo: (userInfo: {
    id: string;
    email: string;
    role: string;
    token: string;
    firstName: string;
    secondName: string;
  }) => void;
};

export const useUserStore = create<user>((set) => ({
  id: localStorage?.getItem("id") ?? undefined,
  email: undefined,
  firstName: undefined,
  secondName: undefined,
  role: undefined,
  token: localStorage?.getItem("token") ?? undefined,
  clearUserInfo: () =>
    set({
      id: undefined,
      email: undefined,
      role: undefined,
      firstName: undefined,
      secondName: undefined,
      token:undefined
    }),
  setUserInfo: (userInfo: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    secondName: string;
    token: string;
  }) => set((state) => ({ ...state, ...userInfo })),
}));
