import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  email: string | null;
  region: string | null;
  showMenuCheck: number;
}

const initialState: AuthState = {
  accessToken: null,
  email: null,
  region: null,
  showMenuCheck: 1,
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
    setShowMenuCheck: (state, action) => {
      state.showMenuCheck = action.payload;
    },
  },
});

export const { setToken, setRegion, setUserInfomation, setShowMenuCheck } =
  authSlice.actions;

export default authSlice.reducer;
