"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisappearancesModule = void 0;
var deleteDisappearance_service_1 = require("./services/deleteDisappearance.service");
var updateDisappearance_service_1 = require("./services/updateDisappearance.service");
var createDisappearanceService_service_1 = require("./services/createDisappearanceService.service");
var listDisappearances_service_1 = require("./services/listDisappearances.service");
var disappearances_controller_1 = require("./infra/http/controllers/disappearances.controller");
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var disappearance_entity_1 = require("./infra/http/typeorm/entities/disappearance.entity");
var disappearances_repository_1 = require("./infra/http/typeorm/repositories/disappearances.repository");
var DisappearancesModule = /** @class */ (function () {
    function DisappearancesModule() {
    }
    DisappearancesModule = __decorate([
        (0, common_1.Module)({
            controllers: [disappearances_controller_1.DisappearancesController],
            imports: [typeorm_1.TypeOrmModule.forFeature([disappearance_entity_1.Disappearance])],
            providers: [
                disappearances_repository_1.DisappearancesRepository,
                listDisappearances_service_1.ListDisappearancesService,
                createDisappearanceService_service_1.CreateDisappearanceService,
                updateDisappearance_service_1.UpdateDisappearanceService,
                deleteDisappearance_service_1.DeleteDisappearanceService,
            ],
        })
    ], DisappearancesModule);
    return DisappearancesModule;
}());
exports.DisappearancesModule = DisappearancesModule;
//# sourceMappingURL=disappearances.module.js.map