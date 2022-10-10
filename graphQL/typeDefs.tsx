import gql from "graphql-tag";

const typeDefs = gql`
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

export { typeDefs };
