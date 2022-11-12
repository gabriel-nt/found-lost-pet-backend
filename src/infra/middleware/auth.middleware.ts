import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

import auth from '../config/auth/auth';

interface IPayload {
  sub: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

      request.user = {
        id: user_id,
      };

      next();
    } catch (error) {
      throw new HttpException('Invalid token', 401);
    }
  }
}
