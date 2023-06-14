import Router from "express";
import { register, Login } from "../controller/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", Login);

export default router;
