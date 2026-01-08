import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { DriverErrorType } from '@/common/types/error.typs';

interface HttpExceptionResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

interface MessageStatusType {
  message: string | string[];
  status: number;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (exception instanceof QueryFailedError) {
      ({ message, status } = loadTypeOrmException(exception));
    } else if (exception instanceof HttpException) {
      ({ message, status } = loadHttpException(exception));
    } else if (hasMessage(exception)) {
      // Other errors
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      message,
      data: {},
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// Guard type for exception with message
const hasMessage = (obj: unknown): obj is { message: string } => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    typeof (obj as { message?: unknown }).message === 'string'
  );
};

// TypeORM - SQL errors
const loadTypeOrmException = (
  exception: QueryFailedError<any>,
): MessageStatusType => {
  const driverError = exception.driverError as DriverErrorType;

  switch (driverError.code) {
    case '23505':
      return {
        message: 'Email already exists',
        status: 409,
      };
    case '23503':
      return {
        message: 'Foreign key violation',
        status: 409,
      };
    default:
      return {
        message: 'Database error',
        status: 500,
      };
  }
};

// NestJS HttpException
const loadHttpException = (exception: HttpException): MessageStatusType => {
  const status = exception.getStatus();
  const res = exception.getResponse();

  if (typeof res === 'string') {
    return {
      status: status,
      message: res,
    };
  } else if (typeof res === 'object' && res !== null) {
    const response = res as HttpExceptionResponse;

    if (Array.isArray(response.message)) {
      return {
        status: status,
        message: response.message.join(', '),
      };
    } else if (typeof response.message === 'string') {
      return {
        status: status,
        message: response.message,
      };
    }
  }

  return {
    message: exception.message,
    status: status,
  };
};
