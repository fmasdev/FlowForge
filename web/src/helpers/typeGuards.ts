// src/helpers/typeGuards.ts

import { ApiErrorResponse } from "@/services/api/api.types";

export const isApiErrorResponse = (obj: any): obj is ApiErrorResponse => {
  return (
    obj &&
    typeof obj === 'object' &&
    'success' in obj &&
    obj.success === false &&
    'message' in obj &&
    typeof obj.message === 'string'
  )
}
