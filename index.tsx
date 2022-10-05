import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/user.routes";
import { checkUser, requireAuth } from "./middleware/auth.middleware";
import { server } from "./graphQL/server";
import { database } from "./config/db";
dotenv.config({ path: "./config/.env" });

server.listen({ port: process.env.PORT })
.then(res=> {
    console.log(`Server Apollo is running on ${process.env.PORT}`)
    database();
})

const app: Express = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/api/user", UserRoutes);

