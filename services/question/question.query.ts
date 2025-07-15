import { queryOptions } from "@tanstack/react-query";
import { ProjectQuestionType, TechStackQuestionType } from "@/types";
import { getQuestionList } from "./question.api";

interface QuestionSetData {
  projectQuestions: ProjectQuestionType[];
  techStackQuestions: TechStackQuestionType[];
}

export const questionQuery = {
  detail: <QuestionSetId extends number>(questionSetId: QuestionSetId) =>
    queryOptions<QuestionSetData>({
      queryKey: ["query.questionList", questionSetId],
      queryFn: async () => {
        const response = await getQuestionList(questionSetId);
        return {
          projectQuestions: response.data.projectQuestions,
          techStackQuestions: response.data.techStackQuestions,
        };
      },
    }),
};