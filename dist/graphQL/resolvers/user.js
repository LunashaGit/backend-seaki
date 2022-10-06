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
module.exports = {
    Query: {
        getUsers() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield user_model_1.default.find();
            });
        }
    },
    Mutation: {
        register(_, { registerInput: { email, firstname, lastname, password }, }, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                password = yield bcrypt_1.default.hash(password, 8);
                const NewUser = new user_model_1.default({
                    email,
                    firstname,
                    lastname,
                    password,
                });
                const res = yield NewUser.save();
                const token = jsonwebtoken_1.default.sign({ id: res._id, email: res.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
                return Object.assign(Object.assign({}, res._doc), { id: res._id, token });
            });
        }
    }
};
//# sourceMappingURL=user.js.map