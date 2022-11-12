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
exports.Pet = void 0;
var crypto_1 = require("crypto");
var swagger_1 = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var Pet = /** @class */ (function () {
    function Pet() {
        if (!this.id) {
            this.id = (0, crypto_1.randomUUID)();
        }
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Pet.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Pet.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Pet.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Pet.prototype, "situation", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Pet.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Number)
    ], Pet.prototype, "latitude", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Number)
    ], Pet.prototype, "longitude", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Pet.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Pet.prototype, "uf", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Date)
    ], Pet.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Date)
    ], Pet.prototype, "updated_at", void 0);
    Pet = __decorate([
        (0, typeorm_1.Entity)('pets'),
        __metadata("design:paramtypes", [])
    ], Pet);
    return Pet;
}());
exports.Pet = Pet;
//# sourceMappingURL=pet.entity.js.map