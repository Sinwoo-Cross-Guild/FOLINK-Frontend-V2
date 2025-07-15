import { http } from "@/apis"

export const requestPdfUpload = async (
  file: File,
  onUploadProgress?: (progressEvent: { loaded: number; total: number }) => void
) => {
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
};