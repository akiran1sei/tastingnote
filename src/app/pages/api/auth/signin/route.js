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

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "メールアドレスとパスワードを入力してください",
          status: 400,
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email: email });

    if (user) {
      // パスワードを除外したユーザー情報を作成
      const { password: _, ...userWithoutPassword } = user.toObject();

      const userData = {
        id: userWithoutPassword._id.toString(), // ObjectIdを文字列に変換
        user: userWithoutPassword.username,
        email: userWithoutPassword.email,
      };
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new SignJWT(userData)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("12h")
        .sign(secretKey);

      // クッキーにトークンを設定
      cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 12, // 12時間
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
    } else if (!user || !(await bcrypt.compare(password, user.password))) {
      if (!user) {
        return NextResponse.json(
          {
            message: "ユーザーが存在しません。",
            status: 401,
          },
          { status: 401 }
        );
      } else if (!(await bcrypt.compare(password, user.password))) {
        return NextResponse.json(
          {
            message: "パスワードが違います。",
            status: 401,
          },
          { status: 401 }
        );
      } else {
        return NextResponse.json(
          {
            message: "メールアドレスまたはパスワードが違います。",
            status: 401,
          },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      {
        message: "サーバーエラー/Email・Passwordエラーです。",
        status: 500,
      },
      { status: 500 }
    );
  }
}
