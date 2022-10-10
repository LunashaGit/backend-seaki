import Users from "./user";
import Event from "./calendar";

const resolvers = {
  Query: {
    port: () => `I'm on port ${process.env.PORT}`,
    ...Users.Query,
    ...Event.Query,
  },
  Mutation: {
    ...Users.Mutation,
    ...Event.Mutation,
  },
};

export { resolvers };
