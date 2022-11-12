"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentConfigModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var environment_config_service_1 = require("./environment-config.service");
var EnvironmentConfigModule = /** @class */ (function () {
    function EnvironmentConfigModule() {
    }
    EnvironmentConfigModule = __decorate([
        (0, common_1.Module)({
            imports: [config_1.ConfigModule.forRoot()],
            providers: [environment_config_service_1.EnvironmentConfigService],
            exports: [environment_config_service_1.EnvironmentConfigService],
        })
    ], EnvironmentConfigModule);
    return EnvironmentConfigModule;
}());
exports.EnvironmentConfigModule = EnvironmentConfigModule;
//# sourceMappingURL=environment-config.module.js.map