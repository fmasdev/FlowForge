// src/services/api/api.types.ts

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface ApiErrorResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
  path: string;
  timestamp: string;
}