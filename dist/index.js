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
const server_1 = require("./graphQL/server");
const db_1 = require("./config/db");
dotenv_1.default.config({ path: "./config/.env" });
server_1.server.listen({ port: process.env.PORT })
    .then(res => {
    console.log(`Server Apollo is running on ${process.env.PORT}`);
    (0, db_1.database)();
});
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
//# sourceMappingURL=index.js.map