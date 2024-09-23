import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./slices/homeSlice";
import venueSlice from "./slices/venueSlice";
import artistSlice from "./slices/artistSlice";

export const store = configureStore({
    reducer: {
      home: homeSlice,
      venue: venueSlice,
      artist: artistSlice,
    },
  });

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
