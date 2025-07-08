import Pdf from "@/components/Pdf";
import * as styles from "./page.css";


export default function Home() {
  return (
    <main className={styles.page.body}>
      <section className={styles.page.box}>
        <header className={styles.title.body}>
          <h1>
            포트폴리오로 <span className={styles.title.highlight}>면접</span>을 준비하세요!
          </h1>
        </header>
        <article>
          <Pdf />
        </article>
      </section>
    </main>
  );
}
