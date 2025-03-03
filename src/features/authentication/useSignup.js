import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../API/authApi";
import toast from "react-hot-toast";
function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess() {
      toast.success("Successfully Added a new user");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { signup, isLoading };
}

export default useSignup;
