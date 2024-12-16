// delete/route
import { GroupModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";

import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();

    const singleGroup = await GroupModel.findOne({
      _id: body._id,
      email: { $in: body.email },
    });
    const emailSizeOne = await GroupModel.findOne({
      _id: body._id,
      email: {
        $size: 1,
      },
    });

    if (singleGroup) {
      if (emailSizeOne) {
        await GroupModel.deleteOne({ _id: body._id });
        return NextResponse.json({
          message: "グループ削除成功",
          status: 200,
        });
      } else {
        await GroupModel.updateOne(
          { _id: body._id },
          {
            $pull: { email: body.email },
          }
        );
        return NextResponse.json({
          message: "グループ削除成功",
          status: 200,
        });
      }
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "グループ削除失敗",
      status: 500,
    });
  }
}
