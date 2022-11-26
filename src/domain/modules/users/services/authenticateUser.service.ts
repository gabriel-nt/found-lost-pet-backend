import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { HttpException, Injectable } from '@nestjs/common';

import auth from '../../../../infra/config/auth/auth';
import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO';
import { IAuthenticateUserResponse } from '../dtos/IAuthenticateUserResponse';
import { UsersRepository } from '../infra/typeorm/repositories/users.repository';
import { UserTokensRepository } from '../infra/typeorm/repositories/userTokens.repository';
import { DayjsDateProvider } from '../../../../infra/provider/DateProvider/implementations/DayjsDateProvider';

@Injectable()
class AuthenticateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UserTokensRepository,
    private dateProvider: DayjsDateProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new HttpException('Email or password incorrect', 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Email or password incorrect', 400);
    }

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.createToken({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    return {
      token,
      refresh_token,
      user,
    };
  }
}

export { AuthenticateUserService };
