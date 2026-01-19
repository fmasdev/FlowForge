// src/modules/auth/components/LoginForm.tsx

'use client';

import { authService } from '@/modules/auth/auth.service';
import { PasswordInput } from '@/modules/auth/components/PasswordInput';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { FormEvent, JSX, useState } from 'react';
import Link from 'next/link';

export const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useTranslation('auth');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { success } = await authService.login(email, password);
      if (success) {
        await login();
        await router.replace('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      // TODO: finalyse with
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
        <h1 className="text-xl font-semibold">
          {t('login.title')}
        </h1>

        <input
          type="email"
          placeholder={t('login.form.email')}
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('login.form.password')}
          classname="border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? t('login.form.loading') : t('login.form.submit')}
        </button>

        <div>
          <Link href="/auth/forgot-password">
            {t('login.forgotPasswordLink')} ?
          </Link>
        </div>
      </form>
    </div>
  );
}
