import { http } from "@/apis"

export const getQuestionList = async (questionSetId: number) => {
  const { data } = await http.get(`/question-sets/${questionSetId}`);
  return data;
};