import express from "express";
import {
  deleteBooking,
  getBookings,
  updateBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.route("/").get(getBookings);
router.route("/:id").put(updateBooking).delete(deleteBooking);
export default router;
