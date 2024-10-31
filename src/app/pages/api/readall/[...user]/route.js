import connectDB from "../../../../utils/database";
import { BeansModel, UserModel } from "../../../../utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();
    const response = res.params.user;

    const userData = await UserModel.findById(response[0]);

    if (response[1] === "undefined") {
      const allItems = await BeansModel.find({
        userEmail: userData.email,
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
        userEmail: userData.email,
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
