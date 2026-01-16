'use client';

import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams()
  console.log(params)

  return (
    <div>reset password</div>
  )
}

export default Page;