import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCabins } from "../../API/cabinsApi";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: removeCabins,
    onSuccess: () => {
      toast.success("the cabin was removed successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error("Coudn't delete the cabin"),
  });
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
