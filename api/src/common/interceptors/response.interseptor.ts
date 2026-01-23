import { ResponseType, ServiceResponse } from '@/common/types/response.types';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseType<unknown, unknown>> {
    return next.handle().pipe(
      map((data: ServiceResponse<unknown, unknown>) => {
        return {
          success: true,
          message: '',
          data: data?.data ?? data ?? {},
          meta: data?.meta,
        };
      }),
    );
  }
}
