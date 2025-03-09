import express from "express";
import {
  deleteBooking,
  getBookings,
  getBookingsAfterDate,
  updateBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.route("/").get(getBookings);
router.post("/afterdate", getBookingsAfterDate);
router.route("/:id").put(updateBooking).delete(deleteBooking);
export default router;
