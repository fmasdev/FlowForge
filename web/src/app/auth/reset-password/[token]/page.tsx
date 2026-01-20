// src/app/auth/reset-password/[token]/page.tsx

import { JSX } from 'react';
import { useParams } from 'next/navigation';

export default function Page(): JSX.Element {
  const params = useParams();
  console.log(params);

  return <div>reset password</div>;
}
