// src/modules/auth/components/RegisterForm.tsx

'use client';

import { Notification } from '@/components/Notification';
import { isApiErrorResponse } from '@/helpers/typeGuards';
import { PasswordInput } from '@/modules/auth/components/PasswordInput';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState, FormEvent, useEffect, JSX } from 'react';
import Link from 'next/link';
import { authService } from '@/modules/auth/auth.service';
import {
  RegisterFormErrors,
  RegisterFormValues,
} from '@/modules/auth/types/auth.types';

export const RegisterForm = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation('auth');

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [requestErrors, setRequestErrors] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (requestErrors) {
      const timer = setTimeout(() => setRequestErrors(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [requestErrors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = (): RegisterFormErrors => {
    const newErrors: RegisterFormErrors = {};

    if (formValues.firstname.trim().length < 2) {
      newErrors.firstname = t('register.form.error.firstname');
    }

    if (formValues.lastname.trim().length < 2) {
      newErrors.lastname = t('register.form.error.lastname');
    }

    if (!formValues.email) {
      newErrors.email = t('register.form.error.email.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = t('register.form.error.email.format');
    }

    if (!formValues.password) {
      newErrors.password = t('register.form.error.password.required');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formValues.password)
    ) {
      newErrors.password = t('register.form.error.password.format');
    }

    if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = t('register.form.error.password.confirm');
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      await authService.register(formValues);
      await router.replace('/login');
    } catch (error) {
      if (isApiErrorResponse(error)) {
        setRequestErrors(error.message);
      } else {
        setRequestErrors('Unexpected error'); // fallback
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h1 className="text-xl font-semibold">{t('register.title')}</h1>

      <div>
        <Link href="/auth/login">{t('register.loginLink')}</Link>
      </div>

      {(['firstname', 'lastname', 'email'] as const).map((field) => (
        <div key={field}>
          <input
            type="text"
            name={field}
            placeholder={t(`register.form.field.${field}`)}
            value={formValues[field]}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
          {errors[field] && (
            <p className="text-sm text-red-500">{errors[field]}</p>
          )}
        </div>
      ))}

      <PasswordInput
        name="password"
        value={formValues.password}
        onChange={handleChange}
        placeholder={t('register.form.field.password')}
        error={errors.password}
      />

      <PasswordInput
        name="confirmPassword"
        value={formValues.confirmPassword}
        onChange={handleChange}
        placeholder={t('register.form.field.confirmPassword')}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting
          ? t('register.form.field.loading')
          : t('register.form.field.submit')}
      </button>

      {requestErrors && (
        <Notification
          type="danger"
          message={requestErrors}
          position="bottom-right"
        />
      )}
    </form>
  );
};
