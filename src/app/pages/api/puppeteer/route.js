// pages/api/puppeteer/route.js

import puppeteer from "puppeteer";
import ejs from "ejs";

export default async function GET(req, res) {
  const data = req.body; // クライアントから送信されたデータ
  console.log(req);
  // EJSテンプレートをレンダリング
  const html = await ejs.renderFile("@/app/page.ejs", { data });

  // PuppeteerでPDFを生成
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: "./output.pdf", format: "A4" });
  await browser.close();

  // PDFファイルをクライアントにダウンロードさせるための処理
  // ...

  res.status(200).json({ message: "PDF generated successfully" });
}
