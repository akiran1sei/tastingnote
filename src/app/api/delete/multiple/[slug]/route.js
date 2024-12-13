// // delete/multiple
import connectDB from "@/app/utils/database";
import { BeansModel, UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

//multiple消去

export async function DELETE(req, res) {
  try {
    await connectDB();

    const Request = await req.json();
    const user = await UserModel.find({ email: res.params.slug });

    if (user) {
      const multiple = await BeansModel.find({
        _id: Request,
      });

      if (multiple) {
        await BeansModel.deleteMany({
          _id: Request,
        });
        return NextResponse.json({
          message: "アイテム削除成功",
          status: 200,
        });
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    return NextResponse.json({
      message: "アイテム削除失敗/delete",
      status: 500,
    });
  }
}
