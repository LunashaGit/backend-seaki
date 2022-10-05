"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const typeDefs = (0, graphql_tag_1.default) `
      type Query{
        port: String!
      }
`;
exports.typeDefs = typeDefs;
//# sourceMappingURL=typeDefs.js.map