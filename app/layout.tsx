import "./globals.css";
import { generateOpenGraph } from "@/utils";  
import Providers from "./providers";
import * as styles from "./layout.css"

export const metadata = generateOpenGraph({
  title: '면접 성공의 첫 시작',
  description: '포트폴리오만 넣으면 맞춤형 면접 질문이 생성돼요! 예상 질문으로 실전 면접을 연습해보세요.'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
            <main className={styles.container}>
              {children}
            </main>
        </Providers>
      </body>
    </html>
  );
}
