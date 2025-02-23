import { configureStore } from '@reduxjs/toolkit';
import FeedReducer from './FeedSlice';
import ThemeReducer from "./ThemeSlice";

export const Store = configureStore({
  reducer: {
    feed: FeedReducer,
    theme: ThemeReducer,
  }
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;