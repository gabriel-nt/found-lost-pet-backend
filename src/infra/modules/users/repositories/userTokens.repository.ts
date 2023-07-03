import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserTokens } from '../entities/userTokens.entity';
import { CreateUserTokenDto } from './../../../../domain/modules/users/dtos';
import { UserTokensRepository as UserTokensRepositoryInterface } from '../../../../domain/modules/users/repositories';

@Injectable()
export class UserTokensRepository implements UserTokensRepositoryInterface {
  constructor(
    @InjectRepository(UserTokens)
    private repository: Repository<UserTokens>,
  ) {}

  async createToken({
    user_id,
    expires_date,
    refresh_token,
  }: CreateUserTokenDto): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
