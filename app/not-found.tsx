import { generateOpenGraph } from "@/utils";

export const metadata = generateOpenGraph({
  title: "404 Not Found",
  description: "해당 페이지를 찾을 수 없습니다.",
});

const NotFound = () => {
  return <main>해당 페이지를 찾을 수 없습니다.</main>;
};

export default NotFound;
