"use client";
import { useState } from "react";

export default function ExportButton(context) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);

      console.log("context", context.data);
      const response = await fetch(
        `/pages/api/export?data=${encodeURIComponent(
          JSON.stringify(context.data)
        )}`
      );
      // const response = await fetch("/pages/api/export");

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
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isExporting ? "エクスポート中..." : "エクスポート"}
    </button>
  );
}
