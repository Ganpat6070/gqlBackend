import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dbconnection from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// imports models here
import "./models/UsersSchema.js";
import "./models/QuotesSchema.js";

import resolvers from "./resolvers.js";
import typeDefs from "./schemaGQL.js";

dotenv.config();

// console.log(quotes);
const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_PASSWORD);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
server.listen().then(({ url }) => {
  console.log("server listening at: " + url);
});
