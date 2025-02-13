import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
import { Popup } from "@/app/components/items/popup";
export function EditManualComponent() {
  const popup_text = () => {
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
        欠点が発見されたサンプルのカップ数（複数のカップにまたがっている場合、その数をカウント）
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
        この「4」を掛けることで欠点の影響がスコアとして調整される
      </div>
    );
  };

  const DefectsText = popup_text();
  const popupComponents = Popup(DefectsText);
  return (
    <>
      {popupComponents}
      <div className={`${manual.manual__edit} ${manual.manual__contents}`}>
        <h2 className={manual.manual__sub__title}>
          <span className={manual.underBar}>
            create(update)の使い方・見方マニュアル
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
              {/* <ul className={manual.manual__edit__roast__list}>
                    <li className={manual.manual__edit__roast__item}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                      >
                        Light roast（ライト ロースト）:0～15%
                      </span>
                    </li>
                    <li className={manual.manual__edit__roast__item}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                      >
                        Cinnamon roast（シナモン）:16%～30%
                      </span>
                    </li>
                    <li className={manual.manual__edit__roast__item}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                      >
                        Medium roast（ミディアム）:31%～45%
                      </span>
                    </li>
                    <li className={manual.manual__edit__roast__item}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                      >
                        High roast（ハイ）:46%～60%
                      </span>
                    </li>
                    <li className={manual.manual__edit__roast__item}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                      >
                        City roast（シティ）:61%～75%
                      </span>
                    </li>
                    <li className={manual.manual__edit__roast__item}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                      >
                        Full city roast（フルシティ）:76%～90%
                      </span>
                    </li>
                    <li className={manual.manual__edit__roast__item}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                      >
                        French roast（フレンチ）:90%～99%
                      </span>
                    </li>
                    <li className={manual.manual__edit__roast__item}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                      >
                        Italian roast（イタリアン）:100%
                      </span>
                    </li>
                  </ul> */}
              <span
                className={`${manual.manual__edit__roast__img} ${manual.manual__img}`}
              >
                <Image
                  src="/images/Roast_Img-2x.png"
                  width={600}
                  height={372}
                  priority
                  alt="ローストのイメージ画像"
                />
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
                <span
                  className={`${manual.manual__edit__text} ${manual.highlighting}`}
                >
                  計算式：『＃×ｉ× 4（定数）』
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
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                ９：Sweet
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
              <span className={manual.manual__edit__strength}>
                <span
                  className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                >
                  Acidity Strength
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
              <span className={manual.manual__edit__strength}>
                <span
                  className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.manual__edit__text}`}
                >
                  Body Strength
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
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １３：After
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
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １５：Overall
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
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １７：TOTAL (+36点)
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
            </li>
            <li
              className={`${manual.manual__edit__item} ${manual.manual__item}`}
            >
              <span
                className={`${manual.manual__edit__number} ${manual.underBar} ${manual.manual__text} ${manual.highlighting} ${manual.manual__edit__text}`}
              >
                １９：memo
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
