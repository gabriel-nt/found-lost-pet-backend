import { DisappearanceModel } from '../models';
import { CreateDisappearanceDto, ListDisappearancesParamsDto } from './../dtos';

export interface DisappearancesRepository {
  createDisappearance(
    data: CreateDisappearanceDto,
  ): Promise<DisappearanceModel>;
  findById(id: string): Promise<DisappearanceModel | undefined>;
  updateDisappearance(
    id: string,
    data: CreateDisappearanceDto,
  ): Promise<DisappearanceModel>;
  findAll(params: ListDisappearancesParamsDto): Promise<DisappearanceModel[]>;
  findByName(name: string): Promise<DisappearanceModel>;
  deleteDisappearance(id: string): Promise<void>;
}
