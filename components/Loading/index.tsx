"use client"

import * as styles from "./style.css"
import { useEffect, useState } from "react";
import Image from "next/image";
import FeedbackImg from "@/public/assets/write.png"

interface LoadingProps {
  status?: "pending" | "success" | "error";
  type: "extract" | "list" | "feedback";
  progress?: number;
};

export const Loading = ({ status, type, progress = 0 }: LoadingProps) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [textFadeIn, setTextFadeIn] = useState(false);

  const validProgress = Math.min(Math.max(progress, 0), 100);

  useEffect(() => {
    setFadeIn(true);

    let fadeOutTimer: NodeJS.Timeout;
    let textFadeTimer: NodeJS.Timeout;

    if (status === 'success' || status === 'error') {
      fadeOutTimer = setTimeout(() => setFadeOut(true), 500);
    }

    if (type === 'extract') {
      setTextFadeIn(false);
      textFadeTimer = setTimeout(() => setTextFadeIn(true), 10);
    }

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(textFadeTimer);
    };
  }, [status, type]);

  const renderContent = () => {
    switch (type) {
      case 'extract':
        const loadingText = progress <= 50 ? "면접 질문을 생성 중입니다.." : "면접 질문을 검토 중입니다!";
        return (
          <div className={styles.loading.container}>
            <span
              className={`${styles.loading.progressText} ${
                textFadeIn ? styles.loading.textFadeIn : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {loadingText}
            </span>
            <div
              className={styles.loading.progressBox}
              role="progressbar"
              aria-valuenow={validProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles.loading.progressBar}
                style={{ width: `${validProgress}%` }}
              />
            </div>
          </div>
        );
      case "list":
        return <div className={styles.loading.spinner} role="status" aria-label="로딩 중" />;
      case "feedback":
        return <Image width={120} height={120} src={FeedbackImg} alt="피드백 이미지" />;
      default:
        return null
    }
  }

  return (
    <div
      className={`${styles.loading.overlay} ${fadeIn ? styles.loading.fadeIn : ""} ${
        fadeOut ? styles.loading.fadeOut : ""
      }`}
      aria-hidden={fadeOut}
    >
      {renderContent()}
    </div>
  ); 
};