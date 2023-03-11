import {Router} from "express";
const router = new Router();
import {register, login, getMe} from "../controllers/auth.js";
import {checkAuth} from "../utils/checkAuth.js";

// REGISTRATION

router.post("/register", register)

// LOGIN
router.post("/login", login)

// GET ME
router.get("/me", checkAuth, getMe)

export default router