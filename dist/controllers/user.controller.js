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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = exports.Register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const errors_1 = require("./../utils/errors");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname } = req.body;
    try {
        const user = yield user_model_1.default.create({
            email,
            password,
            firstname,
            lastname,
        });
        res.status(201).json({ user: user.email + " Created" });
    }
    catch (err) {
        const errors = (0, errors_1.signUpErrors)(err);
        res.status(400).json({ errors });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findByCredentials(email, password);
        const token = CreateToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 604600,
        });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = (0, errors_1.signInErrors)(err);
        res.status(400).json({ errors });
    }
});
exports.Login = Login;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 1,
    });
    res.status(200).json({ message: "Logout" });
});
exports.Logout = Logout;
//# sourceMappingURL=user.controller.js.map