const { NextResponse } = require("next/server");
import { cookies } from "next/headers";
export async function DELETE() {
  try {
    cookies().delete("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // ログアウト成功
    return NextResponse.json({
      message: "ログアウトしました",
      status: 200,
    });
  } catch (error) {
    // エラー処理
    return NextResponse.json({
      message: "ログアウトに失敗しました。",
      status: 500,
    });
  }
}
