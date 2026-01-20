// src/services/api/api.types.ts

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface ApiErrorResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  path: string;
  timestamp: string;
}
