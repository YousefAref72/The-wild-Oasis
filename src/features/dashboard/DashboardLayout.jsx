import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import { getCabins } from "../../API/cabinsApi";
import Stats from "./Stats";
import { useQuery } from "@tanstack/react-query";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1, bookings } = useRecentBookings();
  const {
    isLoading: isLoading2,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { data: cabins, isPending: isLoading3 } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  if (isLoading1 || isLoading2) return <Spinner />;
  // console.log();
  console.log(confirmedStays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings.data.bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.data.cabins.length}
      />
      <div>bookings</div>
      <div>chart duration</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
