import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // 入力チェック
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "ユーザー名とメールアドレスとパスワードを入力してください",
          status: 400,
        },
        { status: 400 }
      );
    }

    // ユーザー名とメールアドレスの重複チェック
    const existingUser = await UserModel.findOne({
      $or: [{ email }],
    });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "そのユーザー名またはメールアドレスはすでに使用されています",
          status: 409,
        },
        { status: 409 }
      );
    }

    // パスワードのハッシュ化
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ユーザー作成
    const newUser = await UserModel.create({
      name: email,
      email: email,
      password: hashedPassword,
    });

    // レスポンスからパスワードを除外
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      {
        message: "ユーザー作成成功",
        user: userWithoutPassword,
        status: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "ユーザー作成失敗",
        status: 500,
      },
      { status: 500 }
    );
  }
}
