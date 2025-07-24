"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { aside } from "./Aside.css";

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

  const renderQuestionSection = (
    title: string,
    questions: { [key: string]: CommonQuestionType[] }
  ) => {
    return (
      <section className={aside.section}>
        <div className={aside.sectionContent}>
          {Object.keys(questions).length === 0 ? (
            <p className={aside.emptyState}>아직 {title} 질문이 없습니다.</p>
          ) : (
            Object.entries(questions).map(([groupTitle, groupQuestions]) => (
              <article key={groupTitle} className={aside.groupContainer}>
                <h5 className={aside.groupTitle}>{groupTitle}</h5>
                <ul className={aside.questionList}>
                  {groupQuestions.map((question) => {
                    const isActive = question.conversationId === conversationId;
                    return (
                      <li key={question.id} className={aside.questionItem}>
                        <button 
                          className={isActive ? aside.questionButtonActive : aside.questionButton}
                          onClick={() => handleQuestionClick(question.conversationId)}
                        >
                          <div className={isActive ? aside.questionTextActive : aside.questionText}>
                            {question.question.length >= 30
                              ? `${question.question.slice(0, 30)}...`
                              : question.question}
                          </div>
                          <small className={isActive ? aside.questionTagActive : aside.questionTag}>
                            {title.includes("프로젝트") ? "프로젝트" : "기술스택"}
                          </small>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))
          )}
        </div>
      </section>
    );
  };

  const handleQuestionClick = (newConversationId: number) => {
    router.push(`/interview/${questionSetId}/${newConversationId}`);
  };

  return (
    <nav className={aside.container}>
      <div className={aside.header}>
        <IoIosArrowBack
          className={aside.backButton}
          onClick={() => router.push("/")}
          aria-label="Go back"
        />
        <h3 className={aside.title}>다른 질문 받아보기</h3>
      </div>
      
      <div className={aside.content}>
        {groupedQuestions && (
          <>
            {renderQuestionSection("프로젝트 질문", groupedQuestions.projectQuestions)}
            {renderQuestionSection("기술 스택 질문", groupedQuestions.techStackQuestions)}
          </>
        )}
      </div>
    </nav>
  );
};

export default Aside;