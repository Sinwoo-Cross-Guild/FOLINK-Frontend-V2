"use client"

import { useQuery } from "@tanstack/react-query";
import { questionQuery } from "@/services/question/question.query";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";
import { Loading } from "../Loading";
import * as styles from "./style.css"
import Skeleton from "./Skeleton";

interface CommonQuestionType {
  id: number;
  title: string; 
  question: string;
  purpose: string;
  conversationId: number;
  projectName?: string; 
  stackName?: string; 
};

interface GroupedQuestions {
  projectQuestions: { [key: string]: CommonQuestionType[] };
  techStackQuestions: { [key: string]: CommonQuestionType[] };
}

const Question = () => {
  const params = useParams();
  const router = useRouter();
  const questionSetId = Number(params.questionSetId);
  
  const { data: response, isLoading, error } = useQuery(questionQuery.detail(questionSetId));
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState<'pending' | 'success'>('pending');

  const groupedQuestions: GroupedQuestions | undefined = response
    ? (() => {
        const { projectQuestions, techStackQuestions } = response;

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
          projectQuestions: groupBy(projectQuestions, 'projectName'),
          techStackQuestions: groupBy(techStackQuestions, 'stackName'),
        };
      })()
    : undefined;

  useEffect(() => {
    if (isLoading) {
      setIsLoadingState(true);
      setLoadingStatus('pending');
    } else if (error) {
      setIsLoadingState(false);
      console.error('질문 세트를 불러오는데 실패했습니다.');
      setTimeout(() => router.back(), 1500);
    } else if (!groupedQuestions) {
      setIsLoadingState(false);
      console.error('질문 데이터가 없습니다.');
      setTimeout(() => router.back(), 1500);
    } else {
      setLoadingStatus('success');
      setTimeout(() => {
        setIsLoadingState(false);
      }, 1000);
    }
  }, [isLoading, error, groupedQuestions, router]);

  if (!groupedQuestions) {
    return null;
  }

  const handleStartInterview = () => {
    router.push('/chat');
  };

  const getQuestionCount = (questions: { [key: string]: CommonQuestionType[] }): number => {
    return Object.values(questions).reduce((total, questionArray) => total + questionArray.length, 0);
  };

  const renderQuestionSection = (
    title: string,
    questions: { [key: string]: CommonQuestionType[] },
  ) => {
    const questionCount = getQuestionCount(questions);
    
    return (
      <section className={styles.list.body}>
        <header className={styles.list.header}>
          {title}
          <span className={styles.list.headerCount}>총 {questionCount}개</span>
        </header>
        <div className={styles.list.container}>
          <div className={styles.list.wrap}>
            {Object.keys(questions).length === 0 ? (
              <p className={styles.list.emptyState}>아직 {title} 질문이 없습니다.</p>
            ) : (
              Object.entries(questions).map(([groupTitle, groupQuestions]) => (
                <article className={styles.list.box} key={groupTitle}>
                  {groupQuestions.map((question) => (
                    <p key={question.id} className={styles.list.questionText}>
                      {question.question}
                    </p>
                  ))}
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderSkeletonSection = (title: string) => (
    <section className={styles.list.body}>
      <header className={styles.list.header}>
        {title}
        <span className={styles.list.headerCount}>총 0개</span>
      </header>
      <div className={styles.list.container}>
        <div className={styles.list.wrap}>
          <Skeleton />
        </div>
      </div>
    </section>
  );

  return (
    <main className={styles.question.container}>
      <nav>
        <IoIosArrowBack 
          onClick={() => router.back()} 
          className={styles.header.back} 
          aria-label="Go back"
        />
      </nav>
      <header className={styles.header.title}>
          <span className={styles.header.highlight}>면접을</span> 시작해볼까요?
      </header>
      {isLoadingState ? (
        <>
          <Loading type="list" status={loadingStatus} />
          <section className={styles.question.box}>
            {renderSkeletonSection("프로젝트 질문")}
            {renderSkeletonSection("기술 스택 질문")}
          </section>
        </>
      ) : (
        <section className={styles.question.box}>
          {renderQuestionSection("프로젝트 질문", groupedQuestions.projectQuestions)}
          {renderQuestionSection("기술 스택 질문", groupedQuestions.techStackQuestions)}
        </section>
      )}
      <footer>
        <button 
          onClick={handleStartInterview} 
          className={styles.list.InterviewBtn}
          aria-label="Start interview"
        >
          답변 하기
        </button>
      </footer>
    </main>
  );
};

export default Question;