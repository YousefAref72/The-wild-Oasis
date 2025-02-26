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

const updateBooking = async (id, obj) => {
  console.log(id, obj);
  const response = await axiosInstance.put(`/bookings/${id}`, obj);
  return response.data;
};

const deleteBooking = async (id) => {
  try {
    const response = await axiosInstance.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export { getBookings, getBooking, updateBooking, deleteBooking };
