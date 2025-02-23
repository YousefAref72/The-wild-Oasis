import { retrieveBookings } from "../database/bookingDatabase.js";
import catchAsync from "../utils/catchAsync.js";
import { fieldsQueryHandler, filtersQueryHandler } from "../utils/helpers.js";

const validFields = [
  "booking_id",
  "created_at",
  "start_date",
  "end_date",
  "num_nights",
  "num_guests",
  "cabin_price",
  "total_price",
  "status",
  "has_breakfast",
  "observations",
  "cabin_id",
  "guest_id",
];

const getBookings = catchAsync(async (req, res, next) => {
  const fields = fieldsQueryHandler(req.query, validFields);

  delete req.query.fields;

  const filters = filtersQueryHandler(req.query, validFields);
  const bookings = await retrieveBookings(fields, filters);

  res.status(200).json({
    status: "successful",
    results: bookings?.length,
    data: { bookings },
  });
});

export { getBookings };
