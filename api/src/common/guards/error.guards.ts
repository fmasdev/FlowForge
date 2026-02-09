// src/common/guards/error.guard.ts

import { ApiErrorPayload } from "@/common/types/error.types";

export const isApiErrorPayload = (value: unknown): value is ApiErrorPayload => {
  if (typeof value !== 'object' || value === null) return false;

  return 'code' in value && typeof (value as any).code === 'string';
};

export const isDatabaseConnectionError = (err: unknown): boolean => {
  if (!(err instanceof Error)) return false;

  return (
    err.message.includes('ECONNREFUSED') ||
    err.message.includes('Connection terminated') ||
    err.message.includes('password authentication failed') ||
    err.message.includes('database system is starting up')
  );
};

