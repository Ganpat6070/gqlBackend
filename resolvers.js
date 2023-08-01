import { users, quotes } from "./fakedb.js";
import mongoose from "mongoose";
import UserSchema from "./models/UsersSchema.js";
import QuoteSchema from "./models/QuotesSchema.js";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//  _id: ID!        That means ID is unique and mandatory
const resolvers = {
  Query: {
    usersdata: async () => await UserSchema.find({}),
    userdata: async (_, { _id }) => await UserSchema.findById({ _id }),
    userquotes: async () =>
      await QuoteSchema.find({}).populate("by", "_id firstName"),
    iquotes: async (_, { by }) => await QuoteSchema.find({ by }),
    userProfile: async (_, args, { userId }) => {
      if (!userId) {
        throw new Error("User not found");
      }
      return await UserSchema.findOne({ _id: userId });
    },
  },
  User: {
    myquotes: async (ur) => await QuoteSchema.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { newUser }) => {
      // console.log(newUser);
      const user = await UserSchema.findOne({ email: newUser.email });
      if (user) {
        throw new Error("User already exists");
      }

      const hashPassword = await bcrypt.hash(newUser.password, 10);
      const userdata = new UserSchema({
        ...newUser,
        password: hashPassword,
      });
      return await userdata.save();
      // console.log(...newUser);
    },

    signInUser: async (_, { userSignIn }) => {
      const user = await UserSchema.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error("User not found");
      }

      const passwordAuth = await bcrypt.compare(
        userSignIn.password,
        user.password
      );
      if (!passwordAuth) {
        throw new Error("Invalid Authentication");
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_PASSWORD);
      return { token };
    },

    createQuotes: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      console.log(name, userId);

      const quotesData = new QuoteSchema({
        name,
        by: userId,
      });
      await quotesData.save();
      return "Quotes saved successfully";
    },
  },
};

export default resolvers;
