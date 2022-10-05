"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = __importDefault(require("./user"));
const resolvers = {
    Query: Object.assign({ port: () => `I'm on port ${process.env.PORT}` }, user_1.default.Query)
};
exports.resolvers = resolvers;
//# sourceMappingURL=index.js.map