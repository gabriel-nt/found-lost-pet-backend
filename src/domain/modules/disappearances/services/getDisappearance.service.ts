import { HttpException, Injectable } from '@nestjs/common';

import { DisappearancesRepository } from '../infra/http/typeorm/repositories/disappearances.repository';
import { Disappearance } from '../infra/http/typeorm/entities/disappearance.entity';

@Injectable()
export class GetDisappearanceService {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(id: string): Promise<Disappearance> {
    const findDisappearance = await this.disappearancesRepository.findById(id);

    if (!findDisappearance) {
      throw new HttpException('Disappearance not found', 404);
    }

    return findDisappearance;
  }
}
