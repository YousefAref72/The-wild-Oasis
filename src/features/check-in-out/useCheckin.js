import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../API/bookingsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ booking_id, breakfast }) =>
      updateBooking(booking_id, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      }),

    onSuccess(data) {
      console.log(data);
      toast.success(
        `Booking#${data.data.results.booking_id} successfully checked in`
      );
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError() {
      toast.error("Couldn't check in the booking");
    },
  });
  return { checkin, isCheckingIn };
}

export default useCheckin;
