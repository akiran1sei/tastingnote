import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import path from "path";
import puppeteer from "puppeteer";
import ejs from "ejs";

let browser;

export async function GET(req, res) {
  try {
    // ブラウザの初期化をリクエストごとに
    const browser = await puppeteer.launch();

    await connectDB();
    const jsonData = res.params.id.split(",");

    const data = await BeansModel.find({ _id: { $in: jsonData } });

    const html = await ejs.renderFile(
      path.join(process.cwd(), "/src/app/components/molecules/page.ejs"),

      { data }
    );
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: true,
    });

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="your_file_name.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF作成失敗:", error);
    return NextResponse.json({
      message: "PDF作成失敗: " + error.message,
      status: 500,
    });
  } finally {
    // browser.close(); // 必要に応じてブラウザを閉じる
  }
}
