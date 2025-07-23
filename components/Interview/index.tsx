"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { interviewQuery } from "@/services/interview/interview.query";
import { questionQuery } from "@/services/question/question.query";
import Aside from "./Aside";

interface Message {
  content: string;
  type: "ai" | "user";
  evaluatorFeedback: string | null;
  id: number;
  createdAt: string;
}

interface InterviewData {
  originalQuestionId: string;
  originalQuestionText: string;
  questionType: string;
  status: string;
  id: number;
  createdAt: string;
  messages: Message[];
}

interface CommonQuestionType {
  id: number;
  title: string;
  question: string;
  purpose: string;
  conversationId: number;
  projectName?: string;
  stackName?: string;
}

interface GroupedQuestions {
  projectQuestions: { [key: string]: CommonQuestionType[] };
  techStackQuestions: { [key: string]: CommonQuestionType[] };
}

const InterviewChat = () => {
  const params = useParams();
  const router = useRouter();
  const conversationId = Number(params.conversationId);
  const questionSetId = Number(params.questionSetId);

  // 질문 데이터 가져오기
  const { data: questionsData, isLoading: isQuestionsLoading, error: questionsError } = useQuery(
    questionQuery.detail(questionSetId)
  );

  // 인터뷰 데이터 가져오기
  const { data: response, isLoading: isInterviewLoading, error: interviewError } = useQuery(
    interviewQuery.list(conversationId)
  );

  // 질문 그룹핑
  const groupedQuestions = React.useMemo(() => {
    if (!questionsData) return undefined;

    const { projectQuestions, techStackQuestions } = questionsData;

    const groupBy = (list: any[], key: string): { [key: string]: CommonQuestionType[] } =>
      list.reduce((acc: { [key: string]: CommonQuestionType[] }, item) => {
        const groupKey = item[key];
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push({
          id: item.id,
          title: item[key],
          question: item.question,
          purpose: item.purpose,
          conversationId: item.conversationId,
        });
        return acc;
      }, {});

    return {
      projectQuestions: groupBy(projectQuestions, "projectName"),
      techStackQuestions: groupBy(techStackQuestions, "stackName"),
    };
  }, [questionsData]);

  if (isQuestionsLoading || isInterviewLoading) {
    return <div>로딩 중...</div>;
  }

  if (questionsError || interviewError) {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  if (!response?.data || !groupedQuestions) {
    return <div>데이터가 없습니다.</div>;
  }

  const interviewData: InterviewData = response.data;

  return (
    <div>
      {/* Aside 컴포넌트 */}
      <Aside
        questionSetId={questionSetId}
        groupedQuestions={groupedQuestions}
        conversationId={conversationId}
      />

      {/* 메인 컨텐츠 */}
      <main>
        <h1>
          {interviewData.questionType}: {interviewData.originalQuestionText}
        </h1>
        <p>
          ID: {interviewData.originalQuestionId} | 상태: {interviewData.status}
        </p>
        <div>
          <h3>대화 내용</h3>
          {interviewData.messages.map((message) => (
            <div key={message.id}>
              <div>
                <strong>{message.type === "user" ? "지원자" : "AI 면접관"}</strong>
                <span>
                  {" - "}
                  {new Date(message.createdAt).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p>{message.content}</p>
              {message.evaluatorFeedback && (
                <div>
                  <strong>평가자 피드백:</strong>
                  <p>{message.evaluatorFeedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InterviewChat;