import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface AccountState {
  visible: boolean | null;
}

const initialState: AccountState = {
  visible: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = accountSlice.actions;

export const selectCount = (state: RootState) => state.account.visible;

export default accountSlice.reducer;
