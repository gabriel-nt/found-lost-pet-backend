export interface JwtProvider {
  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options?: {
      subject: string;
      expiresIn: number | string;
    },
  ): string;
  verify<T>(token: string, secret: string): T;
}
