// client側 (PDF.js)

import { useState } from "react";

import styles from "@/app/styles/Contents.module.css";

export default function PDF(data) {
  const [isLoading, setIsLoading] = useState(false);

  console.log(data.data);

  const handleExport = async () => {
    setIsLoading(true);

    let retryCount = 0;

    const maxRetries = 3; // 最大リトライ回数

    const fetchData = async () => {
      try {
        const response = await fetch(`/pages/api/export/pdf/${data.data}`);

        if (!response.ok) {
          const errorMessage = await response.text();

          throw new Error(`PDF生成に失敗しました: ${errorMessage}`);
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "your_file_name.pdf";

        link.click();

        window.URL.revokeObjectURL(url); // ダウンロード成功時の処理 (例: モーダルを表示)

        alert("PDFのダウンロードが完了しました。");
      } catch (error) {
        if (retryCount < maxRetries && error.message.includes("Network")) {
          retryCount++;

          console.log(
            `ネットワークエラーが発生しました。${retryCount}回リトライします。`
          );

          setTimeout(fetchData, 2000); // 2秒後にリトライ
        } else {
          throw error;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className={styles.select_menu_btn_yellow}
    >
      {isLoading ? "Exporting..." : "PDF"}{" "}
    </button>
  );
}
