import { Suspense } from "react";

import { Onboarding } from "@/page-layer/onboarding";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <Onboarding />
    </Suspense>
  );
};

export default Page;
