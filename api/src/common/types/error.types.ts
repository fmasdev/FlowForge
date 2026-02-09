// src/common/types/error.typs.ts

export type ErrorContext = Record<string, unknown>;

export interface ApiErrorPayload {
  code: string;
  message?: string;
  context?: ErrorContext;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorPayload;
  timestamp: string;
  path: string;
}

export interface TypeOrmDriverError {
  code?: string;
  message?: string;
  detail?: string;
  column?: string;
}

export interface TypeOrmDriverError {
  driverError?: {
    code?: string;
    detail?: string;
  };
}
