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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var common_1 = require("@nestjs/common");
var auth_1 = __importDefault(require("../../../../infra/config/auth/auth"));
var users_repository_1 = require("../infra/typeorm/repositories/users.repository");
var userTokens_repository_1 = require("../infra/typeorm/repositories/userTokens.repository");
var DayjsDateProvider_1 = require("../../../../infra/provider/DateProvider/implementations/DayjsDateProvider");
var RefreshTokenService = /** @class */ (function () {
    function RefreshTokenService(usersRepository, usersTokensRepository, dateProvider) {
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    }
    RefreshTokenService.prototype.execute = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, user_id, user, userToken, refresh_token, expires_date, newToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret_refresh_token), email = _a.email, user_id = _a.sub;
                        return [4 /*yield*/, this.usersRepository.findById(user_id)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new common_1.HttpException('User does not exists!', 400);
                        }
                        return [4 /*yield*/, this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)];
                    case 2:
                        userToken = _b.sent();
                        if (!userToken) {
                            throw new common_1.HttpException('Refresh Token does not exists!', 400);
                        }
                        return [4 /*yield*/, this.usersTokensRepository.deleteById(userToken.id)];
                    case 3:
                        _b.sent();
                        refresh_token = (0, jsonwebtoken_1.sign)({ email: email }, auth_1.default.secret_refresh_token, {
                            subject: user_id,
                            expiresIn: auth_1.default.expires_in_refresh_token,
                        });
                        expires_date = this.dateProvider.addDays(auth_1.default.expires_refresh_token_days);
                        return [4 /*yield*/, this.usersTokensRepository.createToken({
                                user_id: user_id,
                                expires_date: expires_date,
                                refresh_token: refresh_token,
                            })];
                    case 4:
                        _b.sent();
                        newToken = (0, jsonwebtoken_1.sign)({}, auth_1.default.secret_token, {
                            subject: user_id,
                            expiresIn: auth_1.default.expires_in_token,
                        });
                        return [2 /*return*/, {
                                refresh_token: refresh_token,
                                token: newToken,
                                user: {
                                    email: user.email,
                                    name: user.name,
                                },
                            }];
                }
            });
        });
    };
    RefreshTokenService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [users_repository_1.UsersRepository,
            userTokens_repository_1.UserTokensRepository,
            DayjsDateProvider_1.DayjsDateProvider])
    ], RefreshTokenService);
    return RefreshTokenService;
}());
exports.RefreshTokenService = RefreshTokenService;
//# sourceMappingURL=refreshToken.service.js.map