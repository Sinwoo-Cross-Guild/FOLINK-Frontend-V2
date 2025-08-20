import React, { useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { MessageListType } from '@/types';
import DotLoader from './DotLoader';
import * as styles from './style.css';

const List = ({
  messages,
  pendingUserMessage,
  pendingAiMessage,
  isWaitingResponse,
  showTypingAnimation,
  onAnimationComplete
}: MessageListType) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [pendingUserMessage, pendingAiMessage, messages, showTypingAnimation]);

  return (
    <div className={styles.chat.messagesContainer} ref={messagesContainerRef}>
      {messages
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
                  onAnimationComplete,
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
  );
};

export default List;