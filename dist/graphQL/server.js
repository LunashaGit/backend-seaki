"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_1 = require("apollo-server");
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers
});
exports.server = server;
//# sourceMappingURL=server.js.map