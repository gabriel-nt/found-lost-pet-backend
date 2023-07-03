import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { JwtProvider as JwtProviderInterface } from './../../../domain/providers/jwt-provider';

@Injectable()
export class JwtProvider implements JwtProviderInterface {
  sign(payload: string | object | Buffer, secretOrPrivateKey: string): string {
    return sign(payload, secretOrPrivateKey);
  }

  verify<T>(token: string, secret: string): T {
    return verify(token, secret) as T;
  }
}
