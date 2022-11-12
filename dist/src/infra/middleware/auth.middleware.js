"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var common_1 = require("@nestjs/common");
var auth_1 = __importDefault(require("../config/auth/auth"));
var AuthMiddleware = /** @class */ (function () {
    function AuthMiddleware() {
    }
    AuthMiddleware.prototype.use = function (request, _, next) {
        var authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.HttpException('Token missing', 401);
        }
        var _a = authHeader.split(' '), token = _a[1];
        try {
            var user_id = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret_token).sub;
            request.user = {
                id: user_id,
            };
            next();
        }
        catch (error) {
            throw new common_1.HttpException('Invalid token', 401);
        }
    };
    AuthMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], AuthMiddleware);
    return AuthMiddleware;
}());
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map