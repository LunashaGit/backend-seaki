import gql from "graphql-tag";

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        firstname: String!
        lastname: String!
        isAdmin: Boolean!
    }
      type Query{
        port: String!
        getUsers: [User]
      }
`

export { typeDefs };