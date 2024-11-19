import header from "@/app/styles/Header.module.css";
import React from "react";

export function AuthHeader() {
  return (
    <header className={header.header}>
      <div className={header.header_title}>
        <h1 className={header.header_title_txt}>Tasting Note</h1>
      </div>
    </header>
  );
}
