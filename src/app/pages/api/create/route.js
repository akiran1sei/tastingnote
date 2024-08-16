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
    roastMessage: body.roastMessage,
    aromaDryStrength: body.aromaDryStrength,
    aromaCrustStrength: body.aromaCrustStrength,
    aromaBreakStrength: body.aromaBreakStrength,
    aromaDryQuality: body.aromaDryQuality,
    aromaCrustQuality: body.aromaCrustQuality,
    aromaBreakQuality: body.aromaBreakQuality,
    aromaMessage: body.aromaMessage,
    defects: body.defects,
    defectsMessage: body.defectsMessage,
    cleancap: body.cleancap,
    cleancapMessage: body.cleancapMessage,
    sweet: body.sweet,
    sweetMessage: body.sweetMessage,
    acidity: body.acidity,
    acidityMessage: body.acidityMessage,
    acidityStrength: body.acidityStrength,
    mouthfeel: body.mouthfeel,
    mouthfeelMessage: body.mouthfeelMessage,
    bodyStrength: body.bodyStrength,
    flavor: body.flavor,
    flavorMessage: body.flavorMessage,
    after: body.after,
    afterMessage: body.afterMessage,
    balance: body.balance,
    balanceMessage: body.balanceMessage,
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
