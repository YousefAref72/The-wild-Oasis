import express from "express";
import {
  createCabin,
  getCabins,
  deleteCabin,
} from "../controllers/cabinController.js";

const router = express.Router();

router.route("/").get(getCabins).post(createCabin);
router.route("/:id").delete(deleteCabin);
export default router;
