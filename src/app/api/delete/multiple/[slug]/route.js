// // delete/multiple
import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

//multiple消去

export async function DELETE(req, res) {
  try {
    await connectDB();

    const Request = await req.json();

    const multiple = await BeansModel.find({
      _id: Request,
      userEmail: res.params.slug,
    });

    if (multiple) {
      await BeansModel.deleteMany({
        _id: Request,
        userEmail: res.params.slug,
      });
      return NextResponse.json({
        message: "アイテム削除成功",
        status: 200,
      });
    } else {
      throw new Error();
    }
    // }
  } catch (err) {
    return NextResponse.json({
      message: "アイテム削除失敗/delete",
      status: 500,
    });
  }
}
