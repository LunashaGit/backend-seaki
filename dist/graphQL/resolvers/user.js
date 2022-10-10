"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_model_1 = __importDefault(require("./../../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
module.exports = {
    Query: {
        getUsers() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield user_model_1.default.find();
            });
        },
    },
    Mutation: {
        login(_, { email, password }) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    throw new apollo_server_1.UserInputError("User not found");
                }
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                console.log(isMatch);
                if (!isMatch) {
                    throw new apollo_server_1.UserInputError("Wrong password");
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: 3 * 24 * 60 * 60,
                });
                return Object.assign(Object.assign({}, user._doc), { id: user._id, token });
            });
        },
        register(_, { registerInput: { email, firstname, lastname, password } }, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield user_model_1.default.findOne({ email });
                if (user) {
                    throw new apollo_server_1.UserInputError("Email is taken", {
                        errors: {
                            email: "This email is taken",
                        },
                    });
                }
                password = yield bcrypt_1.default.hash(password, 8);
                const NewUser = new user_model_1.default({
                    email,
                    firstname,
                    lastname,
                    password,
                });
                const res = yield NewUser.save();
                const token = jsonwebtoken_1.default.sign({ id: res._id, email: res.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
                return Object.assign({ id: res._id, token }, res._doc);
            });
        },
    },
};
//# sourceMappingURL=user.js.map