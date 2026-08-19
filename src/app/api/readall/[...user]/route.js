import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

// 💡 1. 第2引数を res ではなく { params } で受け取ります
export async function GET(req, { params }) {
  try {
    await connectDB();

    // 💡 2. params を await して解決してから中身を取り出します
    const resolvedParams = await params;
    const userArgs = resolvedParams.user; // これが配列になります

    // 変数に分けておくと、この後のコードがスッキリしてバグが減ります
    const email = userArgs[0];
    const groupName = userArgs[1];

    console.log("groupNameがあるか:", Boolean(groupName));

    if (groupName === "undefined" || !groupName) {
      const allItems = await BeansModel.find({
        userEmail: email, // 💡 3. 配列そのものではなく email (userArgs[0]) を渡す
      })
        .sort({ createdAt: 1 })
        .limit(100)
        .exec();

      return NextResponse.json({
        message: "読み取り成功（オール）",
        allItems: allItems,
        status: 200,
      });
    } else {
      const allItems = await BeansModel.find({
        userEmail: email,
        groupname: groupName,
      })
        .sort({ createdAt: 1 })
        .limit(100)
        .exec();

      return NextResponse.json({
        message: "読み取り成功（サーチ）",
        allItems: allItems,
        status: 200,
      });
    }
  } catch (err) {
    console.error(err); // デバッグ用にエラーを出力しておくと安心です
    return NextResponse.json(
      {
        message: "読み取り失敗（オール）",
        status: 500,
      },
      { status: 500 },
    ); // ※エラー時はHTTPステータスコードも500にするのがベターです
  }
}
