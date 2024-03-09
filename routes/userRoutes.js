import express from "express";
import {
  login,
  signup,
  logout,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
