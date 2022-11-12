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
exports.DayjsDateProvider = void 0;
var common_1 = require("@nestjs/common");
var dayjs_1 = __importDefault(require("dayjs"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
var DayjsDateProvider = /** @class */ (function () {
    function DayjsDateProvider() {
    }
    DayjsDateProvider.prototype.dateNow = function () {
        return (0, dayjs_1.default)().toDate();
    };
    DayjsDateProvider.prototype.dateAddDay = function (date, days) {
        return (0, dayjs_1.default)(date).add(days, 'day').toDate();
    };
    DayjsDateProvider.prototype.convertToUTC = function (date) {
        return (0, dayjs_1.default)(date).utc().local().format();
    };
    DayjsDateProvider.prototype.addDays = function (days) {
        return (0, dayjs_1.default)().add(days, 'days').toDate();
    };
    DayjsDateProvider.prototype.addHours = function (hours) {
        return (0, dayjs_1.default)().add(hours, 'hours').toDate();
    };
    DayjsDateProvider.prototype.compareIfBefore = function (start_date, end_date) {
        return (0, dayjs_1.default)(start_date).isBefore(end_date);
    };
    DayjsDateProvider.prototype.compareInHours = function (start_date, end_date) {
        var end_date_utc = this.convertToUTC(end_date);
        var start_date_utc = this.convertToUTC(start_date);
        return (0, dayjs_1.default)(end_date_utc).diff(start_date_utc, 'hours');
    };
    DayjsDateProvider.prototype.compareInDays = function (start_date, end_date) {
        var end_date_utc = this.convertToUTC(end_date);
        var start_date_utc = this.convertToUTC(start_date);
        return (0, dayjs_1.default)(end_date_utc).diff(start_date_utc, 'days');
    };
    DayjsDateProvider = __decorate([
        (0, common_1.Injectable)()
    ], DayjsDateProvider);
    return DayjsDateProvider;
}());
exports.DayjsDateProvider = DayjsDateProvider;
//# sourceMappingURL=DayjsDateProvider.js.map