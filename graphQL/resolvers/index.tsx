const resolvers = {
    Query: {
      port:()=>`I'm on port ${process.env.PORT}` 
    }
  }

export { resolvers };