import axiosInstance from "./axiosInstance";

const getBookings = async () => {
  const data = await axiosInstance("/bookings");
  return data.data.data.bookings;
};

export { getBookings };
