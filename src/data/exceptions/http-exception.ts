import { HttpExceptionInterface } from '../../domain/exceptions/http-exception.interface';

export class HttpException extends Error implements HttpExceptionInterface {
  status: number;
  response: string;

  constructor(message: string, status: number) {
    super();

    this.status = status;
    this.response = message;
  }
}
