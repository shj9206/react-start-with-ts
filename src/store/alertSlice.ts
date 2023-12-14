import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  title: "Alert",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.open = true;
      state.title = action.payload.title
        ? action.payload.title
        : initialState.title;
      state.message = action.payload.message;
    },
    hideAlert: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
