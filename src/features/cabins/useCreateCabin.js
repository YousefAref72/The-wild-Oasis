import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../API/cabinsApi";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("The cabin got created successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, createCabin };
}

export default useCreateCabin;
