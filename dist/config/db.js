"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database = () => {
    mongoose_1.default
        .connect('mongodb+srv://'
        + process.env.GROUP
        + ':'
        + process.env.PASSWORD
        + '@'
        + process.env.DATABASE
        + '/'
        + process.env.PROJECT)
        .then(() => {
        console.log("[server]: Connect to MongoDB");
    })
        .catch((err) => {
        console.log("[server]: Failed to connect to MongoDB", err);
    });
};
exports.database = database;
//# sourceMappingURL=db.js.map