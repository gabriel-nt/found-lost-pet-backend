import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Disappearance } from '../entities/disappearance.entity';
import { CreateDisappearanceDto } from './../../../../domain/modules/disappearances/dtos/create-disappearance.dto';
import { ListDisappearancesParamsDto } from '../../../../domain/modules/disappearances/dtos';
import { DisappearancesRepository as DisappearancesRepositoryInterface } from './../../../../domain/modules/disappearances/repositories/disappearances.interface';

@Injectable()
export class DisappearancesRepository
  implements DisappearancesRepositoryInterface
{
  constructor(
    @InjectRepository(Disappearance)
    private repository: Repository<Disappearance>,
  ) {}

  async findAll({
    type,
    finalDate,
    initialDate,
    situation,
    limit,
    user_id,
  }: ListDisappearancesParamsDto): Promise<Disappearance[]> {
    const disappearances = await this.repository.find({
      where: {
        type,
        user_id,
        situation,
        updated_at:
          finalDate &&
          initialDate &&
          Between(new Date(finalDate), new Date(initialDate)),
      },
      order: {
        updated_at: 'DESC',
      },
      relations: ['user'],
      take: limit ?? 99999,
    });

    return disappearances;
  }

  async findById(id: string): Promise<Disappearance> {
    const disappearance = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    return disappearance;
  }

  async findByName(name: string): Promise<Disappearance> {
    const disappearance = await this.repository.findOne({
      where: {
        name,
      },
      relations: ['user'],
    });

    return disappearance;
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
    email,
    phone,
  }: CreateDisappearanceDto): Promise<Disappearance> {
    const disappearance = this.repository.create({
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
      email,
      phone,
    });

    await this.repository.save(disappearance);

    return disappearance;
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
      phone,
      user_id,
      image,
      email,
    }: CreateDisappearanceDto,
  ): Promise<Disappearance> {
    const disappearance = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    Object.assign(disappearance, {
      city,
      description,
      latitude,
      longitude,
      name,
      situation,
      type,
      uf,
      email,
      phone,
      image,
      user_id,
    });

    await this.repository.save(disappearance);

    return disappearance;
  }

  async deleteDisappearance(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
