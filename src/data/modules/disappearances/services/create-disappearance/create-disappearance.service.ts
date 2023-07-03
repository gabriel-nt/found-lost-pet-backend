import { HttpException } from '../../../../exceptions/http-exception';
import { DisappearanceModel } from '../../../../../domain/modules/disappearances/models';
import { CreateDisappearanceDto } from './../../../../../domain/modules/disappearances/dtos';
import { DisappearancesRepository } from '../../../../../domain/modules/disappearances/repositories';
import { CreateDisappearanceUseCase } from './../../../../../domain/modules/disappearances/use-cases';

export class CreateDisappearanceService implements CreateDisappearanceUseCase {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(data: CreateDisappearanceDto): Promise<DisappearanceModel> {
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
