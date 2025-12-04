"use client";

import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <StoreProvider>
      <QueryProvider>{children}</QueryProvider>
    </StoreProvider>
  );
};

export default Providers;
