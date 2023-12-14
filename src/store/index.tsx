import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import ContentWidthReducer from "@/store/contentWidthSlice.ts";
import accountReducer from "@/store/accountSlice.ts";
import alertSlice from "@/store/alertSlice.ts";

export const store = configureStore({
  reducer: {
    content: ContentWidthReducer,
    counter: counterReducer,
    auth: authReducer,
    account: accountReducer,
    alert: alertSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
