import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  GetDisappearanceService,
  ListDisappearancesService,
  CreateDisappearanceService,
  UpdateDisappearanceService,
  DeleteDisappearanceService,
} from '../../../data/modules/disappearances/services';

import { Disappearance } from './entities';
import { DisappearancesController } from './http';
import { DisappearancesRepository } from './repositories';

@Module({
  controllers: [DisappearancesController],
  imports: [TypeOrmModule.forFeature([Disappearance])],
  providers: [
    DisappearancesRepository,
    {
      provide: 'ListDisappearancesUseCase',
      inject: [DisappearancesRepository],
      useFactory: (repository: DisappearancesRepository) =>
        new ListDisappearancesService(repository),
    },
    {
      provide: 'CreateDisappearanceUseCase',
      inject: [DisappearancesRepository],
      useFactory: (repository: DisappearancesRepository) =>
        new CreateDisappearanceService(repository),
    },
    {
      provide: 'UpdateDisappearanceUseCase',
      inject: [DisappearancesRepository],
      useFactory: (repository: DisappearancesRepository) =>
        new UpdateDisappearanceService(repository),
    },
    {
      provide: 'DeleteDisappearanceUseCase',
      inject: [DisappearancesRepository],
      useFactory: (repository: DisappearancesRepository) =>
        new DeleteDisappearanceService(repository),
    },
    {
      provide: 'GetDisappearanceUseCase',
      inject: [DisappearancesRepository],
      useFactory: (repository: DisappearancesRepository) =>
        new GetDisappearanceService(repository),
    },
  ],
  exports: [DisappearancesRepository],
})
export class DisappearancesModule {}
