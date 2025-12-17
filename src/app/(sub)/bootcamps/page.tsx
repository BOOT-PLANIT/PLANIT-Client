import { Suspense } from "react";

import { Onboarding } from "@/page-layer/onboarding";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Onboarding />
    </Suspense>
  );
}
