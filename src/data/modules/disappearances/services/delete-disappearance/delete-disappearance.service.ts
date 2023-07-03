import { HttpException } from '../../../../exceptions/http-exception';
import { DisappearancesRepository } from '../../../../../domain/modules/disappearances/repositories';
import { DeleteDisappearanceUseCase } from './../../../../../domain/modules/disappearances/use-cases';

export class DeleteDisappearanceService implements DeleteDisappearanceUseCase {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(id: string): Promise<void> {
    const findDisappearance = await this.disappearancesRepository.findById(id);

    if (!findDisappearance) {
      throw new HttpException('Disappearance not found', 404);
    }

    await this.disappearancesRepository.deleteDisappearance(id);
  }
}
