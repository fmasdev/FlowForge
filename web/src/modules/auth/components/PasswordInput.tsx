// src/modules/auth/components/PasswordInput.tsx

'use client';

import { SvgIcon } from '@/components/SvgIcon';
import { useState } from 'react';

type PasswordInputProps = {
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  classname?: string
};

export function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  error,
  autoComplete = 'current-password',
  classname,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${classname} w-full rounded border px-3 py-2 pr-10 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={!!error}
        required
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? (
          <SvgIcon name="closedEye" />
        ) : (
          <SvgIcon name="openEye" />
        )}
      </button>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
