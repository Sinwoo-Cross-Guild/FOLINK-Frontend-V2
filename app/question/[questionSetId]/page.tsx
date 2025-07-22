import Question from "@/components/question";
import { generateOpenGraph } from "@/utils";

export const metadata = generateOpenGraph({
  title: '질문을 확인해보세요!',
  description: '지금 내 포트폴리오에 대한 질문을 확인해보세요!'
})

const Page = () => {
  return <Question />;
}
export default Page;