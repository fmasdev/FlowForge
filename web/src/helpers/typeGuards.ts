import { ApiErrorResponse } from "@/types/api.types";

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
