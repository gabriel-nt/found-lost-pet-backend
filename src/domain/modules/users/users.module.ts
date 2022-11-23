import { PasswordController } from './infra/http/controllers/password.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './infra/typeorm/entities/user.entity';
import { GetUserService } from './services/getUser.service';
import { CreateUserService } from './services/createUser.service';
import { UpdateUserService } from './services/updateUser.service';
import { RefreshTokenService } from './services/refreshToken.service';
import { UserTokens } from './infra/typeorm/entities/userTokens.entity';
import { ResetPasswordService } from './services/resetPassword.service';
import { UserAddress } from './infra/typeorm/entities/userAddress.entity';
import { DateProviderModule } from '../../../infra/provider/DateProvider';
import { UsersController } from './infra/http/controllers/users.controller';
import { AuthenticateUserService } from './services/authenticateUser.service';
import { AddressController } from './infra/http/controllers/address.controller';
import { DeleteUserAddressService } from './services/deleteUserAddress.service';
import { UpdateUserAddressService } from './services/updateUserAddress.service';
import { CreateUserAddressService } from './services/createUserAddress.service';
import { UsersRepository } from './infra/typeorm/repositories/users.repository';
import { UserTokensRepository } from './infra/typeorm/repositories/userTokens.repository';
import { AuthenticateController } from './infra/http/controllers/authenticate.controller';
import { UsersAddressRepository } from './infra/typeorm/repositories/usersAdress.repository';

@Module({
  imports: [
    DateProviderModule,
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
    GetUserService,
    ResetPasswordService,
    CreateUserService,
    UpdateUserService,
    UserTokensRepository,
    AuthenticateUserService,
    RefreshTokenService,
    UsersAddressRepository,
    CreateUserAddressService,
    UpdateUserAddressService,
    DeleteUserAddressService,
  ],
})
export class UsersModule {}
