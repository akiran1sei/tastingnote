import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";

export async function GET(req, res) {
  try {
    await connectDB();

    const allItems = await BeansModel.find({ groupname: { $exists: true } })
      .sort({ createdAt: 1 })
      .limit(100)
      .exec();

    return NextResponse.json({
      message: "読み取り成功（オール）",
      allItems: allItems,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "読み取り失敗（オール）",
      status: 500,
    });
  }
}
