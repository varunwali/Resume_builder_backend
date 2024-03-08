import express from "express";
import {
  login,
  signup,
  logout,
  getUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

export default router;
