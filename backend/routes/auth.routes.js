import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import { refreshAccessTokenIfNeeded } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logOutUser);

router.use(refreshAccessTokenIfNeeded);

export default router;
