import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

import { HttpExceptionInterface } from '../../domain/exceptions/http-exception.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpExceptionInterface, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = exception.status ?? 500;

    const responseBody = {
      statusCode: httpStatus,
      message: exception.response ?? 'Internal Server Error',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
