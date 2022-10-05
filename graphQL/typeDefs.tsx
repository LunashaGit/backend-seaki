import gql from "graphql-tag";

const typeDefs = gql`
      type Query{
        port: String!
      }
`

export { typeDefs };