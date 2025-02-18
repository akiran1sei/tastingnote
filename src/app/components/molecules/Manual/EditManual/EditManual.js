"use client";
import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
import { Popup } from "@/app/components/items/popup";

import React, { useState } from "react";
import Link from "next/link";
export function EditManualComponent() {
  const [showDefectPopup, setShowDefectPopup] = useState(false); // Popup の表示状態を管理する state
  const [showBeansPopup, setShowBeansPopup] = useState(false); // Popup の表示状態を管理する state
  const [showStrengthPopup, setShowStrengthPopup] = useState(false); // Popup の表示状態を管理する state

  const popup_defect = () => {
    return (
      <div
        className={`${manual.manual__edit__text} ${manual.manual__text}`}
        role="dialog"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
      >
        <h2
          className={`${manual.popup__title} ${manual.manual__text}`}
          id="popup-title"
        >
          計算式の要素
        </h2>
        <h3 className={`${manual.popup__sub__title} ${manual.manual__text}`}>
          「#」（欠点の数）
        </h3>
        <p>
          欠点が発見されたサンプルのカップ数（複数のカップにまたがっている場合、その数をカウント）
        </p>
        <h3 className={`${manual.popup__sub__title} ${manual.manual__text}`}>
          「i」（欠点の影響度）
        </h3>
        <p> 欠点の影響の大きさを示す係数（1～3の範囲で設定されることが多い）</p>
        <ul>
          <li> 1：軽微な欠点（風味にわずかに影響）</li>
          <li> 2：中程度の欠点（風味に明らかな影響）</li>
          <li> 3：重大な欠点（風味を著しく損なう）</li>
        </ul>
        <h4 className={`${manual.popup__detail} ${manual.manual__text}`}>
          <span className={manual.underBar}>「i」の判定例</span>
        </h4>
        <div className={manual.popup__table__box}>
          <table border={1}>
            <thead>
              <tr>
                <th>影響度 (i)</th>

                <th>欠点の種類</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1（軽微な欠点）</td>

                <td>軽い発酵臭がするが、微かで大きな問題にはならない</td>
              </tr>
              <tr>
                <td>2（中程度の欠点）</td>

                <td>酸味が異常に強く、発酵臭が目立つ</td>
              </tr>
              <tr>
                <td>3（重大な欠点）</td>
                <td>強いカビ臭、腐敗臭があり、飲むのが困難</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className={`${manual.popup__sub__title} ${manual.manual__text}`}>
          「4」（定数）
        </h3>
        <p>欠点スコアの標準化のために掛けられる定数</p>
        <p>この「4」を掛けることで欠点の影響がスコアとして調整される</p>
      </div>
    );
  };

  const popup_beans = () => {
    return (
      <>
        <div
          className={`${manual.manual__edit__text} ${manual.manual__text}`}
          role="dialog"
          aria-labelledby="popup-title"
          aria-describedby="popup-description"
        >
          <h2
            className={`${manual.popup__title} ${manual.manual__text}`}
            id="popup-title"
          >
            焙煎度とパーセンテージ
          </h2>
          <h3 className={`${manual.popup__sub__title} ${manual.manual__text}`}>
            焙煎度イメージ
          </h3>
          <p>このアプリ内での焙煎度の色合いとその名称の画像イメージです。</p>
          <div
            className={`${manual.manual__edit__roast__img} ${manual.manual__img}`}
          >
            <Image
              src="/images/png/roast_Img.png"
              width={600}
              height={372}
              priority
              alt="ローストのイメージ画像"
            />
          </div>
          <h3 className={`${manual.popup__sub__title} ${manual.manual__text}`}>
            パーセンテージ（％）
          </h3>
          <p> アプリ内でのパーセンテージによるその焙煎度</p>

          <h4 className={`${manual.popup__detail} ${manual.manual__text}`}>
            <span className={manual.underBar}>パーセンテージ</span>
          </h4>

          <div className={manual.popup__table__box}>
            <table border={1}>
              <thead>
                <tr>
                  <th>焙煎度</th>

                  <th>パーセンテージ（％）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Light roast（ライト ロースト）</td>

                  <td>0～15%</td>
                </tr>
                <tr>
                  <td> Cinnamon roast（シナモン）</td>

                  <td>16%～30%</td>
                </tr>
                <tr>
                  <td>Medium roast（ミディアム）</td>

                  <td>31%～45%</td>
                </tr>
                <tr>
                  <td>High roast（ハイ）</td>

                  <td>46%～60%</td>
                </tr>
                <tr>
                  <td>City roast（シティ）</td>

                  <td>61%～75%</td>
                </tr>
                <tr>
                  <td>Full city roast（フルシティ）</td>

                  <td>76%～90%</td>
                </tr>
                <tr>
                  <td>French roast（フレンチ）</td>

                  <td>90%～99%</td>
                </tr>
                <tr>
                  <td>Italian roast（イタリアン）</td>

                  <td>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  const popup_strength = () => {
    return (
      <div
        className={`${manual.manual__edit__text} ${manual.manual__text}`}
        role="dialog"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
      >
        <h2
          className={`${manual.popup__title} ${manual.manual__text}`}
          id="popup-title"
        >
          酸味とコクの強さについて
        </h2>
        <h3 className={`${manual.popup__sub__title} ${manual.manual__text}`}>
          酸味の強さとコクの強さの評価方法
        </h3>
        <div className={manual.manual__edit__strength__box}>
          <div
            className={`${manual.manual__edit__strength__img} ${manual.manual__img}`}
          >
            <Image
              src={"/images/png/strength.png"}
              alt={"Strengthの図"}
              width={50}
              height={100}
              priority
            />
          </div>
          <div
            className={`${manual.manual__edit__strength__text} ${manual.manual__text}`}
          >
            <p>H2：最も強い</p>
            <p>H1：強い </p>
            <p>M ：標準 </p>
            <p>L1：弱い</p>
            <p>L2：最も弱い</p>
          </div>
        </div>
      </div>
    );
  };
  const DefectsText = popup_defect();
  const BeansText = popup_beans();
  const StrengthText = popup_strength();
  return (
    <>
      {showDefectPopup && (
        <Popup
          contexts={DefectsText}
          onClose={() => setShowDefectPopup(!showDefectPopup)}
        />
      )}
      {showBeansPopup && (
        <Popup
          contexts={BeansText}
          onClose={() => setShowBeansPopup(!showBeansPopup)}
        />
      )}
      {showStrengthPopup && (
        <Popup
          contexts={StrengthText}
          onClose={() => setShowStrengthPopup(!showStrengthPopup)}
        />
      )}

      <div className={`${manual.manual__edit} ${manual.manual__container}`}>
        <h2 className={manual.manual__sub__title}>
          <span className={manual.fontYellow}>
            Create（Update）の
            <br className={manual.line__break} />
            使い方・見方
          </span>
        </h2>
        <div
          className={`${manual.manual__edit__list__box} ${manual.manual__list__box}`}
        >
          <ul className={`${manual.manual__edit__list} ${manual.manual__list}`}>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １：Date
              </span>

              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                作成日時（西暦・月・日）
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ２：Group Name
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                グループ名選択欄です。グループ作成はメニューの”Group”より作成してください。
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ３：User
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                デフォルトは、プロフィールのユーザー名になっています。お好みで変更してください。
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ４：Coffee
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                コーヒー名や番号など
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ５：Roast
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                焙煎度の種類で、数字が大きいほど焙煎度が高いです。
                <br />
                焙煎度が最も低いのが
                <span className={manual.underBar}>
                  Light roast（ライト ロースト）
                </span>
                <br />
                焙煎度が最も高いのが
                <span className={manual.underBar}>
                  Italian roast（イタリアン）
                </span>
                になります
              </span>
              <span className={manual.popup__box}>
                <button
                  className={`${manual.manual__edit__btn} ${manual.popup__open}`}
                  onClick={() => setShowBeansPopup(!showBeansPopup)}
                  type="button"
                >
                  焙煎度
                </button>
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ６：Aroma
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                Aromaは、
                <span className={manual.underBar}>｛Dry・Crust・Break｝</span>
                の3つで構成され、それぞれの香りの強さ（Strength）と質（Quality）を評価し点数を付ける。
                <br />
                点数の幅は、‐3～3までの0を含む正負の数で付けることになる
                <br />
                なお、ここでの点数は Total（Sub Total）の点数には加算されない
              </span>
              <ul className={manual.manual__edit__aroma__list}>
                <li className={manual.manual__edit__aroma__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                  >
                    Dry
                  </span>
                  <span
                    className={`${manual.manual__edit__text} ${manual.manual__text}`}
                  >
                    粉の状態
                  </span>
                </li>
                <li className={manual.manual__edit__aroma__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                  >
                    Crust
                  </span>
                  <span
                    className={`${manual.manual__edit__text} ${manual.manual__text}`}
                  >
                    湯を注いだ直後
                  </span>
                </li>
                <li className={manual.manual__edit__aroma__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                  >
                    Break
                  </span>
                  <span
                    className={`${manual.manual__edit__text} ${manual.manual__text}`}
                  >
                    混ぜた後
                  </span>
                </li>
              </ul>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ７：Defects
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                欠点・瑕疵があるかどうかを決める項目。
                <br />
                カッピングは通常５～６カップで１ロット（同じコーヒー豆）として考えるので、１カップに欠点・瑕疵があれば１となり６カップ中３カップ発見すれば３計算する（１カップにいくつも欠点・瑕疵を見つけても１とする）
                発見したカップ（＃）、欠点・瑕疵の影響度レベル［１・２・３］（ｉ）、最後に定数である４を”計算式”に当てはめ算出する。
                <span className={manual.manual__edit__text}>
                  <span className={manual.popup__box}>
                    <button
                      className={`${manual.manual__edit__btn} ${manual.popup__open}`}
                      onClick={() => setShowDefectPopup(!showDefectPopup)}
                      type="button"
                    >
                      計算式：『＃×ｉ× 4（定数）』
                    </button>
                  </span>
                </span>
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ８：Clean Cap
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                コーヒーに雑味がなく、クリアでクリーンな味わいであること
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ９：Sweet
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                コーヒーが持つ甘さの質、量、持続性
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １０：Acidity
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                コーヒーの酸味の明るさ、爽やかさ、心地よさ。
              </span>
              <span className={manual.manual__edit__strength}>
                <span
                  className={`${manual.manual__edit__number} ${manual.fontYellow} ${manual.manual__text} ${manual.manual__edit__text}`}
                >
                  Acidity Strength
                </span>
                <span
                  className={`${manual.manual__edit__text} ${manual.manual__text}`}
                >
                  &ensp;酸の強さ
                  <span className={manual.popup__box}>
                    <button
                      className={`${manual.manual__edit__btn} ${manual.popup__open}`}
                      onClick={() => setShowStrengthPopup(!showStrengthPopup)}
                      type="button"
                    >
                      評価方法
                    </button>
                  </span>
                </span>
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １１：Mouthfeel
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                コーヒーの口当たり、舌触り、重さ、滑らかさ。
              </span>
              <span className={manual.manual__edit__strength}>
                <span
                  className={`${manual.manual__edit__number} ${manual.fontYellow} ${manual.manual__text} ${manual.manual__edit__text}`}
                >
                  Body Strength
                </span>
                <span
                  className={`${manual.manual__edit__text} ${manual.manual__text}`}
                >
                  &ensp;ボディ（コク）の強さ
                  <span className={manual.popup__box}>
                    <button
                      className={`${manual.manual__edit__btn} ${manual.popup__open}`}
                      onClick={() => setShowStrengthPopup(!showStrengthPopup)}
                      type="button"
                    >
                      評価方法
                    </button>
                  </span>
                </span>
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １２：Flavor
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                コーヒーが持つ香りと味の複雑さ、多様性、心地よさ。
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １３：After
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                コーヒーを飲んだ後に口の中に残る風味の印象。
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １４：Balance
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                フレーバー、酸味、甘さ、口に含んだ質感などが調和していること。
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １５：Overall
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                上記のすべての要素を総合的に評価したコーヒーの完成度。
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １６：Sub Total
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                上記の［Defects、Clean
                Cap、Sweet、Acidity、Mouthfeel、Flavor、After、Balance、Overall］での点数の合計値
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １７：TOTAL (+36点)
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                ”Sub Total”の合計値に基礎点数である”３６点”を加算した点数
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １８：Impression
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                具体的な味の印象を記入。フレーバーの表現もカッピングの重要な目的。
                <br />
                冷めていく過程で、味わいがどのように変化したかも都度メモしておくとよい
              </span>
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １９：memo
              </span>
              <span
                className={`${manual.manual__edit__text} ${manual.manual__text}`}
              >
                その他記入したことなど…
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
