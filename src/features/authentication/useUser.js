import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const getUserFromCookies = () => JSON.parse(Cookies.get("user"));
function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserFromCookies,
  });
  return { user, isLoading };
}

export default useUser;
