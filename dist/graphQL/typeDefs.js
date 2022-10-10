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
  type Event {
    id: ID!
    name: String!
    date: String!
    description: String!
  }
  input RegisterInput {
    email: String!
    firstname: String!
    lastname: String!
    password: String!
  }
  type Query {
    port: String!
    getUsers: [User]
    currentUser: User
    getEvents: [Event]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createEvent(name: String!, date: String!, description: String!): Event!
  }
`;
exports.typeDefs = typeDefs;
//# sourceMappingURL=typeDefs.js.map