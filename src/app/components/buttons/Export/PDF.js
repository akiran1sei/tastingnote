// client側 (PDF.js)
import { useState } from "react";

import styles from "@/app/styles/Pages.module.css";

export default function PDF(data) {
  const [isLoading, setIsLoading] = useState(false);

  console.log(data.data);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/export/pdf/${data.data}`, {
        headers: {
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "your_file_name.pdf";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("PDFの生成に失敗しました。");
      }
    } catch (error) {
      console.error("PDF生成エラー:", error);
      // エラーの種類に応じて、より具体的なエラーメッセージを返す
      if (error.message.includes("Network")) {
        alert("ネットワークエラーが発生しました。PDFの生成に失敗しました。");
      } else if (error.message.includes("404")) {
        alert("指定されたAPIエンドポイントが見つかりません。");
      } else {
        alert(
          "PDFの生成に失敗しました。詳細については、管理者にお問い合わせください。"
        );
      }
    } finally {
      await window.location.reload();
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className={styles.select__menu_btn_yellow}
    >
      {isLoading ? "Exporting..." : "PDF"}
    </button>
  );
}
