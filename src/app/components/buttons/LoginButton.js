"use client";
import Buttons from "@/app/styles/Btn.module.css";

export default function LoginButton() {
  return (
    <>
      <button className={Buttons.login_btn}>
        <a href="/api/auth/login">Login</a>
      </button>
    </>
  );
}
