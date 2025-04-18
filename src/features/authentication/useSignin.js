import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../API/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function saveUserToCookies(user) {
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
}

function saveTokenToCookies(token) {
  Cookies.set("token", JSON.stringify(token), { expires: 7 });
}

function useSignin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),

    onSuccess(data) {
      // saving user,token to cookies after successful login
      saveUserToCookies(data.data);
      saveTokenToCookies(data.token);
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
