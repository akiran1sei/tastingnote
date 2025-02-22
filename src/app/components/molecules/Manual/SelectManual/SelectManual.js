import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
import Link from "next/link";

function SelectItem({ title, description, imageUrl, imageAlt }) {
  return (
    <div className={`${manual.select__itemGroup} ${manual.item}`}>
      <dt className={`${manual.select__item} ${manual.item__title}`}>
        <span
          className={`${manual.select__text} ${manual.underBar} ${manual.text} ${manual.highlighting}`}
        >
          {title}
        </span>
      </dt>
      <dd className={manual.item__description}>
        {description}
        {imageUrl && (
          <span className={`${manual.imgBox} ${manual.select__imgBox}`}>
            <Link href={imageUrl} passHref>
              <Image
                src={imageUrl}
                width={600}
                height={96}
                priority
                alt={imageAlt}
              />
            </Link>
          </span>
        )}
      </dd>
    </div>
  );
}

export function SelectManualComponent() {
  const items = [
    {
      title: "No.",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          作成した順番, Beans:豆の名前、又は、番号
        </span>
      ),
    },
    {
      title: "Roast",
      description: (
        <div
          className={manual.roast_container}
          aria-labelledby="roast-description"
        >
          <span
            className={`${manual.select__roast__img} ${manual.imgBox}`}
            id="roast-image"
          >
            <Image
              src="/images/png/roast_Img.png"
              width={300}
              height={372}
              priority
              alt="ローストのイメージ画像"
            />
          </span>
          <span
            className={`${manual.select__text} ${manual.text}`}
            id="roast-description"
          >
            焙煎度によるパーセンテージと焙煎度の名前
          </span>
        </div>
      ),
    },
    {
      title: "Aroma",
      description: (
        <>
          <ul className={manual.aroma__list}>
            <li className={manual.aroma__item}>
              <span className={manual.aroma__name}>Dry</span>
              <span className={manual.aroma__description}>
                粉の状態からの香り
              </span>
            </li>
            <li className={manual.aroma__item}>
              <span className={manual.aroma__name}>Crust</span>
              <span className={manual.aroma__description}>
                湯を注いだ直後の香り
              </span>
            </li>
            <li className={manual.aroma__item}>
              <span className={manual.aroma__name}>Break</span>
              <span className={manual.aroma__description}>混ぜた後の香り</span>
            </li>
          </ul>
          <span className={manual.select__text}>
            評価点数は、”-3”～”3”（-3,-2,-1,0,1,2,3）間で付けられます。
          </span>
          <span className={manual.select__text}>
            それぞれの香りの強さ（Strength）と質（Quality）を評価します。
          </span>
        </>
      ),
    },
    {
      title: "Defects",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          「傷」「欠点」のこと
        </span>
      ),
    },
    {
      title: "Clean Cap",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          味わいの透明度
        </span>
      ),
    },
    {
      title: "Sweet",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          豆の甘み
        </span>
      ),
    },
    {
      title: "Acidity",
      description: (
        <div
          className={manual.acidity__container}
          aria-labelledby="acidity-description acidity-strength"
        >
          <span
            className={`${manual.select__text} ${manual.text}`}
            id="acidity-description"
          >
            酸の質とその強さのことで、酸の質は点数で評価され、酸の強さは5段階で表されこのページでは縦長で表されている、
            <br />
            下から｛L2・L1・M・H1・H2｝となっており、
            ”L”はLow、”M”はMedium、”H”はHighのそれぞれの略称で下から高い順に上がっている
          </span>
          <div className={manual.strength__container} id="acidity-strength">
            <span
              className={`${manual.select__strength__imgBox} ${manual.imgBox}`}
            >
              <Image
                src={"/images/png/strength.png"}
                alt={"Strengthの図"}
                width={50}
                height={100}
                priority
              />
            </span>
            <span
              className={`${manual.select__strength__text} ${manual.small__font}`}
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
          </div>
        </div>
      ),
    },
    {
      title: "Mouthfeel",
      description: (
        <div
          className={manual.mouthfeel_container}
          aria-labelledby="mouthfeel-description mouthfeel-strength"
        >
          <span
            className={`${manual.select__text} ${manual.text}`}
            id="mouthfeel-description"
          >
            口当たりの評価とコクの強弱で、口当たりの評価は点数評価で、コクの強弱は上記の”Acidity”の酸の強さと同じ評価方法を取っています
          </span>
          <div className={manual.strength__container} id="mouthfeel-strength">
            <span
              className={`${manual.select__strength__imgBox} ${manual.imgBox}`}
            >
              <Image
                src={"/images/png/strength.png"}
                alt={"Strengthの図"}
                width={50}
                height={100}
                priority
              />
            </span>
            <span
              className={`${manual.select__strength__text} ${manual.small__font}`}
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
          </div>
        </div>
      ),
    },
    {
      title: "Flavor",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          風味の質を評価
        </span>
      ),
    },
    {
      title: "After",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          後味の印象
        </span>
      ),
    },
    {
      title: "Balance",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          Defects/CleanCap/Sweet/Acidity/Mouthfeel/Flavor/After/の項目での”全体のバランス”
        </span>
      ),
    },
    {
      title: "OverAll",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          味わいの奥行など項目にない点にも着目し、ここまでの評価に囚われず、主観で付けられている,
        </span>
      ),
    },
    {
      title: "TOTAL",
      description: (
        <span className={`${manual.select__text} ${manual.text}`}>
          付けられた点数を合計し、基礎点数である（36点）を加えた点数
        </span>
      ),
    },
    {
      title: "Select専用ボタン",
      description: (
        <>
          <span className={`${manual.select__text} ${manual.text}`}>
            左からデータ削除のボタン・検索ボタン（Group検索）・エクスポートボタン（CSV/PDF）
          </span>
          <span className={`${manual.imgBox} ${manual.select__button__imgBox}`}>
            <Link href={"/images/png/select-img3.png"} passHref>
              <Image
                src="/images/png/select-img3.png"
                width={495}
                height={195}
                priority
                alt="セレクトページのイメージ画像"
              />
            </Link>
          </span>
        </>
      ),
    },
    {
      title: "イメージ画像",
      description: (
        <>
          {" "}
          <span className={`${manual.select__text} ${manual.text}`}>
            Selectページの全体画像になります。
          </span>
          <span className={`${manual.imgBox} ${manual.select__imgBox}`}>
            <Link href={"/images/png/select-img1.png"} passHref>
              <Image
                src="/images/png/select-img1.png"
                width={600}
                height={96}
                priority
                alt="セレクトページのイメージ画像"
              />
            </Link>
          </span>
        </>
      ),
    },
  ];

  return (
    <div className={manual.select__container}>
      <section className={manual.section}>
        <h2 className={manual.subTitle}>
          <span className={manual.fontYellow}>Select</span>
        </h2>
        <div className={`${manual.imgBox} ${manual.select__imgBox}`}>
          <Link href={"/images/png/select-img2.png"} passHref>
            <Image
              src="/images/png/select-img2.png"
              width={600}
              height={96}
              priority
              alt="セレクトページのイメージ画像"
            />
          </Link>
        </div>
        <div className={`${manual.select__listBox} ${manual.listBox}`}>
          <dl className={`${manual.select__list} ${manual.list}`}>
            {items.map((item, index) => (
              <SelectItem key={index} {...item} />
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
