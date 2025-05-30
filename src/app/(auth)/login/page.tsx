import { StatusLables } from "@/constant/enum";
import React, { Suspense, lazy } from "react";

const LoginForm = lazy(() => import("@/components/LoginForm"));

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">{StatusLables.Loading}</p>}>
      <LoginForm />
    </Suspense>
  );
}
