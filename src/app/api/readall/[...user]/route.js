import connectDB from "@/app/utils/database";
import { BeansModel, UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();
    const response = res.params.user;

    if (response[1] === "undefined") {
      const allItems = await BeansModel.find({
        userEmail: response[0],
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
        userEmail: response[0],
        groupname: response[1],
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
    return NextResponse.json({
      message: "読み取り失敗（オール）",
      status: 500,
    });
  }
}
