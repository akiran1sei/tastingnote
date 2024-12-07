// client側 (PDF.js)
import { useEffect, useState } from "react";

import dotenv from "dotenv";
import styles from "@/app/styles/Contents.module.css";
import { useRouter } from "next/navigation";
dotenv.config();

export default function PDF(data) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  console.log(data.data);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/pages/api/export/pdf/${data.data}`,
        {
          cache: "no-store",
        }
      );
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
      await window.location.reload();
      return setIsLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "PDF生成に失敗しました。詳細については、管理者にお問い合わせください。"
      );
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className={styles.select_menu_btn_yellow}
    >
      {isLoading ? "Exporting..." : "PDF"}
    </button>
  );
}
