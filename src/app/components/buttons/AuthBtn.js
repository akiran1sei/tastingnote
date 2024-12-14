"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Buttons from "@/app/styles/Btn.module.css";
export function AuthBtn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        ようこそ {session.user.name}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={Buttons.sign_btn}
        >
          サインアウト
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn("google")} className={Buttons.sign_btn}>
        Googleでサインイン
      </button>
      <button onClick={() => signIn("github")} className={Buttons.sign_btn}>
        GitHubでサインイン
      </button>
    </>
  );
}
