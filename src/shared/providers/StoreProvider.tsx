"use client";

import { useState } from "react";
import { Provider } from "react-redux";

import { makeStore, setStore } from "@/shared/store/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => {
    const newStore = makeStore();
    setStore(newStore);
    return newStore;
  });

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
