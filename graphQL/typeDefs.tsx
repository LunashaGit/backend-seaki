import gql from "graphql-tag";

const typeDefs = gql`
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
`

export { typeDefs };