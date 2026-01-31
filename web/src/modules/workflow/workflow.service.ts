// src/modules/dashboard/dashboard.service.tsx

import { Workflow, WorkflowFormData } from "@/modules/workflow/types/Workflow.types";
import { apiService } from "@/services/api/api.service";
import { ItemApiResponse, ListApiResponse } from "@/services/api/api.types";

export const workflowService = {

  create: async (data: WorkflowFormData): Promise<ItemApiResponse<Workflow>> => 
    await apiService.post('/workflows', data),

  fetchAll: async (params?: Record<string, unknown>): Promise<ListApiResponse<Workflow>> =>
    await apiService.get('/workflows', params),

  update: async (id: string, data: object): Promise<ItemApiResponse<Workflow>> => 
    await apiService.put(`/workflows/${id}`, data),
  
  delete: async (id: string): Promise<ItemApiResponse<Workflow | null>> => 
    await apiService.delete(`/workflows/${id}`),

};
