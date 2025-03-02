import { useQuery } from "@tanstack/react-query";

function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    // queryFn
  });
  return {};
}

export default useUser;
