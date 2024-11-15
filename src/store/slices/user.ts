import type { StateCreator } from "zustand";

type State = {
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
  cTgId: string;
};

type Actions = {
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: any) => void;
  logoutUser: () => void;
  setCTgId: (tgId: string) => void;
};

export interface UserSlice extends State, Actions {}

const initialState: State = {
  user: null,
  accessToken: null,
  refreshToken: null,
  cTgId: "",
};

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  ...initialState,
  setUser: (user) => set({ user: user }),
  logoutUser: () => set({ accessToken: null, refreshToken: null, user: null }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  setCTgId: (tgId) => set(() => ({ cTgId: tgId })),
});
