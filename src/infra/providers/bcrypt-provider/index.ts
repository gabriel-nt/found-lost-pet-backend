import { Module } from '@nestjs/common';

import { BcryptProvider } from './bcrypt.provider';

@Module({
  controllers: [],
  providers: [BcryptProvider],
  exports: [BcryptProvider],
})
export class BcryptProviderModule {}
