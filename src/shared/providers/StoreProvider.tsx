"use client";

import { useState } from "react";
import { Provider } from "react-redux";

import { makeStore, setStore } from "@/shared/store/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => makeStore());

  setStore(store);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
