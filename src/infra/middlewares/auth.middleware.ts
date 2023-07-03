import { Request, Response, NextFunction } from 'express';

import {
  Inject,
  Injectable,
  HttpException,
  NestMiddleware,
} from '@nestjs/common';

import { JwtProvider } from '../../domain/providers';
import { AuthConfig } from '../../domain/config/auth.config';

interface IPayload {
  sub: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('AuthConfig')
    private authConfigService: AuthConfig,

    @Inject('JwtProvider')
    private jwtProvider: JwtProvider,
  ) {}

  use(request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = this.jwtProvider.verify<IPayload>(
        token,
        this.authConfigService.getSecretToken(),
      );

      request.user = {
        id: user_id,
      };

      next();
    } catch (error) {
      throw new HttpException('Invalid token', 401);
    }
  }
}
