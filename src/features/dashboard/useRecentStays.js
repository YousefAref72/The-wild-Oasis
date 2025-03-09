import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../API/bookingsApi";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDaysPast = +(searchParams.get("last") || 7);
  const queryDate = subDays(new Date(), numDaysPast).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", `last-${numDaysPast}`],
    queryFn: () => getStaysAfterDate({ date: queryDate }),
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");

  return { isLoading, stays, confirmedStays, numDays: numDaysPast };
}

export default useRecentStays;
