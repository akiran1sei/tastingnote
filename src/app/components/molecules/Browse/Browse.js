"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";
import Image from "next/image";
import Head from "next/head";
import styles from "@/app/styles/Pages.module.css";
import { maskEmail } from "@/app/components/items/concealEmail";
import { HomeBtn } from "@/app/components/buttons/HomeBtn";
import { DeleteBtn } from "@/app/components/buttons/DeleteBtn";
import { EditBtn } from "@/app/components/buttons/EditBtn";
export function BrowseComponent(context) {
  const data = context.data;
  const browse = data.singleItem;

  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
      setUserName(session.user.name);
      setIsUserEmail(session.user.email);
      setIsLoading(false);
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session, status]);
  console.log(status);
  console.log();
  const concealName = maskEmail(browse.username);
  if (isLoading) {
    return <LoadingSkeleton />;
  } else if (status === "unauthenticated") {
    return <Uncertified />;
  } else {
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
        <h1 className={styles.contents__title}>{browse.coffee}</h1>
        <div className={styles.edit__contents}>
          <div className={styles.edit__wrap}>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>1</span>
                  日付
                </label>
              </div>
              <div className={styles.edit__data}>{browse.date}</div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>2</span>
                  グループ名
                </label>
              </div>
              <div className={styles.edit__data}> {browse.groupname}</div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>3</span>
                  ユーザー
                </label>
              </div>
              <div className={styles.edit__data}>{concealName}</div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>4</span>
                  コーヒー豆
                </label>
              </div>
              <div className={styles.edit__data}>{browse.coffee}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>豆の名前、又は、番号</p>
              </div>
            </div>

            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>5</span>
                  ロースト
                </label>
              </div>
              <div className={styles.edit__data}>
                <p className={styles.edit_roast_value}>
                  {browse.roastDegree}：{browse.roast}%
                </p>
              </div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  焙煎具合、パーセンテージによって焙煎度名が変化するので、
                  <wbr />
                  それに合わせて焙煎度の中から選んでください。
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>6</span>
                  アロマ
                </label>
              </div>
              <div className={styles.edit__data}>
                <div border="0" className={styles.edit__aroma}>
                  <div className={styles.edit__aroma__row}>
                    <div className={styles.edit__aroma__data__header}></div>
                    <div className={styles.edit__aroma__data__header}>強さ</div>
                    <div className={styles.edit__aroma__data__header}>質</div>
                  </div>

                  <div className={styles.edit__aroma__data}>
                    <label>ドライ</label>

                    <div className={styles.edit__aroma__data}>
                      {browse.aromaDryStrength}
                    </div>
                    <div className={styles.edit__aroma__data}>
                      {browse.aromaDryQuality}
                    </div>
                  </div>

                  <div className={styles.edit__aroma__data}>
                    <label>クラスト</label>

                    <div className={styles.edit__aroma__data}>
                      {browse.aromaCrustStrength}
                    </div>
                    <div className={styles.edit__aroma__data}>
                      {browse.aromaCrustQuality}
                    </div>
                  </div>

                  <div className={styles.edit__aroma__data}>
                    <label>ブレーク</label>
                    <div className={styles.edit__aroma__data}>
                      {browse.aromaBreakStrength}
                    </div>
                    <div className={styles.edit__aroma__data}>
                      {browse.aromaBreakQuality}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.edit__point__memo}>
                <ul className={styles.edit__point__list}>
                  <li className={styles.edit__point__text}>
                    <span className={styles.edit__yellow}>『dry』</span>
                    <br /> 粉の状態からaroma
                  </li>
                  <li className={styles.edit__point__text}>
                    <span className={styles.edit__yellow}>『crust』</span>
                    <br />
                    湯を注いだ直後のaroma
                  </li>
                  <li className={styles.edit__point__text}>
                    <span className={styles.edit__yellow}>『break』</span>
                    <br />
                    混ぜた後のaroma
                  </li>
                </ul>
                <p className={styles.edit__point__text}>
                  の３つで香りの強さ（左）と質（右）を評価
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>7</span>
                  欠点・瑕疵
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}>{browse.defects}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  スペシャルティコーヒーなどは、欠点・瑕疵がないことが多く『０』で進めることが多い
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>8</span>
                  カップの綺麗さ
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}> {browse.cleancap}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>味わいの透明度</p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>9</span>
                  甘さ
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}> {browse.sweet}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  味わいに甘味の印象が強ければ強い程よいとされる
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>10</span>
                  酸の質
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}>{browse.acidity}</div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>10-1</span>
                  酸の強さ
                </label>
              </div>
              <div className={styles.edit__data}>{browse.acidityStrength}</div>

              <div className={styles.edit__point__memo}>
                <div className={styles.edit__strength}>
                  <div className={styles.edit__strength__img}>
                    <Image
                      src={"/images/strength.png"}
                      alt={"Strengthの図"}
                      width={50}
                      height={100}
                      priority
                    />
                  </div>

                  <p className={styles.edit__strength__text}>
                    H2：最も強い
                    <br />
                    H1：強い
                    <br />
                    M ：標準
                    <br />
                    L1：弱い
                    <br />
                    L2：最も弱い
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>11</span>
                  口に含んだ質感
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}> {browse.mouthfeel}</div>
            </div>

            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>11-1</span>
                  ボディの強さ
                </label>
              </div>
              <div className={styles.edit__data}>{browse.bodyStrength}</div>
              <div className={styles.edit__point__memo}>
                <div className={styles.edit__strength}>
                  <div className={styles.edit__strength__img}>
                    <Image
                      src={"/images/strength.png"}
                      alt={"Strengthの図"}
                      width={50}
                      height={100}
                      priority
                    />
                  </div>

                  <p className={styles.edit__strength__text}>
                    H2：最も強い
                    <br />
                    H1：強い
                    <br />
                    M ：標準
                    <br />
                    L1：弱い
                    <br />
                    L2：最も弱い
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>12</span>
                  フレーバー
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}> {browse.flavor}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>風味の質を評価する</p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>13</span>
                  後味の印象度
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}> {browse.after}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  後味は心地よいか、そうでないか評価。
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>14</span>
                  バランス
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}> {browse.balance}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  「7～13」の要素に悪目立ちしているものがなく、
                  <wbr />
                  全体のバランスが良い程加点。
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>15</span>
                  総合評価
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit__data}> {browse.overall}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  味わいの奥行など項目にない点にも着目し、ここまでの評価に囚われず、主観で付ける。
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>16</span>
                  小計
                </label>
              </div>
              <div className={styles.edit__data}>{browse.result}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  <span className={styles.edit__item__mark}>
                    <Image
                      src="/images/exclamation_img.svg"
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
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>17</span>
                  TOTAL (+36点)
                </label>
              </div>
              <div className={styles.edit__data}>{browse.total}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  小計項目の得点に定数３６点を足して出た数字。
                  <br />
                  １００点満点で評価。
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>18</span>
                  味の印象度
                </label>
              </div>
              <div className={styles.edit__data}>{browse.impression}</div>
              <div className={styles.edit__point__memo}>
                <p className={styles.edit__point__text}>
                  具体的な味の印象を記入。フレーバーの表現もカッピングの重要な目的。
                  <br />
                  冷めていく過程で、味わいがどのように変化したかも都度メモしておくとよい。
                </p>
              </div>
            </div>
            <div className={styles.edit__item}>
              <div className={styles.edit__data__header}>
                <label>
                  <span className={styles.edit__item__number}>19</span>
                  memo
                </label>
              </div>
              <div className={styles.edit__data}>{browse.memo}</div>
            </div>

            <div className={styles.edit__btn__box}>
              <HomeBtn email={isUserEmail} />
              <DeleteBtn data={browse._id} email={isUserEmail} />

              <EditBtn data={browse._id} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
