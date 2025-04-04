"use client";
import styles from "@/app/styles/Pages.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HomeBtn } from "@/app/components/buttons/HomeBtn";
import { CreateBtn } from "@/app/components/buttons/CreateBtn";
import useReadGroups from "@/app/utils/useReadGroups";
import { maskEmail } from "@/app/components/items/concealEmail";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";
export function UpdateComponent(context) {
  const singleData = context.item;
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserEmail, setIsUserEmail] = useState("");
  const [coffee, setCoffee] = useState(singleData.coffee);
  const [roast, setRoast] = useState(singleData.roast);
  const [roastDegree, setRoastDegree] = useState(singleData.roastDegree);
  const [username, setUserName] = useState(singleData.username);
  const [aromaDryStrength, setAromaDryStrength] = useState(
    singleData.aromaDryStrength
  );
  const [aromaCrustStrength, setAromaCrustStrength] = useState(
    singleData.aromaCrustStrength
  );
  const [aromaBreakStrength, setAromaBreakStrength] = useState(
    singleData.aromaBreakStrength
  );
  const [aromaDryQuality, setAromaDryQuality] = useState(
    singleData.aromaDryQuality
  );
  const [aromaCrustQuality, setAromaCrustQuality] = useState(
    singleData.aromaCrustQuality
  );
  const [aromaBreakQuality, setAromaBreakQuality] = useState(
    singleData.aromaBreakQuality
  );
  const [defects, setDefects] = useState(singleData.defects);
  const [point, setPoint] = useState("0");
  const [score, setScore] = useState("0");
  const [cleancap, setCleancap] = useState(singleData.cleancap);
  const [sweet, setSweet] = useState(singleData.sweet);
  const [acidity, setAcidity] = useState(singleData.acidity);
  const [acidityStrength, setAcidityStrength] = useState(
    singleData.acidityStrength
  );
  const [mouthfeel, setMouthfeel] = useState(singleData.mouthfeel);
  const [bodyStrength, setBodyStrength] = useState(singleData.bodyStrength);
  const [flavor, setFlavor] = useState(singleData.flavor);
  const [after, setAfter] = useState(singleData.after);
  const [balance, setBalance] = useState(singleData.balance);
  const [Memo, setMemo] = useState(singleData.memo);
  const [overall, setOverall] = useState(singleData.overall);
  const [impression, setImpression] = useState(singleData.impression);
  const [date, setDate] = useState(singleData.date);
  const [groupName, setGroupName] = useState(singleData.groupname);
  const [error, setError] = useState("");
  const ReadGroups = useReadGroups();
  const GroupsData = [...ReadGroups];

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

  const options = GroupsData.filter((e) => e.email.includes(isUserEmail)).map(
    (e) => (
      <option key={e._id} value={e.groupname}>
        {e.groupname}
      </option>
    )
  );
  function RoastArticle() {
    const NumberRoast = Number(roast);
    if (NumberRoast >= 0 && NumberRoast <= 15) {
      return "Light roast(ライト ロースト）";
    } else if (NumberRoast > 15 && NumberRoast <= 30) {
      return "Cinnamon roast（シナモン）";
    } else if (NumberRoast > 30 && NumberRoast <= 45) {
      return "Medium roast（ミディアム）";
    } else if (NumberRoast > 45 && NumberRoast <= 60) {
      return "High roast（ハイ）";
    } else if (NumberRoast > 60 && NumberRoast <= 75) {
      return "City roast（シティ）";
    } else if (NumberRoast > 75 && NumberRoast <= 90) {
      return "Full city roast（フルシティ）";
    } else if (NumberRoast > 90 && NumberRoast < 100) {
      return "French roast（フレンチ）";
    } else if (NumberRoast === 100) {
      return "Italian roast（イタリアン）";
    }
  }

  const RoastSelect = RoastArticle();
  const sum =
    Number(cleancap) +
    Number(sweet) +
    Number(acidity) +
    Number(mouthfeel) +
    Number(flavor) +
    Number(after) +
    Number(balance) +
    Number(overall) -
    Number(defects);

  const JsonBody = JSON.stringify({
    id: singleData._id,
    coffee: coffee,
    roast: roast,
    roastDegree: roastDegree,
    aromaDryStrength: aromaDryStrength,
    aromaCrustStrength: aromaCrustStrength,
    aromaBreakStrength: aromaBreakStrength,
    aromaDryQuality: aromaDryQuality,
    aromaCrustQuality: aromaCrustQuality,
    aromaBreakQuality: aromaBreakQuality,
    defects: point * score * 4,

    cleancap: cleancap,

    sweet: sweet,

    acidity: acidity,

    acidityStrength: acidityStrength,
    mouthfeel: mouthfeel,

    bodyStrength: bodyStrength,
    flavor: flavor,

    after: after,
    balance: balance,
    memo: Memo,
    overall: overall,
    total: Number(sum) + Number(36),
    result: sum,
    impression: impression,
    username: singleData.username,
    date: date,
    groupname: groupName,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // フォームの入力値をサーバーに送信する

    try {
      // バリデーション

      const res = await fetch(`/api/update/${singleData._id}`, {
        method: "PUT",
        cache: "no-store",
        body: JsonBody,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });

      const jsonData = await res.json();
      router.refresh({ shallow: true });
      alert(jsonData.message);
      return router.replace(`/pages/select`);
    } catch (error) {
      return alert("アイテム編集失敗");
    }
  }

  function defectsAnswer() {
    const answer = Number(point * score * 4);
    return setDefects(answer);
  }
  useEffect(() => {
    const RoastData = () => {
      setRoastDegree(RoastSelect);
    };
    return RoastData();
  }, [RoastSelect]);
  const concealName = maskEmail(username);
  if (isLoading) {
    return <LoadingSkeleton />;
  } else if (status === "unauthenticated") {
    return <Uncertified />;
  } else {
    return (
      <>
        <h1 className={styles.contents__title}>UP DATE</h1>
        <div className={styles.edit__contents}>
          <form onSubmit={handleSubmit}>
            <div className={styles.edit__wrap}>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label>
                    <span className={styles.edit__item__number}>1</span>
                    日付
                  </label>
                </div>
                <div className={styles.edit__data}>{date}</div>
              </div>

              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="group-name">
                    <span className={styles.edit__item__number}>2</span>
                    Group Name
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    name="group-name"
                    id="group-name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                  >
                    <option> {groupName}</option>
                    {options}
                  </select>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="username">
                    <span className={styles.edit__item__number}>3</span>
                    User
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <input
                    className={styles.edit__input__medium}
                    type="text"
                    name="username"
                    id="username"
                    width={"30"}
                    height={50}
                    placeholder="ユーザーネーム"
                    value={concealName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="coffee">
                    <span className={styles.edit__item__number}>4</span>
                    Coffee
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <input
                    className={styles.edit__input__medium}
                    type="text"
                    name="coffee"
                    id="coffee"
                    width={30}
                    height={50}
                    placeholder="名前 or 番号"
                    value={coffee}
                    onChange={(e) => setCoffee(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.edit__point__memo}>
                  <p className={styles.edit__point__text}>
                    豆の名前、又は、番号
                  </p>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="roast">
                    <span className={styles.edit__item__number}>5</span>
                    Roast
                  </label>
                </div>
                <div className={`${styles.edit__data} ${styles.edit__roast}`}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    name="roast"
                    id="roast"
                    className={styles.edit__input__roast}
                    value={roast}
                    list="roast_value"
                    onChange={(e) => setRoast(e.target.value)}
                    required
                  />
                  <div className={styles.ticks}>
                    <div className={styles.tick}></div>
                    <div className={styles.tick}></div>
                    <div className={styles.tick}></div>
                    <div className={styles.tick}></div>
                    <div className={styles.tick}></div>
                    <div className={styles.tick}></div>
                    <div className={styles.tick}></div>
                    <div className={styles.tick}></div>
                  </div>
                  <datalist id="roast_value">
                    <option value="0">Light</option>
                    <option value="15">Cinnamon</option>
                    <option value="30">Medium</option>
                    <option value="45">High</option>
                    <option value="60">City</option>
                    <option value="75">Full City</option>
                    <option value="90">French</option>
                    <option value="100">Italian</option>
                  </datalist>
                  <p className={styles.edit__output__value}>
                    <output>
                      <span className={styles.small__font}>{RoastSelect}</span>
                    </output>
                    <br />
                    <input
                      type="number"
                      className={styles.edit__input__roast__number}
                      value={roast}
                      onChange={(e) => setRoast(e.target.value)}
                      name="roastNumber"
                      required
                    />
                    %
                  </p>
                </div>
                <div className={styles.edit__point__memo}>
                  <p className={styles.edit__point__text}>
                    焙煎具合、パーセンテージによって焙煎度名が変化するので、
                    <wbr />
                    それに合わせて焙煎度の中から選んでください。なお、パーセンテージは目安になっています。
                  </p>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label>
                    <span className={styles.edit__item__number}>6</span>
                    Aroma
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <div border="0" className={styles.edit__aroma}>
                    <div className={styles.edit__aroma__row}>
                      <div className={styles.edit__aroma__data__header}></div>
                      <div className={styles.edit__aroma__data__header}>
                        Strength
                      </div>
                      <div className={styles.edit__aroma__data__header}>
                        Quality
                      </div>
                    </div>

                    <div className={styles.edit__aroma__data}>
                      <label>Dry</label>

                      <div className={styles.edit__aroma__data}>
                        <select
                          name="aroma-dry-strength"
                          id="aroma-dry-strength"
                          value={aromaDryStrength}
                          onChange={(e) => setAromaDryStrength(e.target.value)}
                          required
                        >
                          <option></option>
                          <option value={-3}>-3</option>
                          <option value={-2}>-2</option>
                          <option value={-1}>-1</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                      <div className={styles.edit__aroma__data}>
                        <select
                          name="aroma-dry-quality"
                          id="aroma-dry-quality"
                          value={aromaDryQuality}
                          onChange={(e) => setAromaDryQuality(e.target.value)}
                          required
                        >
                          <option></option>
                          <option value={-3}>-3</option>
                          <option value={-2}>-2</option>
                          <option value={-1}>-1</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.edit__aroma__data}>
                      <label>Crust</label>

                      <div className={styles.edit__aroma__data}>
                        <select
                          name="aroma_crust-strength"
                          id="aroma_crust-strength"
                          value={aromaCrustStrength}
                          onChange={(e) =>
                            setAromaCrustStrength(e.target.value)
                          }
                          required
                        >
                          <option></option>
                          <option value={-3}>-3</option>
                          <option value={-2}>-2</option>
                          <option value={-1}>-1</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                      <div className={styles.edit__aroma__data}>
                        <select
                          name="aroma_crust-quality"
                          id="aroma_crust-quality"
                          value={aromaCrustQuality}
                          onChange={(e) => setAromaCrustQuality(e.target.value)}
                          required
                        >
                          <option></option>
                          <option value={-3}>-3</option>
                          <option value={-2}>-2</option>
                          <option value={-1}>-1</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.edit__aroma__data}>
                      <label>Break</label>
                      <div className={styles.edit__aroma__data}>
                        <select
                          name="aroma_break-strength"
                          id="aroma_break-strength"
                          value={aromaBreakStrength}
                          onChange={(e) =>
                            setAromaBreakStrength(e.target.value)
                          }
                          required
                        >
                          <option></option>
                          <option value={-3}>-3</option>
                          <option value={-2}>-2</option>
                          <option value={-1}>-1</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                      <div className={styles.edit__aroma__data}>
                        <select
                          name="aroma_break-quality"
                          id="aroma_break-quality"
                          value={aromaBreakQuality}
                          onChange={(e) => setAromaBreakQuality(e.target.value)}
                          required
                        >
                          <option></option>
                          <option value={-3}>-3</option>
                          <option value={-2}>-2</option>
                          <option value={-1}>-1</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
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
                  <label htmlFor="defects">
                    <span className={styles.edit__item__number}>7</span>
                    Defects
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <div className={styles.edit__defects__calc}>
                    <input
                      type="number"
                      className={styles.edit__input__small}
                      value={point}
                      onChange={(e) => setPoint(e.target.value)}
                      name="point"
                      required
                    />
                    ×
                    <select
                      type="number"
                      className={styles.edit__defects__score}
                      onChange={(e) => setScore(e.target.value)}
                      value={score}
                      name="score"
                      required
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                    ×４＝
                    <output
                      name="defects"
                      onChange={defectsAnswer}
                      className={styles.edit__defects__answer}
                    >
                      {point * score * 4}
                    </output>
                  </div>
                  <input
                    type="number"
                    name="defects"
                    id="defects"
                    className={styles.edit__input__small}
                    value={defects}
                    onChange={(e) => setDefects(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.edit__point__memo}>
                  <p className={styles.edit__point__text}>
                    スペシャルティコーヒーなどは、欠点・瑕疵がないことが多く『０』で進めることが多い
                  </p>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="cleancap">
                    <span className={styles.edit__item__number}>8</span>
                    Clean Cap
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    type="number"
                    name="cleancap"
                    id="cleancap"
                    className={styles.select__box}
                    value={cleancap}
                    onChange={(e) => setCleancap(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={6.5}>6.5</option>
                    <option value={7}>7</option>
                    <option value={7.5}>7.5</option>
                    <option value={8}>8</option>
                  </select>
                </div>
                <div className={styles.edit__point__memo}>
                  <p className={styles.edit__point__text}>味わいの透明度</p>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="sweet">
                    <span className={styles.edit__item__number}>9</span>
                    甘さ
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    type="number"
                    name="sweet"
                    id="sweet"
                    className={styles.select__box}
                    value={sweet}
                    onChange={(e) => setSweet(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={6.5}>6.5</option>
                    <option value={7}>7</option>
                    <option value={7.5}>7.5</option>
                    <option value={8}>8</option>
                  </select>
                </div>
                <div className={styles.edit__point__memo}>
                  <p className={styles.edit__point__text}>
                    味わいに甘味の印象が強ければ強い程よいとされる
                  </p>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="acidity">
                    <span className={styles.edit__item__number}>10</span>
                    Acidity
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    type="number"
                    name="acidity"
                    id="acidity"
                    className={styles.select__box}
                    value={acidity}
                    onChange={(e) => setAcidity(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={6.5}>6.5</option>
                    <option value={7}>7</option>
                    <option value={7.5}>7.5</option>
                    <option value={8}>8</option>
                  </select>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label>
                    <span className={styles.edit__item__number}>10-1</span>
                    Acidity Strength
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    name="acidity"
                    value={acidityStrength}
                    onChange={(e) => setAcidityStrength(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <optgroup label="High">
                      <option value={"H2"}>{"H2"}</option>
                      <option value={"H1"}>{"H1"}</option>
                    </optgroup>
                    <optgroup label="Middle">
                      <option value={"M"}>{"M"}</option>
                    </optgroup>
                    <optgroup label="Light">
                      <option value={"L1"}>{"L1"}</option>
                      <option value={"L2"}>{"L2"}</option>
                    </optgroup>
                  </select>
                </div>
                <div className={styles.edit__point__memo}>
                  <div className={styles.edit__strength}>
                    <div className={styles.edit__strength__img}>
                      <Image
                        src={"/images/png/strength.png"}
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
                  <label htmlFor="mouthfeel">
                    <span className={styles.edit__item__number}>11</span>
                    Mouthfeel
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    type="number"
                    name="mouthfeel"
                    id="mouthfeel"
                    className={styles.select__box}
                    value={mouthfeel}
                    onChange={(e) => setMouthfeel(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={6.5}>6.5</option>
                    <option value={7}>7</option>
                    <option value={7.5}>7.5</option>
                    <option value={8}>8</option>
                  </select>
                </div>
              </div>

              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label>
                    <span className={styles.edit__item__number}>11-1</span>
                    Body Strength
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    name="body"
                    value={bodyStrength}
                    onChange={(e) => setBodyStrength(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <optgroup label="High">
                      <option value={"H2"}>{"H2"}</option>
                      <option value={"H1"}>{"H1"}</option>
                    </optgroup>
                    <optgroup label="Middle">
                      <option value={"M"}>{"M"}</option>
                    </optgroup>
                    <optgroup label="Light">
                      <option value={"L1"}>{"L1"}</option>
                      <option value={"L2"}>{"L2"}</option>
                    </optgroup>
                  </select>
                </div>
                <div className={styles.edit__point__memo}>
                  <div className={styles.edit__strength}>
                    <div className={styles.edit__strength__img}>
                      <Image
                        src={"/images/png/strength.png"}
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
                  <label htmlFor="flavor">
                    <span className={styles.edit__item__number}>12</span>
                    Flavor
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    name="flavor"
                    type="number"
                    id="flavor"
                    className={styles.select__box}
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={6.5}>6.5</option>
                    <option value={7}>7</option>
                    <option value={7.5}>7.5</option>
                    <option value={8}>8</option>
                  </select>
                </div>
                <div className={styles.edit__point__memo}>
                  <p className={styles.edit__point__text}>風味の質を評価する</p>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="after">
                    After
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    name="after"
                    type="number"
                    id="after"
                    className={styles.select__box}
                    value={after}
                    onChange={(e) => setAfter(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={6.5}>6.5</option>
                    <option value={7}>7</option>
                    <option value={7.5}>7.5</option>
                    <option value={8}>8</option>
                  </select>
                </div>
                <div className={styles.edit__point__memo}>
                  <p className={styles.edit__point__text}>
                    後味は心地よいか、そうでないか評価。
                  </p>
                </div>
              </div>
              <div className={styles.edit__item}>
                <div className={styles.edit__data__header}>
                  <label htmlFor="balance">
                    <span className={styles.edit__item__number}>14</span>
                    Balance
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    name="balance"
                    type="number"
                    id="balance"
                    className={styles.select__box}
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={6.5}>6.5</option>
                    <option value={7}>7</option>
                    <option value={7.5}>7.5</option>
                    <option value={8}>8</option>
                  </select>
                </div>
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
                  <label htmlFor="overall">
                    <span className={styles.edit__item__number}>15</span>
                    Overall
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
                        alt="エクスクラメーションボタン"
                        width={24}
                        height={24}
                        priority
                      />
                    </span>
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <select
                    name="overall"
                    type="number"
                    id="overall"
                    className={styles.select__box}
                    value={overall}
                    onChange={(e) => setOverall(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={6.5}>6.5</option>
                    <option value={7}>7</option>
                    <option value={7.5}>7.5</option>
                    <option value={8}>8</option>
                  </select>
                </div>
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
                    Sub Total
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <output className={styles.edit__sub__value}>
                    {-Number(defects) +
                      Number(cleancap) +
                      Number(sweet) +
                      Number(acidity) +
                      Number(mouthfeel) +
                      Number(flavor) +
                      Number(after) +
                      Number(balance) +
                      Number(overall)}
                  </output>
                </div>
                <div className={styles.edit__point__memo}>
                  <p className={styles.edit__point__text}>
                    <span className={styles.edit__item__mark}>
                      <Image
                        src="/images/svg/exclamation_img.svg"
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
                <div className={styles.edit__data}>
                  <output className={styles.edit__sub__value}>
                    {Number(cleancap) +
                      Number(sweet) +
                      Number(acidity) +
                      Number(mouthfeel) +
                      Number(flavor) +
                      Number(after) +
                      Number(balance) +
                      Number(overall) -
                      Number(defects) +
                      Number(36)}
                  </output>
                </div>
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
                  <label htmlFor="impression">
                    <span className={styles.edit__item__number}>18</span>
                    Impression
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <textarea
                    className={styles.edit__item__message}
                    name="impression"
                    id="impression"
                    value={impression}
                    onChange={(e) => setImpression(e.target.value)}
                  ></textarea>
                </div>
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
                  <label htmlFor="memo">
                    <span className={styles.edit__item__number}>19</span>
                    memo
                  </label>
                </div>
                <div className={styles.edit__data}>
                  <textarea
                    className={styles.edit__item__message}
                    name="memo"
                    id="memo"
                    value={Memo}
                    placeholder="ご自由にご記入ください。"
                    onChange={(e) => setMemo(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={styles.edit__btn__box}>
              {error && (
                <span
                  onChange={(e) => setError(e.target.value)}
                  className="edit-error"
                >
                  {error}
                </span>
              )}

              <CreateBtn />

              <HomeBtn />
            </div>
          </form>
        </div>
      </>
    );
  }
}
