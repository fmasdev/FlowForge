// src/app/auth/reset-password/[token]/page.tsx

import { useParams } from "next/navigation";
import { JSX } from "react";

export default function Page(): JSX.Element {
  const params = useParams()
  console.log(params)

  return (
    <div>reset password</div>
  )
}
