// src/helpers/typeGuards.ts

import { ApiErrorResponse } from '@/services/api/api.types';

export const isApiErrorResponse = (obj: unknown): obj is ApiErrorResponse => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  const maybeObj = obj as Record<string, unknown>;

  return (
    'success' in maybeObj &&
    maybeObj.success === false &&
    'message' in maybeObj &&
    typeof maybeObj.message === 'string'
  );
};
