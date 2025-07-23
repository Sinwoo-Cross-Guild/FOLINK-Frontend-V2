"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

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

interface AsideProps {
  questionSetId: number;
  groupedQuestions: GroupedQuestions | undefined;
  conversationId: number;
}

const Aside = ({ questionSetId, groupedQuestions, conversationId }: AsideProps) => {
  const router = useRouter();

  // 질문 섹션 렌더링 함수
  const renderQuestionSection = (
    title: string,
    questions: { [key: string]: CommonQuestionType[] }
  ) => {
    const questionCount = Object.values(questions).reduce(
      (total, questionArray) => total + questionArray.length,
      0
    );

    return (
      <section>
        <header>
          {title}
          <span>총 {questionCount}개</span>
        </header>
        <div>
          <div>
            {Object.keys(questions).length === 0 ? (
              <p>아직 {title} 질문이 없습니다.</p>
            ) : (
              Object.entries(questions).map(([groupTitle, groupQuestions]) => (
                <article key={groupTitle}>
                  <h5>{groupTitle}</h5>
                  <ul>
                    {groupQuestions.map((question) => (
                      <li key={question.id}>
                        <button onClick={() => handleQuestionClick(question.conversationId)}>
                          <div>
                            {question.question.length >= 30
                              ? `${question.question.slice(0, 30)}...`
                              : question.question}
                          </div>
                          <small>{title.includes("프로젝트") ? "프로젝트" : "기술스택"}</small>
                        </button>
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    );
  };

  const handleQuestionClick = (newConversationId: number) => {
    router.push(`/interview/${questionSetId}/${newConversationId}`);
  };

  return (
    <nav>
      <IoIosArrowBack
        onClick={() => router.push(`/question/${questionSetId}`)}
        aria-label="Go back"
      />
      <h3>면접 질문 목록</h3>
      {groupedQuestions && (
        <>
          {renderQuestionSection("프로젝트 질문", groupedQuestions.projectQuestions)}
          {renderQuestionSection("기술 스택 질문", groupedQuestions.techStackQuestions)}
        </>
      )}
    </nav>
  );
};

export default Aside;