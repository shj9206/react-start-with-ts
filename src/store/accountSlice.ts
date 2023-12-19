import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from ".";

interface AccountState {
  accountVisible: boolean | null;
  passwordVisible: boolean | null;
  historyVisible: boolean | null;
  changeEmailVisible: boolean | null;
  changeEmailAddress: boolean | null;
}

const initialState: AccountState = {
  accountVisible: false,
  passwordVisible: false,
  historyVisible: false,
  changeEmailVisible: false,
  changeEmailAddress: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountVisible: (state, action: PayloadAction<boolean>) => {
      state.accountVisible = action.payload;
    },
    setPasswordVisible: (state, action: PayloadAction<boolean>) => {
      state.passwordVisible = action.payload;
    },
    setHistoryVisible: (state, action: PayloadAction<boolean>) => {
      state.historyVisible = action.payload;
    },
    setChangeEmailVisible: (state, action: PayloadAction<boolean>) => {
      state.changeEmailVisible = action.payload;
    },
    setChangeEmailAddress: (state, action: PayloadAction<boolean>) => {
      state.changeEmailAddress = action.payload;
    },
  },
});

export const {
  setAccountVisible,
  setPasswordVisible,
  setHistoryVisible,
  setChangeEmailVisible,
  setChangeEmailAddress,
} = accountSlice.actions;

// export const selectCount = (state: RootState) => state.account.visible;

export default accountSlice.reducer;
