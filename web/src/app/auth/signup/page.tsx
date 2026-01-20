// src/app/auth/signup/page.tsx

import { JSX } from 'react';
import { RegisterForm } from '@/modules/auth/components/RegisterForm';

export default function Page(): JSX.Element {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RegisterForm />
    </div>
  );
}
