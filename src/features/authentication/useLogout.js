import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const clearCookies = () => {
  Cookies.remove("user");
  Cookies.remove("token");
};
function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: clearCookies,
    onSuccess() {
      navigate("/login");
    },
    onError() {
      toast.error("Something wrong happend");
    },
  });
  return { logout, isLoggingOut };
}

export default useLogout;
