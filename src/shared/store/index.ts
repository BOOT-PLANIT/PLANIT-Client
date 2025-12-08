import { configureStore } from "@reduxjs/toolkit";

const dummyReducer = (state = {}) => state;

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: dummyReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
