import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../API/authApi";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const resetCookie = (user) => {
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
};
function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess(data) {
      resetCookie(data.data);
      toast.success("Your profile got updated successfully");
      queryClient.invalidateQueries();
    },
    onError(err) {
      console.log(err);
      toast.error("Couldn't update :(");
    },
  });
  return { updateUser, isUpdating };
}

export default useUpdateUser;
