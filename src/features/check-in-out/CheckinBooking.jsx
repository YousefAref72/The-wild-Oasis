import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useSingleBooking from "../bookings/useSingleBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useEffect } from "react";
import useSettings from "../settings/useSettings";
import useCheckin from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-top: 20px;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useSingleBooking();

  const { checkin, isCheckingIn } = useCheckin();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => setConfirmPaid(booking?.is_paid), [booking]);
  if (isLoading || isCheckingIn || isLoadingSettings) return <Spinner />;

  const {
    booking_id,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
    full_name,
  } = booking[0];
  const optionalBreakfast = settings.setting.breakfast_price || 0;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        booking_id,
        breakfast: {
          has_breakfast: true,
          total_price: total_price || 0 + optionalBreakfast,
        },
      });
    } else checkin({ booking_id });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking_id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            id={booking_id}
            checked={addBreakfast}
            onChange={() => setAddBreakfast((state) => !state)}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id={booking_id}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((state) => !state)}
        >
          I confirm that {full_name} has paid the total amount of{" "}
          {formatCurrency(
            addBreakfast ? optionalBreakfast + total_price : total_price
          )}
          {addBreakfast &&
            `(${formatCurrency(total_price)} + ${formatCurrency(
              optionalBreakfast
            )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{booking_id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
