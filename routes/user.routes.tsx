import * as rtr from "express";
import * as authController from "./../controllers/auth.controller";

const router = rtr.Router();

router.post("/register", authController.Register);
router.post("/login", authController.Login);
router.get("/logout", authController.Logout);

export default router;
