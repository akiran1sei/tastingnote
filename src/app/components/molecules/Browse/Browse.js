"use client";
import React from "react";

import Image from "next/image";
import Head from "next/head";
import styles from "@/app/styles/Contents.module.css";
import { HomeBtn } from "@/app/components/buttons/HomeBtn";
import { DeleteBtn } from "@/app/components/buttons/DeleteBtn";
import { EditBtn } from "@/app/components/buttons/EditBtn";
export function Browse(context) {
  const data = context.data;
  const browse = data.singleItem;
  return (
    <>
      <Head>
        <title>閲覧ページ</title>
        <meta
          name="description"
          content="作成されたコーヒー豆のデータを閲覧するページです。"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1 className={styles.contents_title}>BROWSE</h1>
      <div className={styles.browse_data}>
        <div className={styles.browse_contents}>
          <div className={`${styles.browse_item} ${styles.browse_data}`}>
            <div className={styles.browse_date}>
              <span className={styles.browse_img_box}>
                <Image
                  src="/images/calendar_month_img.svg"
                  alt="カレンダー"
                  width={48}
                  height={48}
                  priority
                />
              </span>
              {browse.date}
            </div>
            <div className={styles.browse_groupname}>
              <span className={styles.browse_img_box}>
                <Image
                  src="/images/group_img.svg"
                  alt="グループ名"
                  width={48}
                  height={48}
                  priority
                />
              </span>
              {browse.groupname}
            </div>
            <div className={styles.browse_username}>
              <span className={styles.browse_img_box}>
                <Image
                  src="/images/person_img.svg"
                  alt="ユーザー"
                  width={48}
                  height={48}
                  priority
                />
              </span>
              {browse.username}
            </div>
          </div>

          <hr />
          <div className={`${styles.browse_item} ${styles.browse_coffee}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>1:珈琲豆 or 番号</h3>
              <p className={styles.browse_item_value}>{browse.coffee}</p>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_roast}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>2:ロースト</h3>
              <div className={styles.browse_item_value}>
                {browse.roastDegree}：{browse.roast}%
              </div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.roastMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_aroma}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>3:アロマ </h3>
              <div className={styles.browse_item_value}>
                <table className={styles.browse_aroma_table}>
                  <thead>
                    <tr>
                      <th className={styles.browse_aroma_tableHeader}></th>
                      <th className={styles.browse_aroma_tableHeader}>
                        Strong
                      </th>
                      <th className={styles.browse_aroma_tableHeader}>
                        Quality
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.browse_aroma_tableRow}>
                      <th className={styles.browse_aroma_tableHeader}>Dry</th>
                      <td className={styles.browse_aroma_tableData}>
                        {browse.aromaDryStrength}
                      </td>
                      <td className={styles.browse_aroma_tableData}>
                        {browse.aromaDryQuality}
                      </td>
                    </tr>
                    <tr className={styles.browse_aroma_tableRow}>
                      <th className={styles.browse_aroma_tableHeader}>Crust</th>
                      <td className={styles.browse_aroma_tableData}>
                        {browse.aromaCrustStrength}
                      </td>
                      <td className={styles.browse_aroma_tableData}>
                        {browse.aromaCrustQuality}
                      </td>
                    </tr>
                    <tr className={styles.browse_aroma_tableRow}>
                      <th className={styles.browse_aroma_tableHeader}>Break</th>
                      <td className={styles.browse_aroma_tableData}>
                        {browse.aromaBreakStrength}
                      </td>
                      <td className={styles.browse_aroma_tableData}>
                        {browse.aromaBreakQuality}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.aromaMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_defects}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>4：欠点・瑕疵</h3>
              <div className={styles.browse_item_value}>{browse.defects}</div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.defectsMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_cleancap}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>5：カップの綺麗さ</h3>
              <div className={styles.browse_item_value}>
                {browse.cleancap}
                <span className={styles.browse_yellow}>/8</span>
              </div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.cleancapMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_sweet}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>6：甘さ</h3>
              <div className={styles.browse_item_value}>
                {browse.sweet}
                <span className={styles.browse_yellow}>/8</span>
              </div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.sweetMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_acidity}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>7：酸の質</h3>
              <div className={styles.browse_item_value}>
                {browse.acidity}
                <span className={styles.browse_yellow}>/8</span>
                <p className={styles.browse_acidityStrength}>
                  {browse.acidityStrength}
                </p>
              </div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.acidityMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_mouthfeel}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>8：口に含んだ質感</h3>
              <div className={styles.browse_item_value}>
                {browse.mouthfeel}
                <span className={styles.browse_yellow}>/8</span>
                <p className={styles.browse_bodyStrength}>
                  {browse.bodyStrength}
                </p>
              </div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.mouthfeelMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_flavor}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>9：フレーバー</h3>
              <div className={styles.browse_item_value}>
                {browse.flavor}
                <span className={styles.browse_yellow}>/8</span>
              </div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.flavorMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_after}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>10：後味の印象度</h3>
              <div className={styles.browse_item_value}>
                {browse.after}
                <span className={styles.browse_yellow}>/8</span>
              </div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.afterMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_balance}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>11：バランス</h3>
              <div className={styles.browse_item_value}>
                {browse.balance}
                <span className={styles.browse_yellow}>/8</span>
              </div>
              <div className={styles.browse_item_message_box}>
                <h4 className={styles.browse_item_memo}>
                  <span className={styles.browse_yellow}>memo</span>
                </h4>
                <div className={styles.browse_item_message}>
                  {browse.balanceMessage}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_overall}`}>
            <div className={styles.browse_item_box}>
              <h4 className={styles.browse_item_title}>12：総合評価</h4>
              <div className={styles.browse_item_value}>
                {browse.overall}
                <span className={styles.browse_yellow}>/8</span>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_total}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>13：TOTAL（+36）</h3>
              <div className={styles.browse_item_value}>
                <div className={styles.browse_resultBox}>
                  <h4 className={styles.browse_total_subTitle}>
                    <ins>Result</ins>
                  </h4>
                  <div className={styles.browse_resultValue}>
                    {browse.result}
                    <span className={styles.browse_yellow}>/64</span>
                  </div>
                </div>
                <div className={styles.browse_totalBox}>
                  <h4 className={styles.browse_total_subTitle}>
                    <ins>Total</ins>
                  </h4>
                  <div className={styles.browse_resultValue}>
                    {browse.total}
                    <span className={styles.browse_yellow}>/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`${styles.browse_item} ${styles.browse_impression}`}>
            <div className={styles.browse_item_box}>
              <h3 className={styles.browse_item_title}>14：味の印象</h3>
              <div className={styles.browse_item_value}>
                {browse.impression}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.browse_btn_box}>
          <HomeBtn />
          <DeleteBtn data={browse._id} />

          <EditBtn data={browse._id} />
        </div>
      </div>
    </>
  );
}
