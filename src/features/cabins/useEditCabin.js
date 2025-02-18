import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin as editCabinApi } from "../../API/cabinsApi";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  // UPDATE mutation part

  const { isPending: isUpdating, mutate: editCabin } = useMutation({
    mutationFn: editCabinApi,
    onSuccess: () => {
      toast.success("The cabin got updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, editCabin };
}

export default useEditCabin;
