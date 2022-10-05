import Users from "./user"

const resolvers = {
    Query: {
      port:()=>`I'm on port ${process.env.PORT}`,
      ...Users.Query
    }
  }

export { resolvers };