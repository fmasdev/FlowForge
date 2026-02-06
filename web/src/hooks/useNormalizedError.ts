// src/hooks/useNormalizedError.ts

'use client';

import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useNormalizedError = () => {
  const { t } = useTranslation();

  /**
   * Normalize an error of any type into an instance of Error
   * @param err string | Error | AxiosError | object | unknown
   * @param fallbackKey i18n key for unknown error (default: 'errors.unknown_error')
   */
  const normalizeError = (err: unknown, fallbackKey = 'errors.unknownError'): Error => {
    // If this is already an instance of Error
    if (err instanceof Error) {
      return err;
    }

    // If this is a string
    if (typeof err === 'string') {
      return new Error(err);
    }

    // AxiosError
    if ((err as AxiosError)?.isAxiosError) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response?.data && typeof axiosErr.response.data === 'object') {
        const data = axiosErr.response.data as { success?: boolean; message?: string; data?: any[] };
        if (data.message && data.message.trim() !== '') {
          return new Error(data.message);
        }
      }
      if (axiosErr.message) return new Error(axiosErr.message);
      return new Error(t(fallbackKey));
    }

    // Generic object with message
    if (typeof err === 'object' && err !== null && 'message' in err) {
      return new Error(String((err as any).message));
    }

    // Everything else → unknown error translated
    return new Error(t(fallbackKey));
  };

  return normalizeError;
};