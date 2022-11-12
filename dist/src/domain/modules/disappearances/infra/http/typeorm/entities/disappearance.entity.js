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
exports.Disappearance = void 0;
var crypto_1 = require("crypto");
var swagger_1 = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../../../../users/infra/typeorm/entities/user.entity");
var class_transformer_1 = require("class-transformer");
var Disappearance = /** @class */ (function () {
    function Disappearance() {
        if (!this.id) {
            this.id = (0, crypto_1.randomUUID)();
        }
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Disappearance.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Disappearance.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Disappearance.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Disappearance.prototype, "situation", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Disappearance.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Number)
    ], Disappearance.prototype, "latitude", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Number)
    ], Disappearance.prototype, "longitude", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Disappearance.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Disappearance.prototype, "uf", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_transformer_1.Exclude)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], Disappearance.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.JoinColumn)({
            name: 'user_id',
        }),
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", user_entity_1.User)
    ], Disappearance.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Date)
    ], Disappearance.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Date)
    ], Disappearance.prototype, "updated_at", void 0);
    Disappearance = __decorate([
        (0, typeorm_1.Entity)('disappearances'),
        __metadata("design:paramtypes", [])
    ], Disappearance);
    return Disappearance;
}());
exports.Disappearance = Disappearance;
//# sourceMappingURL=disappearance.entity.js.map