import { DisappearanceModel } from '../../../../../domain/modules/disappearances/models';
import { ListDisappearancesParamsDto } from '../../../../../domain/modules/disappearances/dtos';
import { DisappearancesRepository } from '../../../../../domain/modules/disappearances/repositories';
import { ListDisappearancesUseCase } from './../../../../../domain/modules/disappearances/use-cases';

export class ListDisappearancesService implements ListDisappearancesUseCase {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(
    params?: ListDisappearancesParamsDto,
  ): Promise<DisappearanceModel[]> {
    const disappearances = await this.disappearancesRepository.findAll(params);

    return disappearances;
  }
}
