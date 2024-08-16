// delete/route
import { GroupModel } from "@/app/utils/schemaModels";
import connectDB from "../../../../../utils/database";

import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
export async function DELETE(req, res) {
  try {
    await connectDB();
    const singleItem = await GroupModel.findById(res.params.slug);

    if (singleItem) {
      await GroupModel.deleteOne({ _id: res.params.slug });
      return NextResponse.json({
        message: "グループ削除成功",
        status: 200,
      });
    } else {
      throw new Error(`グループが見つかりませんでした: ${res.params.slug}`);
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "グループ削除失敗",
      status: 500,
    });
  }
}
