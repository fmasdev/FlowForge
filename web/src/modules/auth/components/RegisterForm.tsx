'use client';

import { Notification } from '@/components/Notification';
import { isApiErrorResponse } from '@/helpers/typeGuards';
import { PasswordInput } from '@/modules/auth/components/PasswordInput';
import { apiService } from '@/services/api/api.service';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const RegisterForm = () => {
  const router = useRouter();
  const { t } = useTranslation('auth');

  const [formValues, setFormValues] = useState<FormValues>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
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

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (formValues.firstname.trim().length < 2) {
      newErrors.firstname = t('formError.firstname');
    }

    if (formValues.lastname.trim().length < 2) {
      newErrors.lastname = t('formError.lastname');
    }

    if (!formValues.email) {
      newErrors.email = t('formError.email.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = t('formError.email.format');
    }

    if (!formValues.password) {
      newErrors.password = t('formError.password.required');
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formValues.password)) {
      newErrors.password = t('formError.password.format');
    }

    if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = t('formError.password.confirm');
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
      const res = await apiService.post('/auth/register', formValues);
      router.replace('/login')
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
      <h1 className="text-xl font-semibold">
        {t('register.title')}
      </h1>

      <div>
        <Link href="/auth/login">
          { t('register.loginLink') }
        </Link>
      </div>

      {(['firstname', 'lastname', 'email'] as const).map((field) => (
        <div key={field}>
          <input
            type="text"
            name={field}
            placeholder={t(`form.${field}`)}
            value={formValues[field]}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
          {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
        </div>
      ))}

      <PasswordInput
        name="password"
        value={formValues.password}
        onChange={handleChange}
        placeholder="Password"
        error={errors.password}
      />

      <PasswordInput
        name="confirmPassword"
        value={formValues.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? t('register.submiting') : t('register.submit')}
      </button>

      {!!requestErrors && (
        <Notification type="danger" message={requestErrors} position="bottom-right" />
      )}
    </form>
  );
};

export default RegisterForm;
