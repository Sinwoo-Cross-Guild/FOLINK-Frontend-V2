import { useMutation } from "@tanstack/react-query";
import { requestPdfUpload } from "./pdf.api";

export const usePdfUploadMutation = () => {
  return useMutation({
    mutationFn: ({ file, onUploadProgress }: { 
      file: File; 
      onUploadProgress?: (progressEvent: { loaded: number; total: number }) => void 
    }) => requestPdfUpload(file, onUploadProgress)
  });
};