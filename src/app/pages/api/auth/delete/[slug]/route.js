// delete/route
import { BeansModel, UserModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req, res) {
  try {
    await connectDB();

    const userData = await UserModel.findById(res.params.slug);

    if (userData) {
      cookies().delete("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      await UserModel.deleteOne({ _id: res.params.slug });
      await BeansModel.deleteMany({ userEmail: userData.email });
      return NextResponse.json({
        message: "ユーザー削除成功",
        status: 200,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    return NextResponse.json({
      message: "ユーザー削除失敗",
      status: 500,
    });
  }
}
