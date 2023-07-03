import { HttpException } from '../../../../exceptions/http-exception';
import { DisappearanceModel } from '../../../../../domain/modules/disappearances/models';
import { DisappearancesRepository } from '../../../../../domain/modules/disappearances/repositories';
import { UpdateDisappearanceUseCase } from './../../../../../domain/modules/disappearances/use-cases';
import { UpdateDisappearanceDto } from '../../../../../domain/modules/disappearances/dtos/update-disappearance.dto';

export class UpdateDisappearanceService implements UpdateDisappearanceUseCase {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(
    id: string,
    data: UpdateDisappearanceDto,
  ): Promise<DisappearanceModel> {
    const findDisappearance = await this.disappearancesRepository.findById(id);

    if (!findDisappearance) {
      throw new HttpException('Disappearance not found', 404);
    }

    if (data.user_id !== findDisappearance.user_id) {
      throw new HttpException('Unauthorized', 401);
    }

    const pet = await this.disappearancesRepository.updateDisappearance(id, {
      ...findDisappearance,
      ...data,
    });

    return pet;
  }
}
