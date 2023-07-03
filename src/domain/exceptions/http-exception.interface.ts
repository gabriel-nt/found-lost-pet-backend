export declare class HttpExceptionInterface {
  status: number;
  response: string | Record<string, any>;

  constructor(response: string | Record<string, any>, status: number);
}
