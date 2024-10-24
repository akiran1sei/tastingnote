import { GroupModel } from "@/app/utils/schemaModels";
import connectDB from "../../../utils/database";

import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();

    const groups = await GroupModel.find({ groupname: req.query.search });

    return NextResponse.json({
      message: "グループ検索成功",
      group: groups,
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
