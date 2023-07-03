import { Module } from '@nestjs/common';

import { JwtProvider } from './jwt.provider';

@Module({
  controllers: [],
  providers: [JwtProvider],
  exports: [JwtProvider],
})
export class JwtProviderModule {}
