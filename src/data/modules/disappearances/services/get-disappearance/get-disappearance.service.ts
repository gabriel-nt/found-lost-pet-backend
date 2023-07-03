import { HttpException } from '../../../../exceptions/http-exception';
import { DisappearanceModel } from '../../../../../domain/modules/disappearances/models';
import { GetDisappearanceUseCase } from './../../../../../domain/modules/disappearances/use-cases';
import { DisappearancesRepository } from '../../../../../domain/modules/disappearances/repositories';

export class GetDisappearanceService implements GetDisappearanceUseCase {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(id: string): Promise<DisappearanceModel> {
    const findDisappearance = await this.disappearancesRepository.findById(id);

    if (!findDisappearance) {
      throw new HttpException('Disappearance not found', 404);
    }

    return findDisappearance;
  }
}
