import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
// import { cookies } from "next/headers";

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
      console.log("Token has expired");

      // トークンの削除をここで行う
      const response = NextResponse.redirect(
        new URL("/pages/auth/signout", request.url)
      );
      response.cookies.delete("token");
      return response;
    }

    // トークンが有効な場合、リクエストを続行
    return NextResponse.next();
  } catch (error) {
    // トークンの検証に失敗した場合
    console.error("Token verification failed:", error);
    return redirectToLogout(request);
  }
}

function redirectToLogout(request) {
  return NextResponse.redirect(new URL("/pages/auth/signout", request.url));
}

// このミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    `/pages/select:path*`,
    `/pages/select/:path*`,
    `/pages/create/:path*`,
    `/pages/update/:path*`,
    `/pages/auth/profile`,
  ],
};
