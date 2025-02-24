import axiosInstance from "./axiosInstance";

const getBookings = async (filter, sort) => {
  console.log(filter);
  const data = await axiosInstance(
    `/bookings/?${filter || ""}${sort ? "&" + sort : ""}`
  );
  return data.data.data.bookings;
};

export { getBookings };
