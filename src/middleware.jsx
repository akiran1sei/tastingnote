import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  // トークンがない場合の早期リターン
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return handleLogout(request, "No token found");
  }

  try {
    // トークンの検証
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    // 有効期限の検証
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const gracePeriod = 5; // 5秒のグレースピリオド

    if (!payload.exp) {
      return handleLogout(request, "Token has no expiration");
    }

    if (payload.exp < currentTimestamp - gracePeriod) {
      return handleLogout(request, "Token has expired");
    }

    // トークンが有効な場合は次のミドルウェアへ
    const response = NextResponse.next();

    // セキュリティヘッダーの追加
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "same-origin");

    return response;
  } catch (error) {
    console.error("Token verification failed:", {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
    return handleLogout(request, `Token verification failed: ${error.message}`);
  }
}

function handleLogout(request, reason) {
  // リダイレクト先のURLを構築
  const redirectUrl = new URL("/pages/auth/signout", request.url);
  redirectUrl.searchParams.set("reason", encodeURIComponent(reason));

  const response = NextResponse.redirect(redirectUrl);

  // セキュアなCookie削除
  response.cookies.delete("token", {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  });

  // キャッシュ制御ヘッダー
  const cacheHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
  };

  // ヘッダーの設定
  Object.entries(cacheHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    // 保護されたルートの定義
    // "/pages/select:path*",
    // "/pages/select/:path*",
    // "/pages/create/:path*",
    // "/pages/update/:path*",
    // "/pages/user/profile",
  ],
};
