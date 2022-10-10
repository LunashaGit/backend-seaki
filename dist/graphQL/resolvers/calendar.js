"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const calendar_model_1 = __importDefault(require("./../../models/calendar.model"));
module.exports = {
    Query: {
        getEvents() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield calendar_model_1.default.find();
            });
        },
    },
    Mutation: {
        createEvent(_, { name, date, description }) {
            return __awaiter(this, void 0, void 0, function* () {
                const NewEvent = new calendar_model_1.default({
                    name,
                    date,
                    description,
                });
                const res = yield NewEvent.save();
                return Object.assign(Object.assign({}, res._doc), { id: res._id });
            });
        },
    },
};
//# sourceMappingURL=calendar.js.map