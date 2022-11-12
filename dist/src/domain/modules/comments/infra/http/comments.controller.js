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
exports.CommentsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var comment_entity_1 = require("../typeorm/entities/comment.entity");
var createCommentService_service_1 = require("../../services/createCommentService.service");
var listComments_service_1 = require("../../services/listComments.service");
var updateComment_service_1 = require("../../services/updateComment.service");
var deleteComment_service_1 = require("../../services/deleteComment.service");
var CommentsController = /** @class */ (function () {
    function CommentsController(createCommentService, listCommentsService, updateCommentService, deleteCommentService) {
        this.createCommentService = createCommentService;
        this.listCommentsService = listCommentsService;
        this.updateCommentService = updateCommentService;
        this.deleteCommentService = deleteCommentService;
    }
    CommentsController.prototype.list = function (disappearanceId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.listCommentsService.execute({
                            disappearanceId: disappearanceId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CommentsController.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createCommentService.execute(data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CommentsController.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateCommentService.execute(id, data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CommentsController.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteCommentService.execute(id)];
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
        (0, swagger_1.ApiTags)('comments'),
        (0, swagger_1.ApiOkResponse)({
            schema: {
                items: { $ref: (0, swagger_1.getSchemaPath)(comment_entity_1.Comment) },
            },
        }),
        __param(0, (0, common_1.Query)('disappearanceId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], CommentsController.prototype, "list", null);
    __decorate([
        (0, common_1.Post)('/'),
        (0, common_1.HttpCode)(201),
        (0, swagger_1.ApiTags)('comments'),
        (0, swagger_1.ApiCreatedResponse)({
            description: 'The comment has been successfully created.',
            type: comment_entity_1.Comment,
        }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], CommentsController.prototype, "create", null);
    __decorate([
        (0, common_1.Put)('/:id'),
        (0, common_1.HttpCode)(200),
        (0, swagger_1.ApiTags)('comments'),
        (0, swagger_1.ApiOkResponse)({
            description: 'The comment has been successfully updated.',
            type: comment_entity_1.Comment,
        }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], CommentsController.prototype, "update", null);
    __decorate([
        (0, common_1.Delete)('/:id'),
        (0, common_1.HttpCode)(204),
        (0, swagger_1.ApiTags)('comments'),
        (0, swagger_1.ApiNoContentResponse)({
            description: 'The comment has been successfully deleted.',
        }),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], CommentsController.prototype, "delete", null);
    CommentsController = __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Controller)('comments'),
        __metadata("design:paramtypes", [createCommentService_service_1.CreateCommentService,
            listComments_service_1.ListCommentsService,
            updateComment_service_1.UpdateCommentService,
            deleteComment_service_1.DeleteCommentService])
    ], CommentsController);
    return CommentsController;
}());
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map