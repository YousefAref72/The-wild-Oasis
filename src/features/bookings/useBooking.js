import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../API/bookingsApi";

export default function useBooking() {
  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { isLoading, error, bookings };
}
