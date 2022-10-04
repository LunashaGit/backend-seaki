"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
dotenv_1.default.config({ path: "./config/.env" });
require("./config/db");
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("*", auth_middleware_1.checkUser);
app.get("/jwtid", auth_middleware_1.requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});
app.use("/api/user", user_routes_1.default);
app.listen(process.env.PORT, () => {
    console.log("Listen " + process.env.PORT);
});
//# sourceMappingURL=index.js.map