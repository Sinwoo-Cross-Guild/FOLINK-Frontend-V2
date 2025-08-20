export interface MessageType {
  content: string;
  type: "ai" | "user";
  evaluatorFeedback: string | null;
  id: number;
  createdAt: string;
}

export interface InterviewDataType {
  originalQuestionId: string;
  originalQuestionText: string;
  questionType: string;
  status: string;
  id: number;
  createdAt: string;
  messages: MessageType[];
}

export interface CommonQuestionType {
  id: number;
  title: string;
  question: string;
  purpose: string;
  conversationId: number;
  projectName?: string;
  stackName?: string;
}

export interface MessageFormType {
  onSendMessage: (message: string) => void;
  isSubmitting?: boolean;
  isAiResponding?: boolean;
  messagesLength: number;
}

export interface MessageListType {
  messages: MessageType[];
  pendingUserMessage: string | null;
  pendingAiMessage: MessageType | null;
  isWaitingResponse: boolean;
  showTypingAnimation: boolean;
  onAnimationComplete: () => void;
}

export interface RequestInterviewType {
  userResponse: string;
}
