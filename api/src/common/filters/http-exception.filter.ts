// src/common/filters/http-exception.filter.ts

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { ApiErrorPayload, TypeOrmDriverError } from '@/common/types/error.types';
import { isApiErrorPayload, isDatabaseConnectionError } from '@/common/guards/error.guards';

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorPayload;
  timestamp: string;
  path: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: ApiErrorPayload = {
      code: 'internal.error',
    };

    // =====================================================
    //  HttpException (PRIORITAIRE)
    // =====================================================
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (isApiErrorPayload(res)) {
        error = res;
      } else if (typeof res === 'string') {
        error = {
          code: 'http.error',
          message: res,
        };
      }
    }

    // =====================================================
    //  TypeORM Query Errors
    // =====================================================
    else if (exception instanceof QueryFailedError) {
      const driverError = exception.driverError as TypeOrmDriverError;
      ({ status, error } = mapTypeOrmError(driverError));
    }

    // =====================================================
    //  DB Connection Errors
    // =====================================================
    else if (isDatabaseConnectionError(exception)) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      error = {
        code: 'database.connectionFailed',
        message: exception instanceof Error ? exception.message : undefined,
      };
    }

    // =====================================================
    //  Generic JS Error
    // =====================================================
    else if (exception instanceof Error) {
      error = {
        code: 'internal.error',
        message: exception.message,
      };
    }

    const body: ApiErrorResponse = {
      success: false,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(body);
  }
}

const mapTypeOrmError = (
  driverError: TypeOrmDriverError,
): { status: number; error: ApiErrorPayload } => {
  switch (driverError.code) {
    case '23505':
      return {
        status: HttpStatus.CONFLICT,
        error: {
          code: 'database.uniqueViolation',
          message: driverError.detail,
        },
      };

    case '23503':
      return {
        status: HttpStatus.CONFLICT,
        error: {
          code: 'database.foreignKeyViolation',
          message: driverError.detail,
        },
      };

    case '23502':
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          code: 'database.notNullViolation',
          context: { column: driverError.column },
        },
      };

    case 'ECONNREFUSED':
    case 'ENOTFOUND':
    case '57P01':
      return {
        status: HttpStatus.SERVICE_UNAVAILABLE,
        error: {
          code: 'database.connectionFailed',
        },
      };

    default:
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          code: 'database.error',
          message: driverError.message,
        },
      };
  }
};
