import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

//middlewareファイルを使用するときは、ファイル名を”middleware.js”に修正すること！

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return redirectToLogout(request);
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    // トークンの有効期限をチェック
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // トークンの有効期限が切れている場合
    if (payload.exp && payload.exp < currentTimestamp) {
      // console.log("tokenが切れてますよ＿");
      // トークンの有効期限が切れている場合
      cookies().delete("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return NextResponse.redirect(redirectToLogout(request));
    }

    // トークンが有効な場合、リクエストを続行
    return NextResponse.next();
  } catch (error) {
    // トークンの検証に失敗した場合
    console.error("Token verification failed:", error);
    return redirectToLogout(request);
  }
}
async function redirectToLogout(request) {
  const logoutUrl = new URL("/pages/auth/signout", request.url);

  return NextResponse.redirect(logoutUrl);
}

// このミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    `/pages/select:path*`,
    `/pages/select/:path*`,
    `/pages/create/:path*`,
    `/pages/update/:path*`,
    `/pages/auth/profile`,
    /*
     * 認証が必要なルートをここに追加
     * 例: '/dashboard', '/profile/:path*'
     */
  ],
};
