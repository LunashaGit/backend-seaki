"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = __importDefault(require("./user"));
const calendar_1 = __importDefault(require("./calendar"));
const resolvers = {
    Query: Object.assign(Object.assign({ port: () => `I'm on port ${process.env.PORT}` }, user_1.default.Query), calendar_1.default.Query),
    Mutation: Object.assign(Object.assign({}, user_1.default.Mutation), calendar_1.default.Mutation),
};
exports.resolvers = resolvers;
//# sourceMappingURL=index.js.map