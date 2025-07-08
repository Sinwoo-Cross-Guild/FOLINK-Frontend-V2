import { useMutation } from "@tanstack/react-query";
import { requestPdfUpload } from "./pdf.api";

export const usePdfUploadMutation = () => {
  return useMutation({
    mutationFn: requestPdfUpload,
  });
};