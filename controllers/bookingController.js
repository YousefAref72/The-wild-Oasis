import {
  editBooking,
  removeBooking,
  retrieveBookings,
  retrieveBookingsAfterDate,
} from "../database/bookingDatabase.js";
import catchAsync from "../utils/catchAsync.js";
import {
  fieldsQueryHandler,
  filtersQueryHandler,
  sortQueryHandler,
} from "../utils/helpers.js";
import AppError from "../utils/AppError.js";

const validFields = [
  "booking_id",
  "b.created_at",
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
  const sort = sortQueryHandler(req.query, validFields);

  delete req.query.sort;
  const fields = fieldsQueryHandler(req.query, validFields);

  delete req.query.fields;

  const page = req.query.page || 1;
  delete req.query.page;

  const filters = filtersQueryHandler(req.query, validFields);
  const bookings = await retrieveBookings(fields, filters, sort, page);

  res.status(200).json({
    status: "successful",
    results: bookings?.length,
    data: { bookings },
  });
});

const getBookingsAfterDate = catchAsync(async (req, res, next) => {
  const { date } = req.body;
  const fields = fieldsQueryHandler(req.query, validFields);
  console.log(req.query.fields);
  delete req.query.fields;
  const bookings = await retrieveBookingsAfterDate(date, fields);
  res.status(200).json({
    status: "successful",
    results: bookings?.length,
    data: { bookings },
  });
});

const updateBooking = catchAsync(async (req, res, next) => {
  let {
    start_date,
    end_date,
    num_nights,
    num_guests,
    cabin_price,
    total_price,
    status,
    is_paid,
    has_breakfast,
    observations,
  } = req.body;
  const { id: booking_id } = req.params;

  const toBeUpdated = {
    start_date,
    end_date,
    num_nights,
    num_guests,
    cabin_price,
    total_price,
    status,
    is_paid,
    has_breakfast,
    observations,
  };

  const results = await editBooking(toBeUpdated, booking_id);
  if (results.severity === "ERROR") {
    return next(new AppError("couldn't Update this Booking", 400));
  }
  res.status(200).json({
    status: "successful",
    data: { results },
  });
});

const deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const results = await removeBooking(id);
  if (results.severity === "ERROR") {
    return next(new AppError("couldn't Delete this Booking", 400));
  }
  res.status(204).json({
    status: "successful",
  });
});

export { getBookings, updateBooking, deleteBooking, getBookingsAfterDate };
