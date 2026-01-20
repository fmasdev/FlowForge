// src/modules/auth/components/ForgotPasswordForm.tsx

'use client';

import { JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from '@/components/Notification';
import { authService } from '@/modules/auth/auth.service';

export const ForgotPasswordForm = (): JSX.Element => {
  const { t } = useTranslation('auth');

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!isValidEmail(email)) {
      setErrorMessage(t('forgotPassword.form.error.invalidEmail'));
      return;
    }

    try {
      setLoading(true);
      const res = await authService.forgotPassword(email);

      setSuccessMessage(t('forgotPassword.form.success'));
      setEmail('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error?.message);
        setErrorMessage(
          error?.message || t('forgotPassword.form.error.generic'),
        );
      } else {
        console.error('Unknown error', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-6">
        {t('forgotPassword.title')}
      </h1>

      <p className="my-10">{t('forgotPassword.description')}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            {t('forgotPassword.form.field.email')}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-gray-900 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="email@example.com"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 rounded-md transition"
        >
          {loading
            ? t('forgotPassword.form.field.loading')
            : t('forgotPassword.form.field.submit')}
        </button>
      </form>

      {successMessage && (
        <Notification
          type="success"
          message={successMessage}
          position="bottom-center"
        />
      )}

      {errorMessage && (
        <Notification
          type="danger"
          message={errorMessage}
          position="bottom-center"
        />
      )}
    </div>
  );
};
