// src/services/api/api.service.ts

import { authService } from '@/modules/auth/auth.service';
import { ApiErrorResponse, ApiResponse, NormalizedError } from '@/services/api/api.types';
import { normalizeApiError } from '@/services/api/normalizeApiError';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
      withCredentials: true,
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error): Promise<NormalizedError> => {
        // Global errors management
        const normalized = normalizeApiError(error);
 
        if (normalized.isInfraError) {
          this.handleInfraError(normalized);
          return Promise.reject(normalized);
        }

        throw normalized;
      },
    );
  }

  async get<T, M>(
    path: string,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T, M>> {
    const uri = this.uriBuilder(path, params);
    const { data } = await this.instance.get<ApiResponse<T, M>>(uri, config);
    return data;
  }

  async post<T>(
    path: string,
    reqData?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const { data } = await this.instance.post<ApiResponse<T>>(path, reqData, config);
    return data;
  }

  async put<T>(
    path: string,
    reqData?: unknown,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const uri = this.uriBuilder(path, params);
    const { data } = await this.instance.put<ApiResponse<T>>(uri, reqData, config);
    return data;
  }

  async patch<T>(
    path: string,
    reqData?: unknown,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const uri = this.uriBuilder(path, params);
    const { data } = await this.instance.patch<ApiResponse<T>>(uri, reqData, config);
    return data;
  }

  async delete<T>(
    path: string,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const uri = this.uriBuilder(path, params);
    const { data } = await this.instance.delete<ApiResponse<T>>(uri, config);
    return data;
  }

  private uriBuilder(
    path: string,
    params: Record<string, unknown>
  ): string {
    if (Object.keys(params).length === 0) {
      return path;
    }

    const query = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
    
    return path + `?${query}`;
  }

  protected handleInfraError(error: NormalizedError) {
    console.error('[INFRA ERROR]', error);

    if (error.status === 401) {
      authService.logout();
    }
  }
}

export const apiService = new ApiService();
