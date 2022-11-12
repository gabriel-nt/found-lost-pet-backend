"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentConfigService = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var EnvironmentConfigService = /** @class */ (function () {
    function EnvironmentConfigService(configService) {
        this.configService = configService;
    }
    EnvironmentConfigService.prototype.getDatabaseHost = function () {
        return this.configService.get('DATABASE_HOST');
    };
    EnvironmentConfigService.prototype.getDatabasePort = function () {
        return this.configService.get('DATABASE_PORT');
    };
    EnvironmentConfigService.prototype.getDatabaseUser = function () {
        return this.configService.get('DATABASE_USER');
    };
    EnvironmentConfigService.prototype.getDatabasePassword = function () {
        return this.configService.get('DATABASE_PASSWORD');
    };
    EnvironmentConfigService.prototype.getDatabaseName = function () {
        return this.configService.get('DATABASE_NAME');
    };
    EnvironmentConfigService.prototype.getDatabaseSchema = function () {
        return this.configService.get('DATABASE_SCHEMA');
    };
    EnvironmentConfigService.prototype.getDatabaseSync = function () {
        return this.configService.get('DATABASE_SYNCHRONIZE');
    };
    EnvironmentConfigService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [config_1.ConfigService])
    ], EnvironmentConfigService);
    return EnvironmentConfigService;
}());
exports.EnvironmentConfigService = EnvironmentConfigService;
//# sourceMappingURL=environment-config.service.js.map