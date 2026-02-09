// src/services/api/normalizeApiError.ts

import { AxiosError } from 'axios';
import { NormalizedError } from '@/services/api/api.types';
import { useTranslation } from 'react-i18next';

export const normalizeApiError = (err: unknown): NormalizedError => {

  // Axios error
  if (err instanceof AxiosError) {
    
    // Network / server unreachable
    if (!err.response) {
      return {
        code: 'network.unreachable',
        message: 'errors.network',
        rawMessage: err.message,
        isInfraError: true,
      };
    }

    const { status, data } = err.response;
    const payload = data as any;

    // Backend structured error
    if (payload?.error?.code) {
      const isInfra =
        status >= 500 ||
        payload.error.code.startsWith('database.') ||
        payload.error.code.startsWith('internal.');

      return {
        code: payload.error.code,
        message: payload.error.code,
        rawMessage: payload.error.message,
        context: payload.error.context,
        status,
        isInfraError: isInfra,
      };
    }

    // Generic HTTP error
    return {
      code: status >= 500 ? 'internal.serverError' : 'http.error',
      message: status >= 500 ? 'errors.server' : 'errors.request',
      status,
      isInfraError: status >= 500,
    };
  }

  // Native JS error
  if (err instanceof Error) {
    return {
      code: 'client.error',
      message: 'errors.client',
      rawMessage: err.message,
      isInfraError: true,
    };
  }

  return {
    code: 'unknown.error',
    message: 'errors.unknown',
    isInfraError: true,
  };
};