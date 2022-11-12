import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const isHttpException = exception instanceof HttpException;

    const ctx = host.switchToHttp();
    const httpStatus = isHttpException ? exception.getStatus() : 500;

    const responseBody = {
      statusCode: httpStatus,
      message: isHttpException
        ? exception.getResponse()
        : 'Internal Server Error',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
