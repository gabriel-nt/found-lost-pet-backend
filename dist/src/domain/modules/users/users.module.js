"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./infra/typeorm/entities/user.entity");
var createUser_service_1 = require("./services/createUser.service");
var refreshToken_service_1 = require("./services/refreshToken.service");
var users_controller_1 = require("./infra/http/controllers/users.controller");
var authenticateUser_service_1 = require("./services/authenticateUser.service");
var users_repository_1 = require("./infra/typeorm/repositories/users.repository");
var DateProvider_1 = require("../../../infra/provider/DateProvider");
var authenticate_controller_1 = require("./infra/http/controllers/authenticate.controller");
var userTokens_repository_1 = require("./infra/typeorm/repositories/userTokens.repository");
var updateUser_service_1 = require("./services/updateUser.service");
var usersTokens_entity_1 = require("./infra/typeorm/entities/usersTokens.entity");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        (0, common_1.Module)({
            imports: [DateProvider_1.DateProviderModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, usersTokens_entity_1.UserTokens])],
            controllers: [users_controller_1.UsersController, authenticate_controller_1.AuthenticateController],
            providers: [
                users_repository_1.UsersRepository,
                createUser_service_1.CreateUserService,
                updateUser_service_1.UpdateUserService,
                userTokens_repository_1.UserTokensRepository,
                authenticateUser_service_1.AuthenticateUserService,
                refreshToken_service_1.RefreshTokenService,
            ],
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map