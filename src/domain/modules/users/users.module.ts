import { GetUserService } from './services/getUser.service';
import { AddressController } from './infra/http/controllers/address.controller';
import { DeleteUserAddressService } from './services/deleteUserAddress.service';
import { UpdateUserAddressService } from './services/updateUserAddress.service';
import { CreateUserAddressService } from './services/createUserAddress.service';
import { UsersAddressRepository } from './infra/typeorm/repositories/usersAdress.repository';
import { UserAddress } from './infra/typeorm/entities/userAddress.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './infra/typeorm/entities/user.entity';
import { CreateUserService } from './services/createUser.service';
import { RefreshTokenService } from './services/refreshToken.service';
import { UsersController } from './infra/http/controllers/users.controller';
import { AuthenticateUserService } from './services/authenticateUser.service';
import { UsersRepository } from './infra/typeorm/repositories/users.repository';
import { DateProviderModule } from '../../../infra/provider/DateProvider';
import { AuthenticateController } from './infra/http/controllers/authenticate.controller';
import { UserTokensRepository } from './infra/typeorm/repositories/userTokens.repository';
import { UpdateUserService } from './services/updateUser.service';
import { UserTokens } from './infra/typeorm/entities/userTokens.entity';

@Module({
  imports: [
    DateProviderModule,
    TypeOrmModule.forFeature([User, UserTokens, UserAddress]),
  ],
  controllers: [UsersController, AuthenticateController, AddressController],
  providers: [
    UsersRepository,
    GetUserService,
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
