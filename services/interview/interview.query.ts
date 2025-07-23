import { queryOptions } from "@tanstack/react-query";
import { getInterviewList } from "./interview.api";

export const interviewQuery = {
  list: (conversationId: number) =>
    queryOptions({
      queryKey: ["interviewList", conversationId],
      queryFn: () => getInterviewList(conversationId),
      enabled: !!conversationId,
    }),
};