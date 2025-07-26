"use client";

import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { TypeAnimation } from 'react-type-animation';
import { interviewQuery } from "@/services/interview/interview.query";
import { questionQuery } from "@/services/question/question.query";
import { useRequestInterviewMutation } from "@/services/interview/interview.mutation";
import { RequestInterviewType } from "@/types";
import Aside from "./Aside";
import * as styles from "./style.css";

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

interface MessageFormProps {
  onSendMessage: (message: string) => void;
  isSubmitting?: boolean;
  isAiResponding?: boolean;
  messagesLength: number;
}

// Dot Loader 컴포넌트
const DotLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <div style={{
      width: '8px',
      height: '8px',
      backgroundColor: '#6B7280',
      borderRadius: '50%',
      animation: 'dotBounce 1.4s ease-in-out infinite both',
      animationDelay: '0s'
    }}></div>
    <div style={{
      width: '8px',
      height: '8px',
      backgroundColor: '#6B7280',
      borderRadius: '50%',
      animation: 'dotBounce 1.4s ease-in-out infinite both',
      animationDelay: '0.16s'
    }}></div>
    <div style={{
      width: '8px',
      height: '8px',
      backgroundColor: '#6B7280',
      borderRadius: '50%',
      animation: 'dotBounce 1.4s ease-in-out infinite both',
      animationDelay: '0.32s'
    }}></div>
    <style jsx>{`
      @keyframes dotBounce {
        0%, 80%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

const MessageForm = ({ onSendMessage, isSubmitting = false, isAiResponding = false, messagesLength }: MessageFormProps) => {
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [message]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim() || isSubmitting || isAiResponding) return;
    onSendMessage(message);
    setMessage('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className={styles.chat.messageForm} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={styles.chat.messageInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="면접 질문에 대한 답을 입력하세요."
        aria-label="메시지 입력"
        disabled={isSubmitting || isAiResponding || messagesLength >= 9}
      />
      <button
        className={styles.chat.sendButton}
        type="submit"
        aria-label="메시지 전송"
        disabled={isSubmitting || isAiResponding || !message.trim()}
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 14L12 9L17 14"
            stroke="#4F46E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
};

const InterviewChat = () => {
  const params = useParams();
  const conversationId = Number(params.conversationId);
  const questionSetId = Number(params.questionSetId);

  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [showTypingAnimation, setShowTypingAnimation] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);
  const [pendingAiMessage, setPendingAiMessage] = useState<Message | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { data: questionsData, isLoading: isQuestionsLoading, error: questionsError } = useQuery(
    questionQuery.detail(questionSetId)
  );

  const { data: response, isLoading: isInterviewLoading, error: interviewError, refetch } = useQuery(
    interviewQuery.list(conversationId)
  );

  const requestInterviewMutation = useRequestInterviewMutation();

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

  const handleSendMessage = async (message: string) => {
    try {
      setPendingUserMessage(message);
      setIsWaitingResponse(true);

      await requestInterviewMutation.mutateAsync({
        conversationId,
        interview: { userResponse: message },
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

  // 메시지 추가 시 스크롤을 최하단으로 이동
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [pendingUserMessage, pendingAiMessage, response?.data?.messages, showTypingAnimation]);

  if (isQuestionsLoading || isInterviewLoading) {
    return (
      <div className={styles.chat.loadingContainer}>
        <div className={styles.chat.loadingSpinner}></div>
        <p className={styles.chat.loadingText}>면접 데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (questionsError || interviewError) {
    return (
      <div className={styles.chat.errorContainer}>
        <div className={styles.chat.errorIcon}>⚠️</div>
        <p className={styles.chat.errorText}>데이터를 불러오는데 실패했습니다.</p>
        <button
          className={styles.chat.retryButton}
          onClick={() => window.location.reload()}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!response?.data || !groupedQuestions) {
    return (
      <div className={styles.chat.errorContainer}>
        <div className={styles.chat.errorIcon}>📭</div>
        <p className={styles.chat.errorText}>데이터가 없습니다.</p>
      </div>
    );
  }

  const interviewData: InterviewData = response.data;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'end': { text: '완료', class: styles.chat.statusCompleted },
      'on_going': { text: '진행중', class: styles.chat.statusInProgress },
    };

    return statusConfig[status as keyof typeof statusConfig] || { text: status, class: styles.chat.statusDefault };
  };

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
              {interviewData.questionType}
            </div>
            <h1 className={styles.chat.questionTitle}>
              {interviewData.originalQuestionText}
            </h1>
          </div>

          <div className={styles.chat.metaInfo}>
            <div className={`${styles.chat.statusBadge} ${getStatusBadge(interviewData.status).class}`}>
              {getStatusBadge(interviewData.status).text}
            </div>
          </div>
        </header>

        <div className={styles.chat.chatContainer}>
          <div className={styles.chat.messagesContainer} ref={messagesContainerRef}>
            {interviewData.messages
              .filter((message) => !pendingAiMessage || message.id !== pendingAiMessage.id)
              .map((message) => (
                <div
                  key={message.id}
                  className={`${styles.chat.messageWrapper} ${
                    message.type === "user"
                      ? styles.chat.userMessageWrapper
                      : styles.chat.aiMessageWrapper
                  }`}
                >
                  <div className={styles.chat.messageHeader}>
                    <div className={styles.chat.messageSender}>
                      <span className={styles.chat.senderName}>
                        {message.type === "user" ? "지원자" : "면접관"}
                      </span>
                    </div>
                    <span className={styles.chat.messageTime}>
                      {new Date(message.createdAt).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div
                    className={`${styles.chat.messageBubble} ${
                      message.type === "user"
                        ? styles.chat.userMessage
                        : styles.chat.aiMessage
                    }`}
                  >
                    <p className={styles.chat.messageContent}>
                      {message.content}
                    </p>
                  </div>

                  {message.evaluatorFeedback && (
                    <div className={styles.chat.feedbackContainer}>
                      <div className={styles.chat.feedbackHeader}>
                        <span className={styles.chat.feedbackIcon}>💬</span>
                        <strong className={styles.chat.feedbackTitle}>평가자 피드백</strong>
                      </div>
                      <div className={styles.chat.feedbackContent}>
                        {message.evaluatorFeedback}
                      </div>
                    </div>
                  )}
                </div>
              ))}

            {pendingUserMessage && (
              <div className={`${styles.chat.messageWrapper} ${styles.chat.userMessageWrapper}`}>
                <div className={styles.chat.messageHeader}>
                  <div className={styles.chat.messageSender}>
                    <span className={styles.chat.senderName}>지원자</span>
                  </div>
                  <span className={styles.chat.messageTime}>
                    {new Date().toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span> 
                </div>
                <div className={`${styles.chat.messageBubble} ${styles.chat.userMessage}`}>
                  <p className={styles.chat.messageContent}>
                    {pendingUserMessage}
                  </p>
                </div>
              </div>
            )}

            {isWaitingResponse && (
              <div className={`${styles.chat.messageWrapper} ${styles.chat.aiMessageWrapper}`}>
                <div className={styles.chat.messageHeader}>
                  <div className={styles.chat.messageSender}>
                    <span className={styles.chat.senderName}>면접관</span>
                  </div>
                </div>
                <div className={`${styles.chat.messageBubble} ${styles.chat.aiMessage}`}>
                  <div className={styles.chat.messageContent}>
                    <DotLoader />
                  </div>
                </div>
              </div>
            )}

            {showTypingAnimation && pendingAiMessage && (
              <div className={`${styles.chat.messageWrapper} ${styles.chat.aiMessageWrapper}`}>
                <div className={styles.chat.messageHeader}>
                  <div className={styles.chat.messageSender}>
                    <span className={styles.chat.senderName}>면접관</span>
                  </div>
                  <span className={styles.chat.messageTime}>
                    {new Date().toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className={`${styles.chat.messageBubble} ${styles.chat.aiMessage}`}>
                  <p className={styles.chat.messageContent}>
                    <TypeAnimation
                      sequence={[
                        pendingAiMessage.content,
                        () => {
                          setShowTypingAnimation(false);
                          setPendingAiMessage(null);
                        },
                      ]}
                      wrapper="span"
                      speed={75}
                      style={{ fontSize: 'inherit', display: 'inline-block' }}
                      repeat={0}
                      cursor={false}
                    />
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.chat.inputContainer}>
            <MessageForm
              onSendMessage={handleSendMessage}
              isSubmitting={requestInterviewMutation.isPending}
              isAiResponding={isWaitingResponse || showTypingAnimation}
              messagesLength={interviewData.messages.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewChat;