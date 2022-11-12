import { Module } from '@nestjs/common';

import { DayjsDateProvider } from './implementations/DayjsDateProvider';

@Module({
  controllers: [],
  providers: [DayjsDateProvider],
  exports: [DayjsDateProvider],
})
export class DateProviderModule {}
