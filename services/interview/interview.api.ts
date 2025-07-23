import { http } from "@/apis"
import { RequestInterviewType } from "@/types";

export const requestInterview = async (conversationId: number, interview: RequestInterviewType) => {
  const { data } = await http.post(`/conversations/${conversationId}/messages`, interview);
  return data;
};

export const getInterviewList = async (conversationId: number) => {
  const { data } = await http.get(`/conversations/${conversationId}/messages`);
  return data;
};