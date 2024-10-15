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
      <h1 className={styles.contents_title}>{browse.coffee}</h1>
      <div className={styles.edit_contents}>
        <div className={styles.edit_wrap}>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>1</span>
                日付
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.date}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>2</span>
                グループ名
              </label>
            </div>
            <div className={styles.edit_contents_data}> {browse.groupname}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>3</span>
                ユーザー
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.username}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>4</span>
                コーヒー豆
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.coffee}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>豆の名前、又は、番号</p>
            </div>
          </div>

          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>5</span>
                ロースト
              </label>
            </div>
            <div className={styles.edit_contents_data}>
              <p className={styles.edit_roast_value}>
                {browse.roastDegree}：{browse.roast}%
              </p>
            </div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                焙煎具合、パーセンテージによって焙煎度名が変化するので、
                <wbr />
                それに合わせて焙煎度の中から選んでください。
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>6</span>
                アロマ
              </label>
            </div>
            <div className={styles.edit_contents_data}>
              <div border="0" className={styles.edit_contents_aroma}>
                <div className={styles.edit_contents_aroma_row}>
                  <div className={styles.edit_contents_aroma_data_header}></div>
                  <div className={styles.edit_contents_aroma_data_header}>
                    強さ
                  </div>
                  <div className={styles.edit_contents_aroma_data_header}>
                    質
                  </div>
                </div>

                <div className={styles.edit_contents_aroma_data}>
                  <label>ドライ</label>

                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaDryStrength}
                  </div>
                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaDryQuality}
                  </div>
                </div>

                <div className={styles.edit_contents_aroma_data}>
                  <label>クラスト</label>

                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaCrustStrength}
                  </div>
                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaCrustQuality}
                  </div>
                </div>

                <div className={styles.edit_contents_aroma_data}>
                  <label>ブレーク</label>
                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaBreakStrength}
                  </div>
                  <div className={styles.edit_contents_aroma_data}>
                    {browse.aromaBreakQuality}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.edit_point_memo}>
              <ul className={styles.edit_point_txtBox}>
                <li className={styles.edit_point_text}>
                  <span className={styles.edit_yellow}>『dry』</span>
                  <br /> 粉の状態からaroma
                </li>
                <li className={styles.edit_point_text}>
                  <span className={styles.edit_yellow}>『crust』</span>
                  <br />
                  湯を注いだ直後のaroma
                </li>
                <li className={styles.edit_point_text}>
                  <span className={styles.edit_yellow}>『break』</span>
                  <br />
                  混ぜた後のaroma
                </li>
              </ul>
              <p className={styles.edit_point_text}>
                の３つで香りの強さ（左）と質（右）を評価
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>7</span>
                欠点・瑕疵
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.defects}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                スペシャルティコーヒーなどは、欠点・瑕疵がないことが多く『０』で進めることが多い
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>8</span>
                カップの綺麗さ
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}> {browse.cleancap}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>味わいの透明度</p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>9</span>
                甘さ
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}> {browse.sweet}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                味わいに甘味の印象が強ければ強い程よいとされる
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>10</span>
                酸の質
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.acidity}</div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>10-1</span>
                酸の強さ
              </label>
            </div>
            <div className={styles.edit_contents_data}>
              {browse.acidityStrength}
            </div>

            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                強い順から、
                <br />
                High2→High1→Middle
                <br />
                →Light2→Light1、
                <br />
                酸の強さを計る
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>11</span>
                口に含んだ質感
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}> {browse.mouthfeel}</div>
          </div>

          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>11-1</span>
                ボディの強さ
              </label>
            </div>
            <div className={styles.edit_contents_data}>
              {browse.bodyStrength}
            </div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                舌触りの滑らかさ強い順から,
                <br />
                High2→High1→Middle
                <br />
                →Light2→Light1である。
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>12</span>
                フレーバー
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}> {browse.flavor}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>風味の質を評価する</p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>13</span>
                後味の印象度
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}> {browse.after}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                後味は心地よいか、そうでないか評価。
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>14</span>
                ハーモニーの均衝性
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}> {browse.balance}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                「7～13」の要素に悪目立ちしているものがなく、
                <wbr />
                全体のバランスが良い程加点。
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>15</span>
                総合評価
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
              </label>
            </div>
            <div className={styles.edit_contents_data}> {browse.overall}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                味わいの奥行など項目にない点にも着目し、ここまでの評価に囚われず、主観で付ける。
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>16</span>
                小計
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.result}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                <span className={styles.edit_contents_item_mark}>
                  <Image
                    src="/images/priority_high_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
                がついた項目の得点を足して算出した数字
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>17</span>
                TOTAL (+36点)
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.total}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                小計項目の得点に定数３６点を足して出た数字。
                <br />
                １００点満点で評価。
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>18</span>
                味の印象度
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.impression}</div>
            <div className={styles.edit_point_memo}>
              <p className={styles.edit_point_text}>
                具体的な味の印象を記入。フレーバーの表現もカッピングの重要な目的。
                <br />
                冷めていく過程で、味わいがどのように変化したかも都度メモしておくとよい。
              </p>
            </div>
          </div>
          <div className={styles.edit_contents_item}>
            <div className={styles.edit_contents_data_header}>
              <label>
                <span className={styles.edit_contents_item_number}>19</span>
                memo
              </label>
            </div>
            <div className={styles.edit_contents_data}>{browse.memo}</div>
          </div>

          <div className={styles.edit_btn_box}>
            <HomeBtn />
            <DeleteBtn data={browse._id} />

            <EditBtn data={browse._id} />
          </div>
        </div>
      </div>
    </>
  );
}
