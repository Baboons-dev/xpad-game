import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "@/redux/store";

type ClientState = {
  clients:[]
};

const initialState: ClientState = {
  clients: []
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setClients: (state:ClientState, action: PayloadAction<any>) => {
      state.clients = action.payload;
      return state;
    },

  },
});
export const {
  setClients
} = appSlice.actions;
export const selectApp = (state: RootState) => state.app;
export default appSlice.reducer;
