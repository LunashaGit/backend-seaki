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
exports.requireAuth = exports.checkUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./../models/user.model"));
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.locals.user = null;
        next();
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.locals.user = null;
            res.cookie("jwt", "", { maxAge: 1 });
            next();
        }
        else {
            let user = yield user_model_1.default.findById(decodedToken.id);
            res.locals.user = user;
            next();
        }
    }));
};
exports.checkUser = checkUser;
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return "No token";
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
        }
        else {
            console.log(decodedToken.id);
            next();
        }
    }));
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.middleware.js.map