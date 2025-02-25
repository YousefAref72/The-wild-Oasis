import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../API/bookingsApi";
import { useSearchParams } from "react-router-dom";

export default function useBooking() {
  const [searchParams] = useSearchParams();
  const clientQuery = useQueryClient();
  // 1) Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all" ? null : `status=${filterValue}`;
  // 2) Sort
  const sortValue = searchParams.get("sort");
  const sort = !sortValue ? null : `sort=${sortValue}`;
  // 3) Pagination
  const pageValue = searchParams.get("page");
  const page = !pageValue ? null : `page=${pageValue}`;
  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings(filter, sort, page),
  });

  // Prefetching

  clientQuery.prefetchQuery({
    queryKey: ["bookings", filter, sort, Number(page) + 1],
    queryFn: () => getBookings(filter, sort, Number(page) + 1),
  });
  if (page > 1) {
    clientQuery.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings(filter, sort, page - 1),
    });
  }
  return { isLoading, error, bookings };
}
