"use client";

import AuthHydrator from "./AuthHydrator";
import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <StoreProvider>
      <QueryProvider>
        <AuthHydrator />
        {children}
      </QueryProvider>
    </StoreProvider>
  );
};

export default Providers;
