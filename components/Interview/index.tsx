"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { interviewQuery } from "@/services/interview/interview.query";
import { questionQuery } from "@/services/question/question.query";
import { useRequestInterviewMutation } from "@/services/interview/interview.mutation";
import { InterviewDataType, CommonQuestionType, MessageType, RequestInterviewType } from "@/types";
import Aside from "./Aside";
import Form from "./Form";
import List from "./List";
import * as styles from "./style.css";

const getStatusBadge = (status: string) => {
  const statusConfig = {
    'end': { text: '완료', class: styles.chat.statusCompleted },
    'on_going': { text: '진행중', class: styles.chat.statusInProgress },
  };
  return statusConfig[status as keyof typeof statusConfig] || { text: status, class: styles.chat.statusDefault };
};

const InterviewChat = () => {
  const params = useParams();
  const conversationId = Number(params.conversationId);
  const questionSetId = Number(params.questionSetId);

  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [showTypingAnimation, setShowTypingAnimation] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);
  const [pendingAiMessage, setPendingAiMessage] = useState<MessageType | null>(null);

  const { data: questionsData, isLoading: isQuestionsLoading } = useQuery(
    questionQuery.detail(questionSetId)
  );

  const { data: response, isLoading: isInterviewLoading, refetch } = useQuery(
    interviewQuery.list(conversationId)
  );

  const requestInterviewMutation = useRequestInterviewMutation();

  const groupedQuestions = useMemo(() => {
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
        } as CommonQuestionType);
        return acc;
      }, {});

    return {
      projectQuestions: groupBy(projectQuestions, "projectName"),
      techStackQuestions: groupBy(techStackQuestions, "stackName"),
    };
  }, [questionsData]);

  const handleSendMessage = async (message: string) => {
    try {
      setPendingUserMessage(message);
      setIsWaitingResponse(true);

      await requestInterviewMutation.mutateAsync({
        conversationId,
        interview: { userResponse: message } as RequestInterviewType,
      });

      const updatedData = await refetch();
      setIsWaitingResponse(false);

      if (updatedData.data?.data?.messages) {
        const aiMessages = updatedData.data.data.messages.filter((msg: { type: string }) => msg.type === 'ai');
        const latestAiMessage = aiMessages[aiMessages.length - 1];
        if (latestAiMessage) {
          setPendingAiMessage(latestAiMessage);
          setShowTypingAnimation(true);
        }
      }

      setPendingUserMessage(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      setPendingUserMessage(null);
      setPendingAiMessage(null);
      setIsWaitingResponse(false);
      setShowTypingAnimation(false);
    }
  };

  const handleAnimationComplete = () => {
    setShowTypingAnimation(false);
    setPendingAiMessage(null);
  };

  if (isQuestionsLoading || isInterviewLoading) {
    return (
      <div className={styles.chat.loadingContainer}>
        <div className={styles.chat.loadingSpinner}></div>
        <p className={styles.chat.loadingText}>면접 데이터를 불러오는 중...</p>
      </div>
    );
  }

  const interviewDataType: InterviewDataType = response.data;

  return (
    <div className={styles.chat.layout}>
      <Aside
        questionSetId={questionSetId}
        groupedQuestions={groupedQuestions}
        conversationId={conversationId}
      />

      <main className={styles.chat.mainContent}>
        <header className={styles.chat.header}>
          <div className={styles.chat.questionInfo}>
            <div className={styles.chat.questionType}>
              {interviewDataType.questionType}
            </div>
            <h1 className={styles.chat.questionTitle}>
              {interviewDataType.originalQuestionText}
            </h1>
          </div>

          <div className={styles.chat.metaInfo}>
            <div className={`${styles.chat.statusBadge} ${getStatusBadge(interviewDataType.status).class}`}>
              {getStatusBadge(interviewDataType.status).text}
            </div>
          </div>
        </header>

        <div className={styles.chat.chatContainer}>
          <List
            messages={interviewDataType.messages}
            pendingUserMessage={pendingUserMessage}
            pendingAiMessage={pendingAiMessage}
            isWaitingResponse={isWaitingResponse}
            showTypingAnimation={showTypingAnimation}
            onAnimationComplete={handleAnimationComplete}
          />

          <div className={styles.chat.inputContainer}>
            <Form
              onSendMessage={handleSendMessage}
              isSubmitting={requestInterviewMutation.isPending}
              isAiResponding={isWaitingResponse || showTypingAnimation}
              messagesLength={interviewDataType.messages.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewChat;