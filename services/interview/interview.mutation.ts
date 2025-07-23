import { RequestInterviewType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { requestInterview } from "./interview.api";

export const useRequestInterviewMutation = () => {
  return useMutation({
    mutationFn: ({ conversationId, interview }: { 
      conversationId: number; 
      interview: RequestInterviewType 
    }) => requestInterview(conversationId, interview)
  });
};
