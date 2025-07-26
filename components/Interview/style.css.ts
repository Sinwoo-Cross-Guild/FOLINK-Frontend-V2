import { theme, font, flex } from "@/styles";
import { style, keyframes } from "@vanilla-extract/css";

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

export const chat = {
  layout: style({
    width: "100%",
    display: "flex",
    height: "100vh",
    background: "#fafafa",
  }),

  mainContent: style({
    marginLeft: "320px",
    flex: 1,
    ...flex.COLUMN_FLEX,
    overflow: "hidden",
  }),

  loadingContainer: style({
    width: "100%",
    height: "100vh",
    ...flex.CENTER,
    ...flex.COLUMN_FLEX,
    gap: "20px", 
    background: "#fafafa",
  }),

  loadingSpinner: style({
    width: "40px",
    height: "40px",
    border: `3px solid #f0f0f0`,
    borderTop: `3px solid ${theme.primary}`,
    borderRadius: "50%",
    animation: `${spin} 1s linear infinite`,
  }),

  loadingText: style({
    color: `${theme.boldgray}`,
    ...font.p2,
  }),

  errorContainer: style({
    height: "100vh",
    ...flex.CENTER,
    ...flex.COLUMN_FLEX,
    gap: "20px",
    background: "#fafafa",
  }),

  errorIcon: style({
    fontSize: "48px",
  }),

  errorText: style({
    color: `${theme.boldgray}`,
    ...font.p2,
    textAlign: "center",
  }),

  retryButton: style({
    padding: "12px 24px",
    background: `${theme.primary}`,
    color: `${theme.white}`,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    ...font.p2,
    transition: "all 0.2s ease",

    selectors: {
      "&:hover": {
        background: "rgba(79, 70, 229, 0.9)",
        transform: "translateY(-1px)",
      },
    },
  }),

  header: style({
    padding: "32px 40px 24px 40px",
    background: `${theme.white}`,
    borderBottom: "1px solid #f0f0f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  }),

  questionInfo: style({
    marginBottom: "16px",
  }),

  questionType: style({
    display: "inline-block",
    padding: "4px 12px",
    background: "rgba(79, 70, 229, 0.1)",
    color: `${theme.primary}`,
    borderRadius: "16px",
    ...font.p4,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "600",
    marginBottom: "12px",
  }),

  questionTitle: style({
    ...font.H4,
    color: `${theme.text}`,
    margin: 0,
    lineHeight: "1.4",
  }),

  metaInfo: style({
    display: "flex",
    alignItems: "center",
    gap: "16px",
  }),

  statusBadge: style({
    padding: "4px 12px",
    borderRadius: "12px",
    ...font.p4,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }),

  statusCompleted: style({
    background: "#e8f5e8",
    color: "#2e7d2e",
  }),

  statusInProgress: style({
    background: "#fff3cd",
    color: "#856404",
  }),

  statusPending: style({
    background: "#f8f9ff",
    color: `${theme.primary}`,
  }),

  statusDefault: style({
    background: "#f0f0f0",
    color: `${theme.boldgray}`,
  }),

  chatContainer: style({
    flex: 1,
    ...flex.COLUMN_FLEX,
    overflow: "hidden",
  }),

  messagesContainer: style({
    flex: 1,
    overflowY: "auto",
    padding: "24px 40px",
    background: "#fafafa",
    scrollbarWidth: "thin",
    scrollbarColor: "#e0e0e0 transparent",

    selectors: {
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#e0e0e0",
        borderRadius: "3px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#ccc",
      },
    },
  }),

  messageWrapper: style({
    marginBottom: "24px",
    ...flex.COLUMN_FLEX,
    gap: "8px",
  }),

  userMessageWrapper: style({
    alignItems: "flex-end",
  }),

  aiMessageWrapper: style({
    alignItems: "flex-start",
  }),

  messageHeader: style({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  }),

  messageSender: style({
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),

  senderAvatar: style({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    ...flex.CENTER,
    fontSize: "16px",
  }),

  userAvatar: style({
    background: "rgba(79, 70, 229, 0.1)",
  }),

  aiAvatar: style({
    background: "#f0f0f0",
  }),

  senderName: style({
    ...font.p3,
    fontWeight: "600",
    color: `${theme.text}`,
  }),

  messageTime: style({
    ...font.p4,
    color: `${theme.boldgray}`,
    marginLeft: "auto",
  }),

  messageBubble: style({
    maxWidth: "70%",
    padding: "16px 20px",
    borderRadius: "18px",
    position: "relative",
    wordBreak: "break-word",
  }),

  userMessage: style({
    background: `${theme.primary}`,
    color: `${theme.white}`,
    alignSelf: "flex-end",
    borderBottomRightRadius: "6px",
  }),

  aiMessage: style({
    background: `${theme.white}`,
    color: `${theme.text}`,
    alignSelf: "flex-start",
    borderBottomLeftRadius: "6px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  }),

  messageContent: style({
    ...font.p2,
    margin: 0,
    lineHeight: "1.5",
  }),

  feedbackContainer: style({
    maxWidth: "70%",
    marginTop: "8px",
    padding: "16px",
    background: "#fff8e1",
    border: "1px solid #ffecb3",
    borderRadius: "12px",
    alignSelf: "flex-start",
  }),

  feedbackHeader: style({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  }),

  feedbackIcon: style({
    fontSize: "16px",
  }),

  feedbackTitle: style({
    ...font.p3,
    color: "#f57f17",
    fontWeight: "600",
  }),

  feedbackContent: style({
    ...font.p3,
    color: "#e65100",
    lineHeight: "1.4",
    margin: 0,
  }),

  // MessageForm 관련 스타일
  inputContainer: style({
    padding: "20px 40px",
    ...flex.CENTER,
  }),

  messageForm: style({
    width: "96%",
    background: "#F6F5FA",
    borderRadius: "20px",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  messageInput: style({
    flex: 1,
    padding: "15px",
    border: "none",
    marginRight: "10px",
    background: "none",
    resize: "none",
    overflowY: "auto",
    maxHeight: "150px",
    boxSizing: "border-box",
    ...font.p3,
    color: `${theme.text}`,

    selectors: {
      "&::placeholder": {
        color: `${theme.boldgray}`,
      },
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#ccc",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&:disabled": {
        opacity: 0.2,
        cursor: "not-allowed",
      },
      "&:focus": {
        outline: "none",
        border: "none",
      },
    },
  }),

  sendButton: style({
    padding: "8px",
    borderRadius: "50%",
    border: "none",
    background: `${theme.white}`,
    transition: "all 0.15s ease-in-out",
    cursor: "pointer",
    marginRight: "10px",
    ...flex.CENTER,
    width: "40px",
    height: "40px",

    selectors: {
      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
      },
      "&:hover:not(:disabled)": {
        transform: "translateY(-1px)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  }),
};