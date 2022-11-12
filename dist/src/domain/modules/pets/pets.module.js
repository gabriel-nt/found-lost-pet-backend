"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsModule = void 0;
var listPets_service_1 = require("./services/listPets.service");
var pets_repository_1 = require("./infra/http/typeorm/repositories/pets.repository");
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var pets_controller_1 = require("./infra/http/controllers/pets.controller");
var pet_entity_1 = require("./infra/http/typeorm/entities/pet.entity");
var PetsModule = /** @class */ (function () {
    function PetsModule() {
    }
    PetsModule = __decorate([
        (0, common_1.Module)({
            controllers: [pets_controller_1.PetsController],
            imports: [typeorm_1.TypeOrmModule.forFeature([pet_entity_1.Pet])],
            providers: [pets_repository_1.PetsRepository, listPets_service_1.ListPetsService],
        })
    ], PetsModule);
    return PetsModule;
}());
exports.PetsModule = PetsModule;
//# sourceMappingURL=pets.module.js.map