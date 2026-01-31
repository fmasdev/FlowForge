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

export interface ApiErrorResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  path: string;
  timestamp: string;
}
