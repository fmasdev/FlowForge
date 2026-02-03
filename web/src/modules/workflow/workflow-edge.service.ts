// src/modules/workflow/workflow.service.ts

import { apiService } from "@/services/api/api.service";

const workflowEdgeService = {
  create: async(workflowId: string, data: object) =>
    await apiService.post(`/workflows/${workflowId}/edges`, data),

  update: async (workflowId: string,id: string, data: object) =>
    await apiService.patch(`/workflows/${workflowId}/edges/${id}`),

  remove: async (workflowId: string, id: string) =>
    await apiService.delete(`/workflows/${workflowId}/edges/${id}`),
}