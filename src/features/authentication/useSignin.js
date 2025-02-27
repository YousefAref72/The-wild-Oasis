import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../API/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function useSignin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),

    onSuccess() {
      toast.success("Successfully loged in");
      queryClient.invalidateQueries({ active: true });
      navigate("/dashboard", { replace: true });
    },
    onError() {
      toast.error("Incorrect email or password");
    },
  });
  console.log(isLoading);
  return { login, isLoading };
}

export default useSignin;
