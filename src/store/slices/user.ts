
import type { StateCreator } from 'zustand';

type State = {
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
};

type Actions = {
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: any) => void;
  logoutUser: () => void;
};

export interface UserSlice extends State, Actions {
}

const initialState: State = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  ...initialState,
  setUser: (user) => set({ user:user }),
  logoutUser: () => set(initialState),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken })
});
