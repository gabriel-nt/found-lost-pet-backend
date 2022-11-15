import { IDisappearancesRepository } from './../../../../repositories/IDisappearancesRepository';
import { ICreateDisappearanceDTO } from './../../../../dtos/ICreateDisappearanceDTO';
import { IListDisappearancesParams } from './../../../../dtos/IListDisappearancesParams';

import { Between, Repository } from 'typeorm';

import { Disappearance } from '../entities/disappearance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DisappearancesRepository implements IDisappearancesRepository {
  constructor(
    @InjectRepository(Disappearance)
    private repository: Repository<Disappearance>,
  ) {}

  async findAll({
    type,
    finalDate,
    initialDate,
    situation,
  }: IListDisappearancesParams): Promise<Disappearance[]> {
    const disappearances = await this.repository.find({
      where: {
        type,
        situation,
        updated_at:
          finalDate &&
          initialDate &&
          Between(new Date(finalDate), new Date(initialDate)),
      },
      relations: ['user'],
    });

    return disappearances;
  }

  async findByUser({
    type,
    finalDate,
    initialDate,
    situation,
    user_id,
  }: IListDisappearancesParams & {
    user_id: string;
  }): Promise<Disappearance[]> {
    const disappearances = await this.repository.find({
      where: {
        type,
        situation,
        user_id,
        updated_at:
          finalDate &&
          initialDate &&
          Between(new Date(finalDate), new Date(initialDate)),
      },
      relations: ['user'],
    });

    return disappearances;
  }

  async findById(id: string): Promise<Disappearance> {
    const pet = await this.repository.findOne({
      where: {
        id,
      },
    });

    return pet;
  }

  async findByName(name: string): Promise<Disappearance> {
    const pet = await this.repository.findOne({
      where: {
        name,
      },
    });

    return pet;
  }

  async createDisappearance({
    city,
    description,
    latitude,
    longitude,
    name,
    situation,
    type,
    uf,
    image,
    user_id,
  }: ICreateDisappearanceDTO): Promise<Disappearance> {
    const pet = this.repository.create({
      city,
      description,
      name,
      uf,
      type,
      latitude,
      longitude,
      situation,
      user_id,
      image,
    });

    await this.repository.save(pet);

    return pet;
  }

  async updateDisappearance(
    id: string,
    {
      city,
      description,
      latitude,
      longitude,
      name,
      situation,
      type,
      uf,
      user_id,
      image,
    }: ICreateDisappearanceDTO,
  ): Promise<Disappearance> {
    const pet = await this.repository.findOne({
      where: {
        id,
      },
    });

    Object.assign(pet, {
      city,
      description,
      latitude,
      longitude,
      name,
      situation,
      type,
      uf,
      image,
      user_id,
    });

    await this.repository.save(pet);

    return pet;
  }

  async deleteDisappearance(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
