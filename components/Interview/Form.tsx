import React, { useState, useRef, useEffect } from 'react';
import { MessageFormType } from '@/types';
import * as styles from './style.css';

const MessageForm = ({ 
  onSendMessage, 
  isSubmitting = false, 
  isAiResponding = false, 
  messagesLength 
}: MessageFormType) => {
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

export default MessageForm;