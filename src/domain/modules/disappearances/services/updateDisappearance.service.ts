import { ICreateDisappearanceDTO } from './../dtos/ICreateDisappearanceDTO';
import { HttpException, Injectable } from '@nestjs/common';

import { DisappearancesRepository } from '../infra/http/typeorm/repositories/disappearances.repository';
import { Disappearance } from '../infra/http/typeorm/entities/disappearance.entity';

@Injectable()
export class UpdateDisappearanceService {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(
    id: string,
    data: ICreateDisappearanceDTO,
  ): Promise<Disappearance> {
    const findDisappearance = await this.disappearancesRepository.findById(id);

    if (!findDisappearance) {
      throw new HttpException('Disappearance not found', 404);
    }

    if (data.user_id !== findDisappearance.user_id) {
      throw new HttpException('Unauthorized', 401);
    }

    const pet = await this.disappearancesRepository.updateDisappearance(
      id,
      data,
    );

    return pet;
  }
}
