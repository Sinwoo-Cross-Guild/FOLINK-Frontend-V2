export default interface ProjectQuestionType {
  id: number;
  projectName: string;
  question: string;
  purpose: string;
  conversationId: number;
}

export default interface TechStackQuestionType {
  id: number;
  stackName: string;
  question: string;
  purpose: string;
  conversationId: number;
}
