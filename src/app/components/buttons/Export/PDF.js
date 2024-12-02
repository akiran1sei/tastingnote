"use client";
import { useState } from "react";
import dotenv from "dotenv";
dotenv.config();

export default function PDF(data) {
  const [isLoading, setIsLoading] = useState(false);

  console.log(data.data);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/pages/api/puppeteer/${data.data}`
      );
      if (!response.ok) {
        throw new Error("PDF生成に失敗しました。");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "PDF生成に失敗しました。詳細については、管理者にお問い合わせください。"
      );
      setIsLoading(false);
    }
  };
  return (
    <button onClick={handleExport} disabled={isLoading}>
      {isLoading ? "Exporting..." : "PDF"}
    </button>
  );
}
