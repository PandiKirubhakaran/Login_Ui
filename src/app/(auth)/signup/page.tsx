import { StatusLables } from "@/constant/enum";
import React, { Suspense, lazy } from "react";

const SignupForm = lazy(() => import("@/components/SignupForm"));

export default function SignupPage() {
  return (
    <Suspense
      fallback={<p className="text-center mt-20">{StatusLables.Loading}</p>}
    >
      <SignupForm />
    </Suspense>
  );
}
