"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function AuthBtn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        ようこそ {session.user.name}
        <button onClick={() => signOut()}>サインアウト</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn("google")}>Googleでサインイン</button>
      <button onClick={() => signIn("github")}>GitHubでサインイン </button>
    </>
  );
}
