import connectDB from "../../../../utils/database";
import { BeansModel, UserModel } from "../../../../utils/schemaModels";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req, res) {
  try {
    await connectDB();
    console.log("req", req, "res", res);
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    revalidatePath(`${process.env.NEXT_PUBLIC_URL}/pages/select`);

    const userData = await UserModel.findById(res.params.user);
    if (user === null || user === undefined || user === "") {
      const allItems = await BeansModel.find({
        userEmail: userData.email,
        groupname: { $exists: true },
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
        groupname: user,
      })
        .sort({ createdAt: 1 })
        .limit(100)
        .exec();

      return NextResponse.json({
        message: "読み取り成功（オール）",
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
