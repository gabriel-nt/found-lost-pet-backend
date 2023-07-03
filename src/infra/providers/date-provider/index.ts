import { Module } from '@nestjs/common';

import { DayJsDateProvider } from './dayjs-date.provider';

@Module({
  controllers: [],
  providers: [DayJsDateProvider],
  exports: [DayJsDateProvider],
})
export class DateProviderModule {}
