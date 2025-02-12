import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
export function ManualComponent() {
  return (
    <>
      <div className={manual.manual__contents}>
        <div className={manual.manual__wrap}>
          <h1 className={manual.contents__title}>Manual</h1>
          <div
            className={`${manual.manual__select} ${manual.manual__contents}`}
          >
            <h2 className={manual.manual__sub__title}>
              <span className={manual.underBar}>
                selectの使い方・見方マニュアル
              </span>
            </h2>
            <div
              className={`${manual.manual__img} ${manual.manual__select__img}`}
            >
              <Image
                src="/images/select_manual_1-600.png"
                width={600}
                height={96}
                priority
                alt="セレクトページのイメージ画像"
              />
            </div>
            <div
              className={`${manual.manual__select__list__box} ${manual.manual__list__box}`}
            >
              <ol
                className={`${manual.manual__select__list} ${manual.manual__list}`}
              >
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    No.
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    作成した順番, Beans:豆の名前、又は、番号
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Roast
                  </span>
                  <span
                    className={`${manual.manual__select__roast__img} ${manual.manual__img}`}
                  >
                    <Image
                      src="/images/Roast_Img-2x.png"
                      // width={300}
                      // height={186}
                      width={300}
                      height={372}
                      priority
                      alt="ローストのイメージ画像"
                    />
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    焙煎度によるパーセンテージと焙煎度の名前
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Aroma
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    ”dry”・”crust”・”break”に分かれる。
                    評価点数は、”-3”～”3”（-3,-2,-1,0,1,2,3）間で付けられる,
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    ”dry”は粉の状態からの香り、”crust”は湯を注いだ直後の香り、
                    ”break”は混ぜた後の香りで、強さ（左）と質（右）で評価している。
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Defects
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    「傷」「欠点」のこと
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Clean Cap
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    味わいの透明度
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Sweet
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    豆の甘み
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Acidity
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    酸の質とその強さのことで、酸の質は点数で評価され、酸の強さは5段階で表されこのページでは縦長で表されている、
                    <br />
                    下から｛L2・L1・M・H1・H2｝となっており、
                    ”L”はLow、”M”はMedium、”H”はHighのそれぞれの略称で下から高い順に上がっている
                  </span>
                  <span className={manual.manual__select__strength}>
                    <span
                      className={`${manual.manual__select__strength__img} ${manual.manual__img}`}
                    >
                      <Image
                        src={"/images/strength.png"}
                        alt={"Strengthの図"}
                        width={50}
                        height={100}
                        priority
                      />
                    </span>
                    <span
                      className={`${manual.manual__select__strength__text} ${manual.small__font}`}
                    >
                      H2：最も強い
                      <br />
                      H1：強い
                      <br />
                      M ：標準
                      <br />
                      L1：弱い
                      <br />
                      L2：最も弱い
                    </span>
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Mouthfeel
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    口当たりの評価とコクの強弱で、口当たりの評価は点数評価で、コクの強弱は上記の”Acidity”の酸の強さと同じ評価方法を取っています
                  </span>
                  <span className={manual.manual__select__strength}>
                    <span
                      className={`${manual.manual__select__strength__img} ${manual.manual__img}`}
                    >
                      <Image
                        src={"/images/strength.png"}
                        alt={"Strengthの図"}
                        width={50}
                        height={100}
                        priority
                      />
                    </span>
                    <span
                      className={`${manual.manual__select__strength__text} ${manual.small__font}`}
                    >
                      H2：最も強い
                      <br />
                      H1：強い
                      <br />
                      M ：標準
                      <br />
                      L1：弱い
                      <br />
                      L2：最も弱い
                    </span>
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Flavor
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    風味の質を評価
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    After
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    後味の印象
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    Balance
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    Defects/CleanCap/Sweet/Acidity/Mouthfeel/Flavor/After/の項目での”全体のバランス”
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    OverAll
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    味わいの奥行など項目にない点にも着目し、ここまでの評価に囚われず、主観で付けられている,
                  </span>
                </li>
                <li
                  className={`${manual.manual__select__item} ${manual.manual__item}`}
                >
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.manual__text} ${manual.highlighting}`}
                  >
                    TOTAL
                  </span>
                  <span
                    className={`${manual.manual__select__text} ${manual.manual__text}`}
                  >
                    付けられた点数を合計し、基礎点数である（36点）を加えた点数
                  </span>
                </li>
              </ol>
            </div>
          </div>
          <div className={`${manual.manual__edit} ${manual.manual__contents}`}>
            <h2 className={manual.manual__sub__title}>
              <span className={manual.underBar}>
                create(update)の使い方・見方マニュアル
              </span>
            </h2>
            <div
              className={`${manual.manual__edit__list__box} ${manual.manual__list__box}`}
            >
              <ul
                className={`${manual.manual__edit__list} ${manual.manual__list}`}
              >
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
                    欠点・瑕疵があるかどうかを決める項目で、
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
            {/*   <div className={manual.manual__img}>
                 <Image
                  src="/images/Vector.png"
                  width={366}
                  height={4108}
                  priority
                  alt="createページのイメージ画像その1"
                /> 
                 <Image
                  src="/images/create_img2.png"
                  width={500}
                  height={600}
                  priority
                  alt="createページのイメージ画像その2"
                />
                <Image
                  src="/images/create_img3.png"
                  width={500}
                  height={600}
                  priority
                  alt="createページのイメージ画像その3"
                />
                <Image
                  src="/images/create_img4.png"
                  width={500}
                  height={600}
                  priority
                  alt="createページのイメージ画像その4"
                />
                <Image
                  src="/images/create_img5.png"
                  width={500}
                  height={600}
                  priority
                  alt="createページのイメージ画像その5"
                />
                <Image
                  src="/images/create_img6.png"
                  width={500}
                  height={600}
                  priority
                  alt="createページのイメージ画像その6"
                /> 
              </div>*/}
          </div>
        </div>
      </div>
    </>
  );
}
