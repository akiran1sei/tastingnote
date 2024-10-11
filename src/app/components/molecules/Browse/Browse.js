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
      <div className={styles.edit_contents}>
        <div className={styles.edit_wrap}>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Date</label>
            </div>
            <div className={styles.edit_contents_data}>{browse.date}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Group</label>
            </div>
            <div className={styles.edit_contents_data}> {browse.groupname}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>User</label>
            </div>
            <div className={styles.edit_contents_data}>{browse.username}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Beans</label>
            </div>
            <div className={styles.edit_contents_data}>{browse.coffee}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Roast</label>
            </div>
            <div className={styles.edit_contents_data}>
              <p className={styles.edit_roast_value}>
                {browse.roastDegree}：{browse.roast}%
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Aroma</label>
            </div>
            <div className={styles.edit_contents_data}>
              <div border="0" className={styles.edit_contents_aroma}>
                <div className={styles.edit_contents_aroma_row}>
                  <div className={styles.edit_contents_aroma_data_header}></div>
                  <div className={styles.edit_contents_aroma_data_header}>
                    Strong
                  </div>
                  <div className={styles.edit_contents_aroma_data_header}>
                    Quality
                  </div>
                </div>

                <div className={styles.edit_contents_aroma_data}>
                  <label>Dry</label>

                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaDryStrength}
                  </div>
                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaDryQuality}
                  </div>
                </div>

                <div className={styles.edit_contents_aroma_data}>
                  <label>Crust</label>

                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaCrustStrength}
                  </div>
                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaCrustQuality}
                  </div>
                </div>

                <div className={styles.edit_contents_aroma_data}>
                  <label>Break</label>
                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaBreakStrength}
                  </div>
                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaBreakQuality}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Defects</label>
            </div>
            <div className={styles.edit_contents_data}>{browse.defects}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>CleanCap</label>
            </div>
            <div className={styles.edit_contents_data}> {browse.cleancap}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Sweet</label>
            </div>
            <div className={styles.edit_contents_data}> {browse.sweet}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Acidity</label>
            </div>
            <div className={styles.edit_contents_data}>{browse.acidity}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>AcidityStrength</label>
            </div>
            <div className={styles.edit_contents_data}>
              {browse.acidityStrength}
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Mouthfeel</label>
            </div>
            <div className={styles.edit_contents_data}> {browse.mouthfeel}</div>
          </div>

          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>BodyStrength</label>
            </div>
            <div className={styles.edit_contents_data}>
              {" "}
              {browse.bodyStrength}
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Flavor</label>
            </div>
            <div className={styles.edit_contents_data}> {browse.flavor}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>After</label>
            </div>
            <div className={styles.edit_contents_data}> {browse.after}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Balance</label>
            </div>
            <div className={styles.edit_contents_data}> {browse.balance}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>OverAll</label>
            </div>
            <div className={styles.edit_contents_data}> {browse.overall}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Result</label>
            </div>
            <div className={styles.edit_contents_data}>{browse.result}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                TOTAL
                <br />
                (+36点)
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.total}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>Impression</label>
            </div>
            <div className={styles.edit_contents_data}>{browse.impression}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data}>{browse.memo}</div>
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
