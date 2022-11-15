import { IListDisappearancesParams } from './../dtos/IListDisappearancesParams';
import { DisappearancesRepository } from './../infra/http/typeorm/repositories/disappearances.repository';

import { Injectable } from '@nestjs/common';
import { Disappearance } from '../infra/http/typeorm/entities/disappearance.entity';

@Injectable()
export class ListDisappearancesByUserService {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(
    params: IListDisappearancesParams & {
      user_id: string;
    },
  ): Promise<Disappearance[]> {
    const disappearances = await this.disappearancesRepository.findAll(params);

    return disappearances;
  }
}
