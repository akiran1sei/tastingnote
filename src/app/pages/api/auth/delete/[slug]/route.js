// delete/route
import { BeansModel, UserModel, GroupModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();
    const userData = await UserModel.findById(body.id);

    if (userData) {
      cookies().delete("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      await UserModel.deleteOne({ _id: userData._id });
      await BeansModel.deleteMany({ userEmail: userData.email });

      // グループの検索

      const singleGroup = await GroupModel.find({
        email: { $in: userData.email },
      });
      const emailSizeOne = await GroupModel.find({
        email: {
          $in: userData.email,
          $size: 1,
        },
      });

      if (singleGroup) {
        if (emailSizeOne) {
          await GroupModel.deleteMany({ email: { $in: userData.email } });
          return NextResponse.json({
            message: "ユーザー削除成功",
            status: 200,
          });
        }
        await GroupModel.updateMany(
          { email: { $in: userData.email } },
          {
            $pull: { email: userData.email },
          }
        );
        return NextResponse.json({
          message: "ユーザー削除成功",
          status: 200,
        });
      }
    }
  } catch (err) {
    return NextResponse.json({
      message: "ユーザー削除失敗",
      status: 500,
    });
  }
}
