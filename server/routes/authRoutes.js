import express from "express";
import {
  handleLoginUp,
  handleLogout,
  handleSignUp,
  getTopScores,
  updateScore
} from "../controllers/authControllers.js";

const router = express.Router();
router.post("/login", handleLoginUp);
router.post("/signup", handleSignUp);
router.post("/logout", handleLogout);
router.patch('/update', updateScore);
router.get('/topscores', getTopScores);
export default router;
