import { http } from "@/apis"

export const requestPdfUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await http.post("/question-sets/generate-by-pdf", formData);
  return data;
};