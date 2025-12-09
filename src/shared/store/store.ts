import { configureStore } from "@reduxjs/toolkit";

import toastReducer from "./toastSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      toast: toastReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
