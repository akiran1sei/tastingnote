import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";

import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(req, res) {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true, // trueに固定
    });
    await connectDB();
    const jsonData = res.params.id.split(",");

    const data = await BeansModel.find({ _id: { $in: jsonData } });
    const username = data.length > 0 ? data[0].username : "";

    const html = await ejs.renderFile(
      path.join(process.cwd(), "/src/app/components/molecules/page.ejs"),
      { data }
    );

    const page = await browser.newPage();
    await page.setContent(html, { encoding: "utf-8" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: true,
    });

    await page.close();
    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf; text/html;charset=utf-8",
        "Content-Disposition": 'attachment; filename="your_file_name.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF作成中にエラーが発生しました:", error);
    // エラーの種類に応じて、より具体的なエラーメッセージを返す
    if (error instanceof Error && error.message.includes("Network")) {
      return NextResponse.json({
        message: "ネットワークエラーが発生しました。PDFの作成に失敗しました。",
        status: 500,
      });
    } else if (
      error instanceof Error &&
      error.message.includes("Evaluation failed")
    ) {
      // テンプレートレンダリングエラーが発生した場合の処理
      console.error("テンプレートレンダリングに失敗しました:", error);

      // 具体的なエラーメッセージをユーザーに返す
      return NextResponse.json({
        message:
          "テンプレートの処理中にエラーが発生しました。詳細については、管理者にお問い合わせください。",
        status: 500,
      });
    } else {
      // その他のエラーが発生した場合
      console.error("予期しないエラーが発生しました:", error);

      // ユーザーに表示するエラーメッセージ
      const errorMessage =
        "システムエラーが発生しました。しばらくしてから再度お試しください。";

      return NextResponse.json({
        message: errorMessage,
        status: 500,
      });
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
