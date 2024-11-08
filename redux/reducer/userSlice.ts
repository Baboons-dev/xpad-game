import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';


import { RootState } from '../store';

type UserState = {
  user: any;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  token: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state:UserState) => {
      console.warn('gooooonna logout');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state = initialState;
      return state;
    },
    updateToken: (state:UserState, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      return state;
    },
    login(state, action: PayloadAction<UserState>) {
      // console.warn('gooooonna login with payload', action.payload);
      state = action.payload;
      return state;
    },
    updateUserState: (state, action: PayloadAction<any>) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setUser: (state:UserState, action: PayloadAction<UserState['user']>) => {
      if (!isEqual(state.user, action.payload)) {
        state.user = action.payload;
      }
    },

  },
});

export const {
  login,
  logout,
  updateUserState,
  setUser
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
