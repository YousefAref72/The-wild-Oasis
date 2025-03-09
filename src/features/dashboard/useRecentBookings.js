import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../API/bookingsApi";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDaysPast = +(searchParams.get("last") || 7);
  const queryDate = subDays(new Date(), numDaysPast).toISOString();

  console.log(queryDate);
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numDaysPast}`],
    queryFn: () => getBookingsAfterDate({ date: queryDate }),
  });
  return { isLoading, bookings };
}

export default useRecentBookings;
