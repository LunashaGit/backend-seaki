"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const typeDefs = (0, graphql_tag_1.default) `
    type User {
        id: ID!
        email: String!
        firstname: String!
        lastname: String!
        isAdmin: Boolean!
    }
    input RegisterInput{
        email: String!
        firstname: String!
        lastname: String!
        password: String!
    }
    type Query{
        port: String!
        getUsers: [User]
        currentUser: User
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
    } 
`;
exports.typeDefs = typeDefs;
//# sourceMappingURL=typeDefs.js.map