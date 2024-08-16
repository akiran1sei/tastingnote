// delete/route
import { BeansModel, UserModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";

import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const groupname = searchParams.get("groupname");

    const user = await UserModel.findById(res.params.search);
    const groups = await BeansModel.find({
      groupname: groupname,
      userEmail: user.email,
    });

    return NextResponse.json({
      message: "グループ検索成功",
      groupname: groups,

      status: 200,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "グループ検索失敗",
      status: 500,
    });
  }
}
