"use client";
import { useState } from "react";

export default function PDF({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);
  const handleExport = async () => {
    setIsLoading(true);

    try {
      console.log("OK");
      const response = await fetch(`http://localhost:3000/pages/api/puppeteer`);
      const resData = await response.json();
      console.log(resData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleExport} disabled={isLoading}>
      {isLoading ? "Exporting..." : "PDF"}
    </button>
  );
}
