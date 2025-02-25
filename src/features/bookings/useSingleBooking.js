import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../API/bookingsApi";
import { useParams } from "react-router-dom";

export default function useBooking() {
  const booking_id = useParams();

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(booking_id.bookingId),
  });

  return { isLoading, error, booking };
}
