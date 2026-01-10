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
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ success: boolean; message: string; data: T | object }> {
    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        message: '',
        data: data ?? {},
      })),
    );
  }
}
