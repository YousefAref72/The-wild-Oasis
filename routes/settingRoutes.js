import express from "express";
import {
  getSettings,
  updateSetting,
} from "../controllers/settingsController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();
router.use(protect);
router.route("/").get(getSettings).put(updateSetting);

export default router;
