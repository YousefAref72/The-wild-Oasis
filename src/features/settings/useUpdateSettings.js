import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSettings } from "../../API/settingsApi";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: editSettings,
    onSuccess: () => {
      toast.success("The settings got updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSettings };
}

export default useUpdateSettings;
