// src/modules/workflow/components/WorkflowForm.tsx

import { SortDirection } from "typeorm";

export interface ResponseType<T, M = unknown> {
  success: boolean;
  message?: string;
  data: T | object;
  meta?: M | object;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
  sortDirection: SortDirection;
}

export interface ServiceResponse<T, M = unknown> {
  data: T | object;
  meta?: M | object;
  message?: string;
}
