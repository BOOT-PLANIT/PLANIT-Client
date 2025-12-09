import { configureStore } from "@reduxjs/toolkit";

import toastReducer from "./toastSlice";

const dummyReducer = (state = {}) => state;

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: dummyReducer,
      toast: toastReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
