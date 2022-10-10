import Users from "./../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

export = {
  Query: {
    async getUsers() {
      return await Users.find();
    },
  },
  Mutation: {
    async login(_: any, { email, password }: any) {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new UserInputError("User not found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        throw new UserInputError("Wrong password");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60,
      });
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _: string,
      { registerInput: { email, firstname, lastname, password } }: any,
      context: string,
      info: string
    ) {
      const user = await Users.findOne({ email });
      if (user) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 8);
      const NewUser = new Users({
        email,
        firstname,
        lastname,
        password,
      });

      const res = await NewUser.save();

      const token = jwt.sign(
        { id: res._id, email: res.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return {
        id: res._id,
        token,
        ...res._doc,
      };
    },
  },
};
