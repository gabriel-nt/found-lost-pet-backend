"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var deleteComment_service_1 = require("./services/deleteComment.service");
var updateComment_service_1 = require("./services/updateComment.service");
var createCommentService_service_1 = require("./services/createCommentService.service");
var listComments_service_1 = require("./services/listComments.service");
var comments_controller_1 = require("./infra/http/comments.controller");
var comment_entity_1 = require("./infra/typeorm/entities/comment.entity");
var comments_repository_1 = require("./infra/typeorm/repositories/comments.repository");
var CommentsModule = /** @class */ (function () {
    function CommentsModule() {
    }
    CommentsModule = __decorate([
        (0, common_1.Module)({
            controllers: [comments_controller_1.CommentsController],
            imports: [typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment])],
            providers: [
                comments_repository_1.CommentsRepository,
                listComments_service_1.ListCommentsService,
                createCommentService_service_1.CreateCommentService,
                updateComment_service_1.UpdateCommentService,
                deleteComment_service_1.DeleteCommentService,
            ],
        })
    ], CommentsModule);
    return CommentsModule;
}());
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map