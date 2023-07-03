import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User, UserTokens, UserAddress } from './entities';
import { DateProviderModule } from '../../providers/date-provider';
import { JwtProviderModule } from './../../providers/jwt-provider';
import { AuthConfigService } from '../../config/auth/auth-config.service';
import { AuthConfigModule } from './../../config/auth/auth-config.module';

import { BcryptProviderModule } from './../../providers/bcrypt-provider';
import { JwtProvider } from './../../providers/jwt-provider/jwt.provider';

import {
  UsersRepository,
  UserTokensRepository,
  UsersAddressRepository,
} from './repositories';

import {
  UsersController,
  AddressController,
  PasswordController,
  AuthenticateController,
} from './http';

import {
  GetUserService,
  UpdateUserService,
  CreateUserService,
  RefreshTokenService,
  ResetPasswordService,
  AuthenticateUserService,
  CreateUserAddressService,
  DeleteUserAddressService,
  UpdateUserAddressService,
} from '../../../data/modules/users/services';
import { BcryptProvider } from '../../providers/bcrypt-provider/bcrypt.provider';
import { DayJsDateProvider } from '../../providers/date-provider/dayjs-date.provider';

@Module({
  imports: [
    JwtProviderModule,
    AuthConfigModule,
    DateProviderModule,
    BcryptProviderModule,
    TypeOrmModule.forFeature([User, UserTokens, UserAddress]),
  ],
  controllers: [
    UsersController,
    AuthenticateController,
    AddressController,
    PasswordController,
  ],
  providers: [
    UsersRepository,
    UserTokensRepository,
    UsersAddressRepository,
    {
      provide: 'GetUserUseCase',
      inject: [UsersRepository],
      useFactory: (repository: UsersRepository) =>
        new GetUserService(repository),
    },
    {
      provide: 'ResetPasswordUseCase',
      inject: [UsersRepository],
      useFactory: (repository: UsersRepository, provider: BcryptProvider) =>
        new ResetPasswordService(repository, provider),
    },
    {
      provide: 'CreateUserUseCase',
      inject: [UsersRepository, BcryptProvider],
      useFactory: (repository: UsersRepository, provider: BcryptProvider) =>
        new CreateUserService(repository, provider),
    },
    {
      provide: 'UpdateUserUseCase',
      inject: [UsersRepository],
      useFactory: (repository: UsersRepository) =>
        new UpdateUserService(repository),
    },
    {
      provide: 'AuthenticateUserUseCase',
      inject: [
        UsersRepository,
        UserTokensRepository,
        BcryptProvider,
        DayJsDateProvider,
        JwtProvider,
        AuthConfigService,
      ],
      useFactory: (
        repository: UsersRepository,
        userTokensRepository: UserTokensRepository,
        bcryptProvider: BcryptProvider,
        dateProvider: DayJsDateProvider,
        jwtProvider: JwtProvider,
        authConfig: AuthConfigService,
      ) =>
        new AuthenticateUserService(
          repository,
          userTokensRepository,
          dateProvider,
          bcryptProvider,
          jwtProvider,
          authConfig,
        ),
    },
    {
      provide: 'RefreshTokenUseCase',
      inject: [
        UsersRepository,
        UserTokensRepository,
        DayJsDateProvider,
        JwtProvider,
        AuthConfigService,
      ],
      useFactory: (
        repository: UsersRepository,
        userTokensRepository: UserTokensRepository,
        dateProvider: DayJsDateProvider,
        jwtProvider: JwtProvider,
        authConfig: AuthConfigService,
      ) =>
        new RefreshTokenService(
          repository,
          userTokensRepository,
          dateProvider,
          jwtProvider,
          authConfig,
        ),
    },
    {
      provide: 'CreateUserAddressUseCase',
      inject: [UsersRepository],
      useFactory: (repository: UsersAddressRepository) =>
        new CreateUserAddressService(repository),
    },
    {
      provide: 'UpdateUserAddressUseCase',
      inject: [UsersRepository],
      useFactory: (repository: UsersAddressRepository) =>
        new UpdateUserAddressService(repository),
    },
    {
      provide: 'DeleteUserAddressUseCase',
      inject: [UsersRepository],
      useFactory: (repository: UsersAddressRepository) =>
        new DeleteUserAddressService(repository),
    },
  ],
})
export class UsersModule {}
