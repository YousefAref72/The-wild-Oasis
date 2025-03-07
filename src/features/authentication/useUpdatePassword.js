import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../API/authApi";
import toast from "react-hot-toast";
function useUpdatePassword() {
  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess() {
      toast.success("Successfully changed your password");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { updatePassword, isLoading };
}

export default useUpdatePassword;
