import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    usersdata: [User]
    userdata(_id: ID!): User
    userquotes: [QuoteWithName]
    iquotes(by: ID!): [Quote]
    userProfile: User
  }
  type QuoteWithName {
    name: String
    by: IdName
  }
  type IdName {
    _id: String
    firstName: String
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    myquotes: [Quote]
  }
  type Quote {
    name: String!
    by: ID!
  }

  type token{
    token: String!
  }

  type Mutation {
    signupUser(newUser: UserInput!): User
    signInUser(userSignIn: SignInInput!): token
    createQuotes(name: String!): String 
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input SignInInput{
    email: String!
    password: String!
  }
`;

export default typeDefs;
