import "./styles/globals.css";
import styles from "@/app/styles/Contents.module.css";
import { Inter } from "next/font/google";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tasting Note App",
  description: "コーヒーをテイスティングするときに使用するアプリです。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className={styles.container}>
          <main className={styles.main}>
            <ErrorBoundary fallback={<Error />}>{children} </ErrorBoundary>
          </main>
          <footer className={styles.footer}></footer>
        </div>
      </body>
    </html>
  );
}
