import { HttpException, Injectable } from '@nestjs/common';
import { DisappearancesRepository } from '../infra/http/typeorm/repositories/disappearances.repository';

@Injectable()
export class DeleteDisappearanceService {
  constructor(private disappearancesRepository: DisappearancesRepository) {}

  async execute(id: string): Promise<void> {
    const findPet = await this.disappearancesRepository.findById(id);

    if (!findPet) {
      throw new HttpException('Pet not found', 404);
    }

    await this.disappearancesRepository.deleteDisappearance(id);
  }
}
