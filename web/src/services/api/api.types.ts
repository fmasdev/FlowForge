// src/services/api/api.types.ts

export interface PaginationMeta {
  page: number;
  limit: number;
  pages: number;
  sortDirection: 'ASC' | 'DESC';
}

export type ListApiResponse<T> = ApiResponse<T[], PaginationMeta>;
export type ItemApiResponse<T> = ApiResponse<T>;

export interface ApiResponse<T, M = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: M | null;
}

export interface ApiErrorPayload {
  code: string;
  message?: string;
  context?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorPayload;
  timestamp: string;
  path: string;
}

export interface NormalizedError {
  code: string;
  message: string;
  rawMessage?: string;
  context?: Record<string, unknown>;
  status?: number;
  isInfraError: boolean;
}