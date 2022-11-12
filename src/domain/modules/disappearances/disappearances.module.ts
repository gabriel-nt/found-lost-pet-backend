import { DeleteDisappearanceService } from './services/deleteDisappearance.service';
import { UpdateDisappearanceService } from './services/updateDisappearance.service';
import { CreateDisappearanceService } from './services/createDisappearanceService.service';
import { ListDisappearancesService } from './services/listDisappearances.service';
import { DisappearancesController } from './infra/http/controllers/disappearances.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disappearance } from './infra/http/typeorm/entities/disappearance.entity';
import { DisappearancesRepository } from './infra/http/typeorm/repositories/disappearances.repository';

@Module({
  controllers: [DisappearancesController],
  imports: [TypeOrmModule.forFeature([Disappearance])],
  providers: [
    DisappearancesRepository,
    ListDisappearancesService,
    CreateDisappearanceService,
    UpdateDisappearanceService,
    DeleteDisappearanceService,
  ],
})
export class DisappearancesModule {}
