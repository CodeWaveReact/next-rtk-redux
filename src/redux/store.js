import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiServices/apiSlice";
import postSlice from "./slices/posts-slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    posts: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// setupListeners - Redux Toolkit Query enables auto-refetching.
// apiSlice.reducerPath - The reducer for RTK Query has been added to manage API calls
