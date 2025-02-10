import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
export function ManualComponent() {
  return (
    <>
      <div className={manual.manual__contents}>
        <div className={manual.manual__wrap}>
          <h1 className={manual.contents__title}>Manual</h1>
          <div className={manual.manual__select}>
            <h2 className={manual.manual__sub__title}>
              <span className={manual.underBar}>selectの見方</span>
            </h2>
            <div className={manual.manual__img}>
              <Image
                src="/images/select_manual_1-600.png"
                width={600}
                height={96}
                priority
                alt="セレクトページのイメージ画像"
              />
            </div>
            <div className={manual.manual__select__list__box}>
              <ol className={manual.manual__select__list}>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    No.
                  </span>
                  <span className={manual.manual__select__text}>
                    作成した順番, Beans:豆の名前、又は、番号
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Roast
                  </span>
                  <span className={manual.manual__select__roast__img}>
                    <Image
                      src="/images/Roast_Img.png"
                      width={600}
                      height={96}
                      priority
                      alt="ローストのイメージ画像"
                    />
                  </span>
                  <span className={manual.manual__select__text}>
                    焙煎度によるパーセンテージと焙煎度の名前
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Aroma
                  </span>
                  <span className={manual.manual__select__text}>
                    ”dry”・”crust”・”break”に分かれる。
                    評価点数は、”-3”～”3”（-3,-2,-1,0,1,2,3）間で付けられる,
                  </span>
                  <span className={manual.manual__select__text}>
                    ”dry”は粉の状態からの香り、”crust”は湯を注いだ直後の香り、
                    ”break”は混ぜた後の香りで、強さ（左）と質（右）で評価している。
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Defects
                  </span>
                  <span className={manual.manual__select__text}>
                    「傷」「欠点」のこと
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Clean Cap
                  </span>
                  <span className={manual.manual__select__text}>
                    味わいの透明度
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Sweet
                  </span>
                  <span className={manual.manual__select__text}>豆の甘み</span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Acidity
                  </span>
                  <span className={manual.manual__select__text}>
                    酸の質とその強さのことで、酸の質は点数で評価され、酸の強さは5段階で表されこのページでは縦長で表されている、
                    <br />
                    下から｛L2・L1・M・H1・H2｝となっており、
                    ”L”はLow、”M”はMedium、”H”はHighのそれぞれの略称で下から高い順に上がっている
                  </span>
                  <span className={manual.manual__select__strength}>
                    <span className={manual.manual__select__strength__img}>
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
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Mouthfeel
                  </span>
                  <span className={manual.manual__select__text}>
                    口当たりの評価とコクの強弱で、口当たりの評価は点数評価で、コクの強弱は上記の”Acidity”の酸の強さと同じ評価方法を取っています
                  </span>
                  <span className={manual.manual__select__strength}>
                    <span className={manual.manual__select__strength__img}>
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
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Flavor
                  </span>
                  <span className={manual.manual__select__text}>
                    風味の質を評価
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    After
                  </span>
                  <span className={manual.manual__select__text}>
                    後味の印象
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    Balance
                  </span>
                  <span className={manual.manual__select__text}>
                    Defects/CleanCap/Sweet/Acidity/Mouthfeel/Flavor/After/の項目での”全体のバランス”
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    OverAll
                  </span>
                  <span className={manual.manual__select__text}>
                    味わいの奥行など項目にない点にも着目し、ここまでの評価に囚われず、主観で付けられている,
                  </span>
                </li>
                <li className={manual.manual__select__item}>
                  <span
                    className={`${manual.manual__select__text} ${manual.underBar} ${manual.highlighting}`}
                  >
                    TOTAL
                  </span>
                  <span className={manual.manual__select__text}>
                    付けられた点数を合計し、基礎点数である（36点）を加えた点数
                  </span>
                </li>
              </ol>
            </div>
          </div>
          <div className={manual.manual__edit}>
            <h2 className={manual.manual__sub__title}>
              <span className={manual.underBar}>create(update)の見方</span>
            </h2>
            <div className={manual.manual__edit__list__box}>
              <ol className={manual.manual__edit__list}>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Date
                  </span>
                  <span className={manual.manual__edit__text}>
                    作成日時（西暦・月・日）
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Group Name
                  </span>
                  <span className={manual.manual__edit__text}>
                    グループ名選択欄です。グループ作成はメニューの”Group”より作成してください。
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    User
                  </span>
                  <span className={manual.manual__edit__text}>
                    デフォルトは、登録時のアカウントEmailになっています。お好みで変更してください。
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Coffee
                  </span>
                  <span className={manual.manual__edit__text}>
                    コーヒー名や番号など
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Roast
                  </span>
                  <span className={manual.manual__edit__text}>
                    焙煎度の種類で、数字が大きいほど焙煎度が高いです。（焙煎度が最も低い：Light
                    roast（ライト ロースト）/焙煎度が最も高い：Italian
                    roast（イタリアン）になります）
                  </span>
                  <ul className={manual.manual__edit__roast__list}>
                    <li className={manual.manual__edit__roast__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Light roast（ライト ロースト）
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Cinnamon roast（シナモン）
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Medium roast（ミディアム）
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        High roast（ハイ）
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        City roast（シティ）
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Full city roast（フルシティ）
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        French roast（フレンチ）
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Italian roast（イタリアン）
                      </span>
                    </li>
                  </ul>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Aroma
                  </span>
                  <ul className={manual.manual__edit__aroma__list}>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Dry
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Crust
                      </span>
                    </li>
                    <li className={manual.manual__edit__aroma__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Break
                      </span>
                    </li>
                  </ul>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Defects
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Clean Cap
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Sweet
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Acidity
                  </span>
                  <ul className={manual.manual__edit__strength__list}>
                    <li className={manual.manual__edit__strength__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Acidity Strength
                      </span>
                    </li>
                  </ul>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Mouthfeel
                  </span>
                  <ul className={manual.manual__edit__strength__list}>
                    <li className={manual.manual__edit__strength__list}>
                      <span
                        className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                      >
                        Body Strength
                      </span>
                    </li>
                  </ul>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Flavor
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    After
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Balance
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Overall
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Sub Total
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    TOTAL (+36点)
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    Impression
                  </span>
                </li>
                <li className={manual.manual__edit__item}>
                  <span
                    className={`${manual.manual__edit__number} ${manual.manual__edit__text}`}
                  >
                    memo
                  </span>
                </li>
              </ol>
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
