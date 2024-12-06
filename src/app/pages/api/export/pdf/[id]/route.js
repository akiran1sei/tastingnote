import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";
import puppeteer from "puppeteer";

export async function GET(req, res) {
  try {
    // データベース接続設定（例：MongoDB）
    await connectDB();
    const jsonData = res.params.id.split(",");
    const data = await BeansModel.find({ _id: { $in: jsonData } });
    const username = data.length > 0 ? data[0].username : "";

    // EJSテンプレートをレンダリング
    const html = await ejs.renderFile(
      path.join(process.cwd(), "/src/app/components/molecules/page.ejs"),
      { data }
    );

    // PuppeteerでPDFを生成
    const browser = await puppeteer.launch({
      headless: false, // ローカルで確認する場合はfalse
    });
    const page = await browser.newPage();
    await page.setContent(html, { encoding: "utf-8" });

    // PDFを保存するディレクトリを指定
    const pdfPath = path.join(__dirname, "output", "your_file_name.pdf");
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      landscape: true,
    });

    await page.close();
    await browser.close();

    // ローカルではブラウザで開くなど、適切な処理を行う
    console.log(`PDFが生成されました: ${pdfPath}`);
  } catch (error) {
    console.error("PDF作成失敗:", error);
    // エラー処理
  }
}
