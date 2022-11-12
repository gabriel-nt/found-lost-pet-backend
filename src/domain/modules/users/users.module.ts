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
import { UserTokens } from './infra/typeorm/entities/usersTokens.entity';

@Module({
  imports: [DateProviderModule, TypeOrmModule.forFeature([User, UserTokens])],
  controllers: [UsersController, AuthenticateController],
  providers: [
    UsersRepository,
    CreateUserService,
    UpdateUserService,
    UserTokensRepository,
    AuthenticateUserService,
    RefreshTokenService,
  ],
})
export class UsersModule {}
