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
    const headerTemplate = `  <% if (data.length > 0) { %>
  <header class="tasting-data__header">
    <div class="tasting-data__header-wrap">
      <ul class="tasting-data__header-list">
        <li class="tasting-data__header-item tasting-data__header-username">
          <span class="tasting-data__header-text"><%= data[0].username %></span>
          <span class="tasting-data__header-title">NAME</span>
        </li>
        <li class="tasting-data__header-item tasting-data__header-number">
          <span class="tasting-data__header-text"></span>
          <span class="tasting-data__header-title">#</span>
        </li>
        <li class="tasting-data__header-item tasting-data__header-date">
          <span class="tasting-data__header-text"></span>
          <span class="tasting-data__header-title">DATE</span>
        </li>
        <li class="tasting-data__header-item tasting-data__header-round">
          <span class="tasting-data__header-text"></span>
          <span class="tasting-data__header-title">ROUND</span>
        </li>
        <div class="tasting-data__header-item tasting-data__header-sn">
          <span class="tasting-data__header-text"></span>
          <span class="tasting-data__header-title">SN</span>
        </div>
        <li class="tasting-data__header-item tasting-data__header-lot">
          <span class="tasting-data__header-text"></span>
          <span class="tasting-data__header-title">TLB#</span>
        </li>
        <li class="tasting-data__header-item tasting-data__header-country">
          <span class="tasting-data__header-text"></span>
          <span class="tasting-data__header-title">COUNTRY</span>
        </li>
      </ul>
    </div>
  </header>
  <% } %>`;
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: true,
      headerTemplate,
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
