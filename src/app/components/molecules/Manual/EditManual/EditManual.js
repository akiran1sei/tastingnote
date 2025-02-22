"use client";
import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
import { Popup } from "@/app/components/items/popup";
import React, { useState } from "react";

// Defects ポップアップコンポーネント
const DefectsPopupContent = () => (
  <div className={`${manual.edit__text} ${manual.text}`}>
    <h2 className={`${manual.popup__title} ${manual.text}`}>計算式の要素</h2>
    <h3 className={`${manual.popup__subTitle} ${manual.text}`}>
      「#」（欠点の数）
    </h3>
    <p>
      欠点が発見されたサンプルのカップ数（複数のカップにまたがっている場合、その数をカウント）
    </p>
    <h3 className={`${manual.popup__subTitle} ${manual.text}`}>
      「i」（欠点の影響度）
    </h3>
    <p>欠点の影響の大きさを示す係数（1～3の範囲で設定されることが多い）</p>
    <ul>
      <li>1：軽微な欠点（風味にわずかに影響）</li>
      <li>2：中程度の欠点（風味に明らかな影響）</li>
      <li>3：重大な欠点（風味を著しく損なう）</li>
    </ul>
    <h4 className={`${manual.popup__detail} ${manual.text}`}>
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
    <h3 className={`${manual.popup__subTitle} ${manual.text}`}>
      「4」（定数）
    </h3>
    <p>欠点スコアの標準化のために掛けられる定数</p>
    <p>この「4」を掛けることで欠点の影響がスコアとして調整される</p>
  </div>
);

// Beans ポップアップコンポーネント
const BeansPopupContent = () => (
  <>
    <div className={`${manual.edit__text} ${manual.text}`}>
      <h2 className={`${manual.popup__title} ${manual.text}`}>
        焙煎度とパーセンテージ
      </h2>
      <h3 className={`${manual.popup__subTitle} ${manual.text}`}>
        焙煎度イメージ
      </h3>
      <p>このアプリ内での焙煎度の色合いとその名称の画像イメージです。</p>
      <div className={`${manual.edit__roast__img} ${manual.imgBox}`}>
        <Image
          src="/images/png/roast_Img.png"
          width={600}
          height={372}
          priority
          alt="ローストのイメージ画像"
        />
      </div>
      <h3 className={`${manual.popup__subTitle} ${manual.text}`}>
        パーセンテージ（％）
      </h3>
      <p>アプリ内でのパーセンテージによるその焙煎度</p>
      <h4 className={`${manual.popup__detail} ${manual.text}`}>
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
              <td>Light roast（ライト ロースト）</td>
              <td>0～15%</td>
            </tr>
            <tr>
              <td>Cinnamon roast（シナモン）</td>
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

// Strength ポップアップコンポーネント
const StrengthPopupContent = () => (
  <div className={`${manual.edit__text} ${manual.text}`}>
    <h2 className={`${manual.popup__title} ${manual.text}`}>
      酸味とコクの強さについて
    </h2>
    <h3 className={`${manual.popup__subTitle} ${manual.text}`}>
      酸味の強さとコクの強さの評価方法
    </h3>
    <div className={manual.edit__strength__box}>
      <div className={`${manual.edit__strength__img} ${manual.imgBox}`}>
        <Image
          src={"/images/png/strength.png"}
          alt={"Strengthの図"}
          width={50}
          height={100}
          priority
        />
      </div>
      <div className={`${manual.edit__strength__text} ${manual.text}`}>
        <p>H2：最も強い</p>
        <p>H1：強い </p>
        <p>M ：標準 </p>
        <p>L1：弱い</p>
        <p>L2：最も弱い</p>
      </div>
    </div>
  </div>
);

// リストアイテムコンポーネント
const EditListItem = ({
  number,
  title,
  description,
  popupContent,
  setShowPopup,
}) => (
  <li className={`${manual.edit__item} ${manual.item}`}>
    <span
      className={`${manual.edit__number} ${manual.underBar} ${manual.text} ${manual.highlighting} ${manual.edit__text}`}
    >
      {number}：{title}
    </span>
    <span className={`${manual.edit__text} ${manual.text}`}>{description}</span>
    {popupContent && (
      <span className={manual.popup__box}>
        <button
          className={`${manual.edit__btn} ${manual.popup__open}`}
          onClick={() => setShowPopup(true)}
          type="button"
        >
          {popupContent.buttonText}
        </button>
      </span>
    )}
  </li>
);

export function EditManualComponent() {
  const [showDefectPopup, setShowDefectPopup] = useState(false);
  const [showBeansPopup, setShowBeansPopup] = useState(false);
  const [showStrengthPopup, setShowStrengthPopup] = useState(false);

  return (
    <>
      {showDefectPopup && (
        <Popup
          contexts={<DefectsPopupContent />}
          onClose={() => setShowDefectPopup(false)}
        />
      )}
      {showBeansPopup && (
        <Popup
          contexts={<BeansPopupContent />}
          onClose={() => setShowBeansPopup(false)}
        />
      )}
      {showStrengthPopup && (
        <Popup
          contexts={<StrengthPopupContent />}
          onClose={() => setShowStrengthPopup(false)}
        />
      )}

      <div className={`${manual.edit} ${manual.container}`}>
        <section className={manual.section}>
          <h2 className={manual.subTitle}>
            <span className={manual.fontYellow}>Create（Update）</span>
          </h2>
          <div className={`${manual.edit__listBox} ${manual.listBox}`}>
            <ul className={`${manual.edit__list} ${manual.list}`}>
              <EditListItem
                number="1"
                title="Date"
                description="作成日時（西暦・月・日）"
              />
              <EditListItem
                number="2"
                title="Group Name"
                description="グループ名選択欄です。グループ作成はメニューの”Group”より作成してください。"
              />
              <EditListItem
                number="3"
                title="User"
                description="デフォルトは、プロフィールのユーザー名になっています。お好みで変更してください。"
              />
              <EditListItem
                number="4"
                title="Coffee"
                description="コーヒー名や番号など"
              />
              <EditListItem
                number="5"
                title="Roast"
                description={
                  <>
                    <span className={`${manual.edit__text} ${manual.text}`}>
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
                        className={`${manual.edit__btn} ${manual.popup__open}`}
                        onClick={() => setShowBeansPopup(!showBeansPopup)}
                        type="button"
                      >
                        焙煎度
                      </button>
                    </span>
                  </>
                }
              />
              <EditListItem
                number="6"
                title="Aroma"
                description={
                  <>
                    <span className={`${manual.edit__text} ${manual.text}`}>
                      Aromaは、
                      <span className={manual.underBar}>
                        ｛Dry・Crust・Break｝
                      </span>
                      の3つで構成され、それぞれの香りの強さ（Strength）と質（Quality）を評価し点数を付ける。
                      <br />
                      点数の幅は、‐3～3までの0を含む正負の数で付けることになる
                      <br />
                      なお、ここでの点数は Total（Sub
                      Total）の点数には加算されない
                    </span>
                    <ul className={manual.edit__aroma__list}>
                      <li className={manual.edit__aroma__item}>
                        <span
                          className={`${manual.edit__number} ${manual.underBar} ${manual.text} ${manual.edit__text}`}
                        >
                          Dry
                        </span>
                        <span className={`${manual.edit__text} ${manual.text}`}>
                          粉の状態
                        </span>
                      </li>
                      <li className={manual.edit__aroma__item}>
                        <span
                          className={`${manual.edit__number} ${manual.underBar} ${manual.text} ${manual.edit__text}`}
                        >
                          Crust
                        </span>
                        <span className={`${manual.edit__text} ${manual.text}`}>
                          湯を注いだ直後
                        </span>
                      </li>
                      <li className={manual.edit__aroma__item}>
                        <span
                          className={`${manual.edit__number} ${manual.underBar} ${manual.text} ${manual.edit__text}`}
                        >
                          Break
                        </span>
                        <span className={`${manual.edit__text} ${manual.text}`}>
                          混ぜた後
                        </span>
                      </li>
                    </ul>
                  </>
                }
              />
              <EditListItem
                number="7"
                title="Defects"
                description={
                  <span className={`${manual.edit__text} ${manual.text}`}>
                    欠点・瑕疵があるかどうかを決める項目。
                    <br />
                    カッピングは通常５～６カップで１ロット（同じコーヒー豆）として考えるので、１カップに欠点・瑕疵があれば１となり６カップ中３カップ発見すれば３計算する（１カップにいくつも欠点・瑕疵を見つけても１とする）
                    発見したカップ（＃）、欠点・瑕疵の影響度レベル［１・２・３］（ｉ）、最後に定数である４を”計算式”に当てはめ算出する。
                    <span className={manual.edit__text}>
                      <span className={manual.popup__box}>
                        <button
                          className={`${manual.edit__btn} ${manual.popup__open}`}
                          onClick={() => setShowDefectPopup(!showDefectPopup)}
                          type="button"
                        >
                          計算式：『＃×ｉ× 4（定数）』
                        </button>
                      </span>
                    </span>
                  </span>
                }
              />
              <EditListItem
                number="8"
                title="Clean Cap"
                description="コーヒーに雑味がなく、クリアでクリーンな味わいであること"
              />
              <EditListItem
                number="9"
                title="Sweet"
                description="コーヒーが持つ甘さの質、量、持続性"
              />
              <EditListItem
                number="10"
                title="Acidity"
                description={
                  <>
                    {" "}
                    <span className={`${manual.edit__text} ${manual.text}`}>
                      コーヒーの酸味の明るさ、爽やかさ、心地よさ。
                    </span>
                    <span className={manual.edit__strength}>
                      <span
                        className={`${manual.edit__number} ${manual.fontYellow} ${manual.text} ${manual.edit__text}`}
                      >
                        Acidity Strength
                      </span>
                      <span className={`${manual.edit__text} ${manual.text}`}>
                        &ensp;酸の強さ
                        <span className={manual.popup__box}>
                          <button
                            className={`${manual.edit__btn} ${manual.popup__open}`}
                            onClick={() =>
                              setShowStrengthPopup(!showStrengthPopup)
                            }
                            type="button"
                          >
                            評価方法
                          </button>
                        </span>
                      </span>
                    </span>
                  </>
                }
              />
              <EditListItem
                number="11"
                title="Mouthfeel"
                description={
                  <>
                    <span className={`${manual.edit__text} ${manual.text}`}>
                      コーヒーの口当たり、舌触り、重さ、滑らかさ。
                    </span>
                    <span className={manual.edit__strength}>
                      <span
                        className={`${manual.edit__number} ${manual.fontYellow} ${manual.text} ${manual.edit__text}`}
                      >
                        Body Strength
                      </span>
                      <span className={`${manual.edit__text} ${manual.text}`}>
                        &ensp;ボディ（コク）の強さ
                        <span className={manual.popup__box}>
                          <button
                            className={`${manual.edit__btn} ${manual.popup__open}`}
                            onClick={() =>
                              setShowStrengthPopup(!showStrengthPopup)
                            }
                            type="button"
                          >
                            評価方法
                          </button>
                        </span>
                      </span>
                    </span>
                  </>
                }
              />
              <EditListItem
                number="12"
                title="Flavor"
                description="コーヒーが持つ香りと味の複雑さ、多様性、心地よさ。"
              />
              <EditListItem
                number="13"
                title="After"
                description="コーヒーを飲んだ後に口の中に残る風味の印象。"
              />
              <EditListItem
                number="14"
                title="Balance"
                description="フレーバー、酸味、甘さ、口に含んだ質感などが調和していること。"
              />
              <EditListItem
                number="15"
                title="Overall"
                description="上記のすべての要素を総合的に評価したコーヒーの完成度。"
              />
              <EditListItem
                number="16"
                title="Sub Total"
                description=" 上記の［Defects、Clean
                  Cap、Sweet、Acidity、Mouthfeel、Flavor、After、Balance、Overall］での点数の合計値
                "
              />
              <EditListItem
                number="17"
                title="TOTAL (+36点)"
                description=" ”Sub Total”の合計値に基礎点数である”３６点”を加算した点数"
              />
              <EditListItem
                number="18"
                title="Impression"
                description={
                  <span className={`${manual.edit__text} ${manual.text}`}>
                    具体的な味の印象を記入。フレーバーの表現もカッピングの重要な目的。
                    <br />
                    冷めていく過程で、味わいがどのように変化したかも都度メモしておくとよい
                  </span>
                }
              />
              <EditListItem
                number="19"
                title="memo"
                description="その他記入したことなど…"
              />
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
