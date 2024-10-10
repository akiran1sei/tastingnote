import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req) {
  try {
    // クッキーからトークンを削除
    cookies().delete("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // ログアウト成功
    return NextResponse.json(
      { message: "ログアウトしました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ログアウト処理中にエラーが発生しました:", error);

    // エラー処理
    return NextResponse.json(
      { message: "ログアウトに失敗しました。" },
      { status: 500 }
    );
  }
}
