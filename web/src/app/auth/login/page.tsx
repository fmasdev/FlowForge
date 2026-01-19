// src/app/auth/login/page.tsx

import { LoginForm } from "@/modules/auth/components/LoginForm";
import { JSX } from "react";

export default function Page(): JSX.Element {

  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm />
    </div>
  )
}