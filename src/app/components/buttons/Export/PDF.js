// client側 (PDF.js)
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
