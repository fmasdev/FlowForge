// src/app/auth/login/page.tsx

import { JSX } from 'react';
import { LoginForm } from '@/modules/auth/components/LoginForm';

export default function Page(): JSX.Element {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm />
    </div>
  );
}
