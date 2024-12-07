import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BeansModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";
import { promises as fs } from "fs";

import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// ブラウザプールの実装
let browserInstance;
const browserPool = {
  async getBrowser() {
    if (!browserInstance) {
      browserInstance = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    }
    return browserInstance;
  },
  async close() {
    if (browserInstance) {
      await browserInstance.close();
      browserInstance = null;
    }
  },
};

// EJSテンプレートのコンパイル
const compiledTemplate = await ejs.compileFile(
  path.join(process.cwd(), "/src/app/components/molecules/page.ejs")
);

// キャッシュの実装 (簡易的なメモリキャッシュ)
const cache = new Map();

export async function GET(req, res) {
  const jsonData = res.params.id.split(",");
  const cacheKey = jsonData.join(",");

  try {
    // キャッシュから取得
    if (cache.has(cacheKey)) {
      return new Response(cache.get(cacheKey), {
        headers: {
          "Content-Type": "application/pdf; text/html;charset=utf-8",
          "Content-Disposition": 'attachment; filename="your_file_name.pdf"',
        },
      });
    }

    await connectDB();
    const data = await BeansModel.find({ _id: { $in: jsonData } });

    // EJSレンダリング
    const html = compiledTemplate({ data });

    const browser = await browserPool.getBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { encoding: "utf-8" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: true,
    });

    // キャッシュに保存
    cache.set(cacheKey, pdfBuffer);

    return new Response(pdfBuffer, {
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
  }
}

// サーバー停止時にブラウザを閉じる
process.on("SIGINT", () => {
  browserPool.close();
  process.exit(0);
});
