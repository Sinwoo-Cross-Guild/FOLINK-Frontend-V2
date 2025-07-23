import InterviewChat from "@/components/Interview";
import { generateOpenGraph } from "@/utils";

export const metadata = generateOpenGraph({
  title: '질의응답을 시작해볼까요?',
  description: '질문들을 확인하고 답변을 준비해보세요!'
})

const Page = () => {
  return <InterviewChat />;
}
export default Page;