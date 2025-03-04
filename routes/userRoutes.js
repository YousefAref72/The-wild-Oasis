import express from "express";
import {
  editUser,
  login,
  protect,
  signUp,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.use(protect);
router.put("/updatepassword", updatePassword);
router.put("/updateMe", editUser);
export default router;
