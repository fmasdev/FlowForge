// src/services/api/api.service.ts

import { ApiErrorResponse, ApiResponse } from '@/services/api/api.types';
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
      (error): Promise<ApiErrorResponse> => {
        // Global errors management
        if (error.response?.data != null) {
          return Promise.reject<ApiErrorResponse>(error.response.data);
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T, M>(
    path: string,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T, M>> {
    const uri = this.uriBuilder(path, params);
    return await this.instance
      .get<ApiResponse<T, M>>(uri, config)
      .then((res) => res.data);
  }

  async post<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return await this.instance
      .post<ApiResponse<T>>(path, data, config)
      .then((res) => res.data);
  }

  async put<T>(
    path: string,
    data?: unknown,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const uri = this.uriBuilder(path, params);
    return await this.instance
      .put<ApiResponse<T>>(uri, data, config)
      .then((res) => res.data);
  }

  async patch<T>(
    path: string,
    data?: unknown,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const uri = this.uriBuilder(path, params);
    return await this.instance
      .patch<ApiResponse<T>>(uri, data, config)
      .then((res) => res.data);
  }

  async delete<T>(
    path: string,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const uri = this.uriBuilder(path, params);
    return await this.instance
      .delete<ApiResponse<T>>(uri, config)
      .then((res) => res.data);
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
}

export const apiService = new ApiService();
