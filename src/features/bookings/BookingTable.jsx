import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBooking from "./useBooking";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
function BookingTable() {
  const { bookings, isLoading } = useBooking();

  if (isLoading) return <Spinner />;
  if (!bookings?.length) {
    return <Empty resource="bookings" />;
  }
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.booking_id} booking={booking} />
          )}
        />
        <Table.Footer>
          {/* TODO :: NEEDS TO BE CHANGED */}
          <Pagination count={24} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
