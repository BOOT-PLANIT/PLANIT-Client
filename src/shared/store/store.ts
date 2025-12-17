import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import toastReducer from "./toastSlice";

const dummyReducer = (state = {}) => state;

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: dummyReducer,
      toast: toastReducer,
      auth: authReducer,
    },
  });
};

let store: AppStore | null = null;

export const setStore = (s: AppStore) => {
  store = s;
};

export const getStore = (): AppStore => {
  if (!store) {
    throw new Error("Redux store 초기화되지 않았습니다");
  }
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
