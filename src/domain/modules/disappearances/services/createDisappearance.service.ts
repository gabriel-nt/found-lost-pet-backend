import { ICreateDisappearanceDTO } from './../dtos/ICreateDisappearanceDTO';
import { HttpException, Injectable } from '@nestjs/common';
import { DisappearancesRepository } from '../infra/http/typeorm/repositories/disappearances.repository';
import { Disappearance } from '../infra/http/typeorm/entities/disappearance.entity';

@Injectable()
export class CreateDisappearanceService {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(data: ICreateDisappearanceDTO): Promise<Disappearance> {
    const findDisappearance = await this.disappearancesRepository.findByName(
      data.name,
    );

    if (findDisappearance) {
      throw new HttpException('Disappearance already exists', 400);
    }

    const disappearance =
      await this.disappearancesRepository.createDisappearance(data);

    return disappearance;
  }
}
