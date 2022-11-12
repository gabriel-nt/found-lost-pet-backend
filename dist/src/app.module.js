"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var disappearances_module_1 = require("./domain/modules/disappearances/disappearances.module");
var common_1 = require("@nestjs/common");
var auth_middleware_1 = require("./infra/middleware/auth.middleware");
var typeorm_module_1 = require("./infra/config/typeorm/typeorm.module");
var comments_module_1 = require("./domain/modules/comments/comments.module");
var users_module_1 = require("./domain/modules/users/users.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes('/users/*', '/comments', '/disappearances');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_module_1.TypeOrmConfigModule,
                users_module_1.UsersModule,
                disappearances_module_1.DisappearancesModule,
                comments_module_1.CommentsModule,
            ],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map