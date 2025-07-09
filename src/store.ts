import { configureStore } from "@reduxjs/toolkit";

import { generalAPI } from "./redux/generalAPI";

export const store = configureStore({
  reducer: {
    [generalAPI.reducerPath]: generalAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([generalAPI.middleware]),
});
