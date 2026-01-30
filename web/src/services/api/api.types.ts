// src/services/api/api.types.ts

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
  sortDirection: 'ASC' | 'DESC';
}

export interface ApiResponse<T = unknown, M = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: M | null;
}

export interface ApiErrorResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  path: string;
  timestamp: string;
}
