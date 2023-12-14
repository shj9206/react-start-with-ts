import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/store/interface/storeInterfaces.ts";

interface AuthState {
  accessToken: string | null;
  email: string | null;
  region: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  email: null,
  region: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserInfomation: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
  },
});

export const { setToken, setRegion, setUserInfomation } = authSlice.actions;

export default authSlice.reducer;
