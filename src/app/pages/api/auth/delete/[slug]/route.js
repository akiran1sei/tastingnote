// delete/route
import { BeansModel, UserModel, GroupModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();
    const userData = await UserModel.findById(body.id);

    if (userData) {
      cookies().delete("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
    }
    // 1. ユーザーを削除
    await UserModel.deleteOne({ _id: userData._id });

    // 2. ユーザーに関連するBeansデータを削除
    await BeansModel.deleteMany({ userEmail: userData.email });

    // 3. グループの更新と削除を一括処理
    // まず、該当ユーザーのemailを全グループから削除
    await GroupModel.updateMany(
      { email: userData.email },
      { $pull: { email: userData.email } }
    );

    // emailが空の配列になったグループを削除
    await GroupModel.deleteMany({ email: { $size: 0 } });

    return NextResponse.json({
      success: true,
      message: "ユーザーとその関連データを正常に削除しました",
    });
  } catch (error) {
    console.error("データ削除中にエラーが発生しました:", error);
    throw new Error("ユーザー削除処理に失敗しました");
  }
}
