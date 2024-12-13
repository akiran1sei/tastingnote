import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";

import { NextResponse } from "next/server";
export async function PUT(request, response) {
  const body = await request.json();
  try {
    await connectDB();

    await BeansModel.updateOne({ _id: response.params.slug }, body);
    return NextResponse.json({
      message: "アイテム編集成功",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "アイテム編集失敗",
      status: 500,
    });
  }
}
