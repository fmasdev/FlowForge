// src/modules/workflow/workflow.service.ts

import { apiService } from "@/services/api/api.service";

export const workflowNodeService = {

  create: async (workflowId: string, data: object) =>
    await apiService.post(`/workflows/${workflowId}/nodes`, data),

  update: async(workflowId: string, id: string, data: object) =>
    await apiService.patch(`/workflows/${workflowId}/nodes/${id}`, data),

  remove: async (workflowId: string,id: string) =>
    await apiService.delete(`/workflows/${workflowId}/nodes/${id}`),
}