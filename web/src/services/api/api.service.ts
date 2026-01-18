// src/services/api/api.service.ts

import {
  ApiErrorResponse,
  ApiResponse
} from '@/services/api/api.types';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';

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
        if (error.response && error.response.data) {
          return Promise.reject<ApiErrorResponse>(error.response.data);
        }
        
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return await this.instance.get<ApiResponse<T>>(url, config).then((res) => res.data);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return await this.instance.post<ApiResponse<T>>(url, data, config).then((res) => res.data);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return await this.instance.put<ApiResponse<T>>(url, data, config).then((res) => res.data);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return await this.instance.delete<ApiResponse<T>>(url, config).then((res) => res.data);
  }
}

export const apiService = new ApiService();
