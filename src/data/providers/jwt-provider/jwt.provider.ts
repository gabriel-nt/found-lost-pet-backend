import { JwtProvider as JwtProviderInterface } from './../../../domain/providers/jwt-provider';

export class JwtProvider implements JwtProviderInterface {
  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options?: {
      subject: string;
    },
  ): string {
    return JSON.stringify({
      ...Object(payload),
      sub: options.subject,
    });
  }

  verify<T>(token: string, secret: string): T {
    const payload = JSON.parse(token);

    return {
      ...payload,
      sub: payload?.sub,
    };
  }
}
