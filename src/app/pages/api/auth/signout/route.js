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

    // レスポンスオブジェクトを作成
    const response = NextResponse.json(
      { message: "ログアウトしました" },
      { status: 200 }
    );

    // キャッシュ関連のヘッダーを設定
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    // ログアウト成功
    return response;
  } catch (error) {
    console.error("ログアウト処理中にエラーが発生しました:", error);

    // エラー処理
    return NextResponse.json(
      { message: "ログアウトに失敗しました。" },
      { status: 500 }
    );
  }
}
