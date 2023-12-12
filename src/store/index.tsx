import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from './authSlice'
import ContentWidthReducer from "@/store/contentWidthSlice.ts";

export const store = configureStore({
  reducer: {
    content: ContentWidthReducer,
    counter: counterReducer,
    auth: authReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
