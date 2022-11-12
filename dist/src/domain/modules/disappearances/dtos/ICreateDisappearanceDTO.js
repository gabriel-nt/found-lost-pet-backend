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
exports.ICreateDisappearanceDTO = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var ICreateDisappearanceDTO = /** @class */ (function () {
    function ICreateDisappearanceDTO() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], ICreateDisappearanceDTO.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], ICreateDisappearanceDTO.prototype, "description", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], ICreateDisappearanceDTO.prototype, "situation", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], ICreateDisappearanceDTO.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Number)
    ], ICreateDisappearanceDTO.prototype, "latitude", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Number)
    ], ICreateDisappearanceDTO.prototype, "longitude", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], ICreateDisappearanceDTO.prototype, "city", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], ICreateDisappearanceDTO.prototype, "uf", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], ICreateDisappearanceDTO.prototype, "user_id", void 0);
    return ICreateDisappearanceDTO;
}());
exports.ICreateDisappearanceDTO = ICreateDisappearanceDTO;
//# sourceMappingURL=ICreateDisappearanceDTO.js.map