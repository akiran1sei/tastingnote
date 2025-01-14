import { BeansModel, GroupModel, UserModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";

import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();
    const Beans = await BeansModel.find({ userEmail: body.email });
    const Groups = await GroupModel.find({ email: { $in: body.email } });

    //ユーザーが存在しない場合のエラーハンドリング;
    if (!Beans && !Groups) {
      return NextResponse.json({
        success: false,
        message: "ユーザーが見つかりません。",
      });
    }

    // マスターアカウントの削除を防ぐ;
    if (body.email === "akira.application@gmail.com") {
      return NextResponse.json({
        success: false,
        message: "マスターアカウントは削除できません。",
      });
    }

    // 通常のユーザーの場合、削除処理を実行
    if (Beans && Groups) {
      // 2. ユーザーに関連するBeansデータを削除
      await BeansModel.deleteMany({ userEmail: body.email });
      // // 3. グループの更新と削除を一括処理
      // // まず、該当ユーザーのemailを全グループから削除
      await GroupModel.updateMany(
        { email: body.email },
        { $pull: { email: body.email } }
      );

      // // emailが空の配列になったグループを削除
      await GroupModel.deleteMany({ email: { $size: 0 } });

      await UserModel.deleteOne({ email: body.email });

      return NextResponse.json({
        success: true,
        message: "ユーザーとその関連データを正常に削除しました",
      });
    }
  } catch (error) {
    console.error("データ削除中にエラーが発生しました:", error);
    return NextResponse.json({
      success: false,
      message: "ユーザー削除処理に失敗しました",
      error: error.message,
    });
  }
}
