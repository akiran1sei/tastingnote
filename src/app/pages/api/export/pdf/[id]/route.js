import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(req, res) {
  try {
    await connectDB();
    const jsonData = res.params.id.split(",");
    const data = await BeansModel.find({ _id: { $in: jsonData } });

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true, // trueに固定
    });

    const pdfBuffers = await Promise.all(
      data.map(async (item) => {
        const html = await ejs.renderFile(
          path.join(process.cwd(), "/src/app/components/molecules/page.ejs"),
          { data: item, header: "共通ヘッダー" }
        );

        const page = await browser.newPage();
        await page.setContent(html, { encoding: "utf-8" });

        const buffer = await page.pdf({
          format: "A4",
          printBackground: true,
          landscape: true,
        });
        await page.close();
        return buffer;
      })
    );

    await browser.close();

    const mergedPdf = Buffer.concat(pdfBuffers);

    return new Response(mergedPdf, {
      headers: {
        "Content-Type": "application/pdf; text/html;charset=utf-8",
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
    if (browser) {
      await browser.close();
    }
  }
}
