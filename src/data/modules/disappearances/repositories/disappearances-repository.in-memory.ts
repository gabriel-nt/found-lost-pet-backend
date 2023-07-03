import {
  CreateDisappearanceDto,
  ListDisappearancesParamsDto,
} from '../../../../domain/modules/disappearances/dtos';
import { DisappearanceModel } from '../../../../domain/modules/disappearances/models';
import { DisappearancesRepository } from '../../../../domain/modules/disappearances/repositories';

export class DisappearancesRepositoryInMemory
  implements DisappearancesRepository
{
  disappearances: DisappearanceModel[] = [];

  async createDisappearance(
    data: CreateDisappearanceDto,
  ): Promise<DisappearanceModel> {
    const disappearance: DisappearanceModel = {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      id: Math.random().toString(),
    };

    this.disappearances.push(disappearance);

    return disappearance;
  }

  async findById(id: string): Promise<DisappearanceModel> {
    const disappearance = this.disappearances.find(
      (disappearance) => disappearance.id === id,
    );

    return disappearance;
  }

  async updateDisappearance(
    id: string,
    data: CreateDisappearanceDto,
  ): Promise<DisappearanceModel> {
    const disappearance = this.disappearances.find(
      (disappearance) => disappearance.id === id,
    );

    const findIndex = this.disappearances.findIndex(
      (disappearance) => disappearance.id === id,
    );

    Object.assign(disappearance, {
      ...data,
    });

    this.disappearances[findIndex] = disappearance;

    return disappearance;
  }

  async findAll({
    user_id,
    finalDate,
    initialDate,
    limit,
    situation,
    type,
  }: ListDisappearancesParamsDto): Promise<DisappearanceModel[]> {
    const isBetweenDates = (date: Date) => {
      const currentDate = new Date(date);
      const endDate = new Date(finalDate);
      const startDate = new Date(initialDate);

      return (
        currentDate.getUTCMilliseconds() <= endDate.getUTCMilliseconds() ||
        currentDate.getUTCMilliseconds() >= startDate.getUTCMilliseconds()
      );
    };

    return this.disappearances
      .filter(
        (disappearance) =>
          (type && type === disappearance.type) ||
          (user_id && user_id === disappearance.user_id) ||
          (situation && situation === disappearance.situation) ||
          (finalDate &&
            initialDate &&
            isBetweenDates(disappearance.updated_at)),
      )
      .slice(0, limit || 10000);
  }

  async findByName(name: string): Promise<DisappearanceModel> {
    const disappearance = this.disappearances.find(
      (disappearance) => disappearance.name === name,
    );

    return disappearance;
  }

  async deleteDisappearance(id: string): Promise<void> {
    const disappearancesArray = new Set(this.disappearances);

    disappearancesArray.delete(
      this.disappearances.find((disappearance) => disappearance.id === id),
    );

    this.disappearances = Array.from(disappearancesArray);
  }
}
