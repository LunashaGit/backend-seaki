import Users from "./../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export = {
    Query: {
        async getUsers() {
            return await Users.find();
        }
    },
    Mutation: {
        async register(
            _: string, 
            { 
                registerInput : { email , firstname, lastname, password },
            }: any,
        context: string,
        info: string
        ){
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
                ...res._doc,
                id: res._id,
                token,
            };
        }
    }
}