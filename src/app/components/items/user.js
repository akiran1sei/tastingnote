"use client";
import { useSession } from "next-auth/react";

export function UserData() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return { session: null, status: "loading" }; // ローディング中はnullと"loading"を返す
  }

  if (status === "unauthenticated" || !session) {
    return { session: null, status: "unauthenticated" }; // 未認証またはセッションがない場合はnullと"unauthenticated"を返す
  }

  // セッションデータが存在する場合、データを返す
  return {
    session: session.user,
    status: "authenticated",
  };
}
