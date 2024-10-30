import connectDB from "../../../../utils/database";
import { GroupModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { groupname, email } = body;

  try {
    await connectDB();

    // グループ名のバリデーション
    if (!groupname || groupname.trim().length === 0) {
      return NextResponse.json({
        message: "グループ名は必須です。",
        status: 400,
      });
    }

    // 既存のグループを検索
    const existingGroup = await GroupModel.findOne({ groupname });

    // 既存のグループが存在する場合
    if (existingGroup) {
      // 既存のグループにメールアドレスが存在するか確認
      if (existingGroup.email.includes(email)) {
        return NextResponse.json({
          message: "このメールアドレスは既にこのグループに登録されています。",
          status: 400,
        });
      } else {
        // メールアドレスを追加
        existingGroup.email.push(email);
        await existingGroup.save();
        return NextResponse.json({
          message: "グループにメールアドレスを追加しました。",
          status: 200,
        });
      }
    } else {
      // 新しいグループを作成
      const newGroup = new GroupModel({ groupname, email: [email] });
      await newGroup.save();
      return NextResponse.json({
        message: "グループを作成しました。",
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "グループの作成に失敗しました。",
      status: 500,
    });
  }
}
