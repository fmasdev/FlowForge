import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@/common/interceptors/response.interseptor';
import { AllExceptionsFilter } from '@/common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import { RequestLoggerMiddleware } from '@/common/middlewares/RequestLoggerMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // todo: put this variable in env file
  app.enableCors({
    origin: 'http://127.0.0.1',
    credentials: true,
  });
  
  if (process.env.NODE_ENV === 'development') {
    // Logger middleware
    const requestLogger = new RequestLoggerMiddleware()
    // app.use(requestLoggerMiddleware(req, resizeBy, next));
    app.use((req: Request, res: Response, next: NextFunction) =>
      requestLogger.use(req, res, next));
  }

  // request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // response format
  app.useGlobalInterceptors(new ResponseInterceptor());

  // response exception format
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error(err);
});
