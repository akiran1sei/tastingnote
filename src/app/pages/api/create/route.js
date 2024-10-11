import connectDB from "../../../utils/database";
import { BeansModel } from "../../../utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 作成された値が出力される
  const body = await request.json();

  const createBody = {
    username: body.username,
    email: body.email,
    coffee: body.coffee,
    roast: body.roast,
    roastDegree: body.roastDegree,

    aromaDryStrength: body.aromaDryStrength,
    aromaCrustStrength: body.aromaCrustStrength,
    aromaBreakStrength: body.aromaBreakStrength,
    aromaDryQuality: body.aromaDryQuality,
    aromaCrustQuality: body.aromaCrustQuality,
    aromaBreakQuality: body.aromaBreakQuality,
    defects: body.defects,
    cleancap: body.cleancap,
    sweet: body.sweet,
    acidity: body.acidity,
    acidityStrength: body.acidityStrength,
    mouthfeel: body.mouthfeel,
    bodyStrength: body.bodyStrength,
    flavor: body.flavor,
    after: body.after,
    balance: body.balance,
    memo: body.memo,
    overall: body.overall,
    impression: body.impression,
    result: body.result,
    total: body.total,
    date: body.date,
    groupname: body.groupname,
    userEmail: body.userEmail,
  };
  try {
    await connectDB();
    console.log(createBody);
    await BeansModel.create(createBody);

    return NextResponse.json({
      message: "アイテム作成成功",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "アイテム作成失敗/route.jsx",
      status: 500,
    });
  }
}
