import connectDB from "../../../../utils/database";
import { GroupModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    // const groups = await GroupModel.find({ groupname: { $exists: true } });
    await revalidatePath(`${process.env.NEXT_PUBLIC_URL}/pages/group`);
    const groups = await GroupModel.aggregate([
      {
        $match: {
          groupname: { $exists: true },
        },
      },
      {
        $sort: {
          // ソート条件を指定
          createdAt: 1,
        },
      },
      {
        $limit: 100, // 取得するドキュメントの数を制限
      },
    ]).exec();

    return NextResponse.json({
      message: "アクセス成功",
      groups,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "アクセスできませんでした",
      status: 500,
    });
  }
}
