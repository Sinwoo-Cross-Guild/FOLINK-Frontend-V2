import { useMutation } from "@tanstack/react-query";
import { http } from "@/apis";

export const usePdfUploadMutation = (
  onUploadProgress?: (progressEvent: { loaded: number; total: number }) => void
) => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const { data } = await http.post("/question-sets/generate-by-pdf", formData, {
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            onUploadProgress({
              loaded: progressEvent.loaded,
              total: progressEvent.total
            });
          }
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return data;
    },
  });
};