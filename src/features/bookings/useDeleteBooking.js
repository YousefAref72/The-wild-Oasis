import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../API/bookingsApi";
import toast from "react-hot-toast";
function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess() {
      toast.success("The booking got deleted successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError() {
      toast.error("Couldn't delete the booking");
    },
  });

  return { deleteBooking, isDeleting };
}

export default useDeleteBooking;
