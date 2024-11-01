// delete/route
import { GroupModel } from "@/app/utils/schemaModels";
import connectDB from "../../../../../utils/database";

import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();

    const singleGroup = await GroupModel.findOne({
      id: body.id,
      email: { $in: body.email },
    });

    if (singleGroup) {
      await GroupModel.updateOne(singleGroup, {
        $pull: { email: body.email },
      });

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
