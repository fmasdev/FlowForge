// src/modules/workflow/schema/workflow-update.schema.ts

import { z } from 'zod';

export const workflowSchema = z.object({
  id: z.string().uuid().optional(),
  
  name: z
    .string()
    .min(3, 'name.minLength')
    .max(30, 'name.maxLength'),

  description: z
    .string()
    .min(1, 'description.required')
    .max(200, 'description.maxLength'),

  isActive: z.boolean(),
});

export type WorkflowFormData = z.infer<typeof workflowSchema>;