import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // 入力チェック
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "メールアドレスとパスワードを入力してください",
          status: 400,
        },
        { status: 400 }
      );
    }

    // ユーザーの検索
    const user = await UserModel.findOne({ email: email });

    // ユーザーが存在しない場合
    if (!user) {
      return NextResponse.json(
        {
          message: "メールアドレスまたはパスワードが違います",
          status: 401,
        },
        { status: 401 }
      );
    }

    // パスワードの検証
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "メールアドレスまたはパスワードが違います",
          status: 401,
        },
        { status: 401 }
      );
    }

    // パスワードが正しい場合、ユーザー情報とトークンを生成
    const { password: _, ...userWithoutPassword } = user.toObject();

    const userData = {
      id: userWithoutPassword._id.toString(),
      user: userWithoutPassword.username,
      email: userWithoutPassword.email,
    };
    // 定数で時間単位を定義
    const ONE_HOUR_IN_SECONDS = 60 * 60; // 1時間を秒数で表す
    const COOKIE_EXPIRATION_HOURS = 12; // Cookieの有効期限（時間）
    // JWTの有効期限を12時間に設定（秒単位）
    const jwtExpirationTimeInSeconds =
      COOKIE_EXPIRATION_HOURS * ONE_HOUR_IN_SECONDS;

    // JWTトークンの生成
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT(userData)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("12h")
      .sign(secretKey);
    // クッキーの設定
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIE_EXPIRATION_HOURS * ONE_HOUR_IN_SECONDS, // 12時間
    });

    return NextResponse.json(
      {
        message: "ログイン成功",
        user: userData,
        token: token,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      {
        message: "サーバーエラーが発生しました",
        status: 500,
      },
      { status: 500 }
    );
  }
}
