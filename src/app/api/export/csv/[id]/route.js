// app/api/export/route.js
import { Parser } from "json2csv";
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";

export async function GET(request, response) {
  try {
    await connectDB();
    const idStrings = response.params.id.split(","); // IDをカンマで分割して配列にする

    const beans = await BeansModel.find(
      {
        _id: { $in: idStrings },
      },
      { userEmail: 0 }
    ).lean();
    const fields = [
      "username",
      "coffee",
      "roast",
      "roastDegree",
      "aromaDryStrength",
      "aromaCrustStrength",
      "aromaBreakStrength",
      "aromaDryQuality",
      "aromaCrustQuality",
      "aromaBreakQuality",
      "defects",
      "cleancap",
      "sweet",
      "acidity",
      "acidityStrength",
      "mouthfeel",
      "bodyStrength",
      "flavor",
      "after",
      "balance",
      "overall",
      "impression",
      "result",
      "total",
      "date",
      "groupname",
      "userEmail",
      "memo",
    ];
    console.log(beans);
    const opts = {
      fields,
      withBOM: true,
      // 区切り文字とヘッダーの設定を追加
      delimiter: ",",
      header: true,
      // 文字列のエスケープ設定
      quote: '"',
      escape: '"',
    };

    const parser = new Parser(opts);
    const csvContent = parser.parse(beans);

    // UTF-8 BOMを含むバッファーを作成
    const BOM = Buffer.from([0xef, 0xbb, 0xbf]);
    const csvBuffer = Buffer.concat([BOM, Buffer.from(csvContent, "utf-8")]);

    const headers = new Headers();
    headers.append("Content-Type", "text/csv; charset=utf-8");
    headers.append(
      "Content-Disposition",
      'attachment; filename="coffee-tasting-notes.csv"'
    );

    // バッファーを直接レスポンスとして返す
    return new NextResponse(csvBuffer, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
