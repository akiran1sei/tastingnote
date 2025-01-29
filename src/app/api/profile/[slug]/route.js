import connectDB from "@/app/utils/database";
import { BeansModel, UserModel } from "@/app/utils/schemaModels";

import { NextResponse } from "next/server";
export async function PUT(request) {
  const body = await request.json();
  try {
    await connectDB();
    const id = body._id;
    const name = body.name;
    const email = body.email;
    if (name === "" && email) {
      const userName = await UserModel.updateOne({ _id: id }, { email: email });
      return NextResponse.json({
        userName,
        message: "編集成功しました、再ログインしてください",
        status: 200,
      });
    } else if (name && email === "") {
      const userEmail = await UserModel.updateOne({ _id: id }, { name: name });
      return NextResponse.json({
        userEmail,
        message: "編集成功しました、再ログインしてください",
        status: 200,
      });
    } else if (name === "" && email === "") {
      return NextResponse.json({
        message: "ユーザー名とメールアドレスを入力してください",
        status: 400,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "編集失敗",
      status: 500,
    });
  }
}
