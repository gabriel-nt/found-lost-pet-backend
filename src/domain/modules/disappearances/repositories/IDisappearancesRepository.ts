import { IListDisappearancesParams } from './../dtos/IListDisappearancesParams';
import { Disappearance } from '../infra/http/typeorm/entities/disappearance.entity';
import { ICreateDisappearanceDTO } from './../dtos/ICreateDisappearanceDTO';

export interface IDisappearancesRepository {
  createDisappearance(data: ICreateDisappearanceDTO): Promise<Disappearance>;
  findById(id: string): Promise<Disappearance | undefined>;
  updateDisappearance(
    id: string,
    data: ICreateDisappearanceDTO,
  ): Promise<Disappearance>;
  findAll(params: IListDisappearancesParams): Promise<Disappearance[]>;
  findByName(name: string): Promise<Disappearance>;
  deleteDisappearance(id: string): Promise<void>;
  findByUser(
    params: IListDisappearancesParams & {
      user_id: string;
    },
  ): Promise<Disappearance[]>;
}
