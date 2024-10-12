import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return completeLogout(request);
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTimestamp) {
      console.log("Token has expired");
      return completeLogout(request);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return completeLogout(request);
  }
}

function completeLogout(request) {
  const response = NextResponse.redirect(
    new URL("/pages/auth/signout", request.url)
  );

  // トークンの削除
  response.cookies.delete("token");

  // キャッシュの削除
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: [
    `/pages/select:path*`,
    `/pages/select/:path*`,
    `/pages/create/:path*`,
    `/pages/update/:path*`,
    `/pages/auth/profile`,
  ],
};
