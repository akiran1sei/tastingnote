//  app/api/singleItem/[slug].jsx
import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";
export async function GET(req, res) {
  try {
    await connectDB();
    // await revalidatePath(`/pages/update`);
    const singleItem = await BeansModel.findById(res.params.slug);
    return NextResponse.json({
      message: "アイテム読み取り成功（シングル）",
      singleItem: singleItem,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "アイテム読み取り失敗（シングル）",
      status: 500,
    });
  }
}
