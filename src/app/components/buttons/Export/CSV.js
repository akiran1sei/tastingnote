"use client";
import { useState } from "react";
import styles from "@/app/styles/Pages.module.css";
export default function CSV(context) {
  const [isExporting, setIsExporting] = useState(false);
  const responseData = context.data;
  const handleExport = async () => {
    try {
      setIsExporting(true);

      const response = await fetch(`/api/export/csv/${responseData}`);

      if (!response.ok) {
        throw new Error("Export failed");
      }

      // レスポンスをBlobとして直接取得
      const blob = await response.blob();

      // BlobをUTF-8でエンコードされたCSVとして作成
      const csvBlob = new Blob([blob], {
        type: "text/csv;charset=utf-8;",
      });

      // ダウンロードリンクを作成
      const url = window.URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `coffee-tasting-notes-${
        new Date().toISOString().split("T")[0]
      }.csv`;

      // リンクをクリックしてダウンロードを開始
      document.body.appendChild(link);
      link.click();

      // クリーンアップ
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      alert("エクスポートに失敗しました。");
    } finally {
      await window.location.reload();
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={styles.select__menu__btn__white}
    >
      {isExporting ? "エクスポート中..." : "CSV"}
    </button>
  );
}
