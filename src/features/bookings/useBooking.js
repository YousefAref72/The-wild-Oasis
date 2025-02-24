import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../API/bookingsApi";
import { useSearchParams } from "react-router-dom";

export default function useBooking() {
  const [searchParams] = useSearchParams();
  // 1) Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all" ? null : `status=${filterValue}`;
  // 2) Sort
  const sortValue = searchParams.get("sort");
  const sort = !sortValue ? null : `sort=${sortValue}`;

  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings(filter, sort),
  });
  return { isLoading, error, bookings };
}
