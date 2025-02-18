import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../API/settingsApi";

function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, error, settings };
}

export default useSettings;
