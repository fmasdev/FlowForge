// src/modules/dashboard/dashboard.service.tsx


import { WorkflowFormData } from "@/modules/workflow/schema/workflow.schema";
import { apiService } from "@/services/api/api.service";
import type { Workflow } from "@/modules/workflows/types/Workflows.types";
import type { ItemApiResponse, ListApiResponse } from "@/services/api/api.types";

export const workflowService = {

  create: async (data: WorkflowFormData): Promise<ItemApiResponse<Workflow>> => 
    await apiService.post('/workflows', data),
  
  fetchOne: async (id: string): Promise<ItemApiResponse<Workflow>> => 
    await apiService.get(`/workflows/${id}`), 

  fetchAll: async (params?: Record<string, unknown>): Promise<ListApiResponse<Workflow>> =>
    await apiService.get('/workflows', params),

  update: async (id: string, data: object): Promise<ItemApiResponse<Workflow>> => 
    await apiService.put(`/workflows/${id}`, data),
  
  delete: async (id: string): Promise<ItemApiResponse<Workflow | null>> => 
    await apiService.delete(`/workflows/${id}`),

};
