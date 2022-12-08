import { DeleteDisappearanceService } from './services/deleteDisappearance.service';
import { UpdateDisappearanceService } from './services/updateDisappearance.service';
import { CreateDisappearanceService } from './services/createDisappearance.service';
import { ListDisappearancesService } from './services/listDisappearances.service';
import { DisappearancesController } from './infra/http/controllers/disappearances.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disappearance } from './infra/http/typeorm/entities/disappearance.entity';
import { DisappearancesRepository } from './infra/http/typeorm/repositories/disappearances.repository';
import { ListDisappearancesByUserService } from './services/listDisappearancesByUser.service';
import { GetDisappearanceService } from './services/getDisappearance.service';

@Module({
  controllers: [DisappearancesController],
  imports: [TypeOrmModule.forFeature([Disappearance])],
  providers: [
    DisappearancesRepository,
    ListDisappearancesService,
    ListDisappearancesByUserService,
    CreateDisappearanceService,
    UpdateDisappearanceService,
    DeleteDisappearanceService,
    GetDisappearanceService,
  ],
  exports: [DisappearancesRepository],
})
export class DisappearancesModule {}
