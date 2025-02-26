import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../API/bookingsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (booking_id) =>
      updateBooking(booking_id, {
        status: "checked-out",
      }),

    onSuccess(data) {
      toast.success(
        `Booking#${data.data.results.booking_id} successfully checked Out`
      );
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError() {
      toast.error("Couldn't check out the booking");
    },
  });
  return { checkout, isCheckingOut };
}

export default useCheckout;
