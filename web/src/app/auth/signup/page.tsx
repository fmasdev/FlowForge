// src/app/auth/signup/page.tsx

import { RegisterForm } from '@/modules/auth/components/RegisterForm';
import { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RegisterForm />
    </div>
  );
};
