import axiosInstance from "./axiosInstance";

const getBookings = async (filter, sort, page) => {
  const data = await axiosInstance(
    `/bookings/?${filter || ""}${sort ? "&" + sort : ""}${
      page ? `&${page}` : ""
    }`
  );
  return data.data.data.bookings;
};

const getBooking = async (id) => {
  const data = await axiosInstance(`/bookings/?booking_id=${id}`);
  return data.data.data.bookings;
};

export { getBookings, getBooking };
