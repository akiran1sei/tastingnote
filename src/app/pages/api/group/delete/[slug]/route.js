// delete/route
import { GroupModel } from "@/app/utils/schemaModels";
import connectDB from "../../../../../utils/database";

import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log(body);
    // const singleGroup = await GroupModel.aggregate([
    //   {
    //     $match: {
    //       _id: body.id,
    //       email: {
    //         $elemMatch: {
    //           $in: body.email,
    //           $size: 1,
    //         },
    //       },
    //     },
    //   },
    // ]);

    const singleGroup = await GroupModel.findOne({
      _id: body.id,
      email: { $in: body.email },
    });
    const emailSizeOne = await GroupModel.findOne({
      _id: body.id,
      email: {
        $size: 1,
      },
    });
    // const multipleGroup = await GroupModel.aggregate([
    //   {
    //     $match: {
    //       _id: body.id,
    //       email: {
    //         $elemMatch: {
    //           $in: body.email,
    //           $size: { $gte: 1 },
    //         },
    //       },
    //     },
    //   },
    // ]);
    // console.log(Boolean(singleGroup));
    // console.log(Boolean(multipleGroup));
    if (singleGroup) {
      if (emailSizeOne) {
        await GroupModel.deleteOne({ _id: body.id });
        return NextResponse.json({
          message: "グループ削除成功One",
          status: 200,
        });
      } else {
        await GroupModel.updateOne(
          { _id: body.id },
          {
            $pull: { email: body.email },
          }
        );
        return NextResponse.json({
          message: "グループ削除成功multiple",
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
