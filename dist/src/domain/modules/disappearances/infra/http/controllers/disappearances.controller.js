"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisappearancesController = void 0;
var deleteDisappearance_service_1 = require("./../../../services/deleteDisappearance.service");
var updateDisappearance_service_1 = require("./../../../services/updateDisappearance.service");
var createDisappearanceService_service_1 = require("./../../../services/createDisappearanceService.service");
var listDisappearances_service_1 = require("./../../../services/listDisappearances.service");
var ICreateDisappearanceDTO_1 = require("../../../dtos/ICreateDisappearanceDTO");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var disappearance_entity_1 = require("../typeorm/entities/disappearance.entity");
var DisappearancesController = /** @class */ (function () {
    function DisappearancesController(listDisappearanceService, createDisappearanceService, updateDisappearanceService, deleteDisappearanceService) {
        this.listDisappearanceService = listDisappearanceService;
        this.createDisappearanceService = createDisappearanceService;
        this.updateDisappearanceService = updateDisappearanceService;
        this.deleteDisappearanceService = deleteDisappearanceService;
    }
    DisappearancesController.prototype.list = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.listDisappearanceService.execute(params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    DisappearancesController.prototype.create = function (data, request) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = request.user.id;
                        return [4 /*yield*/, this.createDisappearanceService.execute(__assign(__assign({}, data), { user_id: user_id }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    DisappearancesController.prototype.update = function (id, data, request) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = request.user.id;
                        return [4 /*yield*/, this.updateDisappearanceService.execute(id, __assign(__assign({}, data), { user_id: user_id }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    DisappearancesController.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteDisappearanceService.execute(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Get)('/'),
        (0, common_1.HttpCode)(200),
        (0, swagger_1.ApiTags)('disappearances'),
        (0, swagger_1.ApiOkResponse)({
            schema: {
                items: { $ref: (0, swagger_1.getSchemaPath)(disappearance_entity_1.Disappearance) },
            },
        }),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DisappearancesController.prototype, "list", null);
    __decorate([
        (0, common_1.Post)('/'),
        (0, common_1.HttpCode)(201),
        (0, swagger_1.ApiTags)('disappearances'),
        (0, swagger_1.ApiCreatedResponse)({
            description: 'The disappearance has been successfully created.',
            type: disappearance_entity_1.Disappearance,
        }),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [ICreateDisappearanceDTO_1.ICreateDisappearanceDTO, Object]),
        __metadata("design:returntype", Promise)
    ], DisappearancesController.prototype, "create", null);
    __decorate([
        (0, common_1.Put)('/:id'),
        (0, common_1.HttpCode)(200),
        (0, swagger_1.ApiTags)('disappearances'),
        (0, swagger_1.ApiOkResponse)({
            description: 'The disappearance has been successfully updated.',
            type: disappearance_entity_1.Disappearance,
        }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __param(2, (0, common_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, ICreateDisappearanceDTO_1.ICreateDisappearanceDTO, Object]),
        __metadata("design:returntype", Promise)
    ], DisappearancesController.prototype, "update", null);
    __decorate([
        (0, common_1.Delete)('/:id'),
        (0, common_1.HttpCode)(204),
        (0, swagger_1.ApiTags)('disappearances'),
        (0, swagger_1.ApiNoContentResponse)({
            description: 'The disappearance has been successfully deleted.',
        }),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DisappearancesController.prototype, "delete", null);
    DisappearancesController = __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Controller)('disappearances'),
        __metadata("design:paramtypes", [listDisappearances_service_1.ListDisappearancesService,
            createDisappearanceService_service_1.CreateDisappearanceService,
            updateDisappearance_service_1.UpdateDisappearanceService,
            deleteDisappearance_service_1.DeleteDisappearanceService])
    ], DisappearancesController);
    return DisappearancesController;
}());
exports.DisappearancesController = DisappearancesController;
//# sourceMappingURL=disappearances.controller.js.map