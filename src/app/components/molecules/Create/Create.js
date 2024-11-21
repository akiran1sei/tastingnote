"use client";

import styles from "@/app/styles/Contents.module.css";
import React, { useState, useEffect } from "react";
import { Today } from "../../items/today";
import { useRouter } from "next/navigation";
import { HomeBtn } from "@/app/components/buttons/HomeBtn";
import { CreateBtn } from "@/app/components/buttons/CreateBtn";
import dotenv from "dotenv";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
export function BeansCreate(context) {
  dotenv.config();
  useEffect(() => {
    const getUser = () => {
      const token = localStorage.getItem("token");

      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          // デコードされたトークンから必要な情報を取得
          const userData = {
            id: decodedToken.id,
            username: decodedToken.user,
            email: decodedToken.email,
            // その他の必要な情報
          };
          setIsUser(userData.id);
          setUserEmail(userData.email);
          setUserName(userData.username);
        } else {
          console.log("トークンが見つかりません");
          return null;
        }
      } catch (error) {
        console.error("トークンのデコードに失敗しました:", error);
        return null;
      }
    };
    getUser();
  }, []);

  const [userEmail, setUserEmail] = useState();
  const [username, setUserName] = useState("");
  const [coffee, setCoffee] = useState("");
  const [roast, setRoast] = useState("50");
  const [roastDegree, setRoastDegree] = useState();
  const [roastMessage, setRoastMessage] = useState("");
  const [aromaDryStrength, setAromaDryStrength] = useState("");
  const [aromaCrustStrength, setAromaCrustStrength] = useState("");
  const [aromaBreakStrength, setAromaBreakStrength] = useState("");
  const [aromaDryQuality, setAromaDryQuality] = useState("");
  const [aromaCrustQuality, setAromaCrustQuality] = useState("");
  const [aromaBreakQuality, setAromaBreakQuality] = useState("");
  const [aromaMessage, setAromaMessage] = useState("");
  const [defects, setDefects] = useState("0");
  const [point, setPoint] = useState("0");
  const [score, setScore] = useState("0");
  const [defectsMessage, setDefectsMessage] = useState("");
  const [cleancap, setCleancap] = useState("");
  const [cleancapMessage, setCleancapMessage] = useState("");
  const [sweet, setSweet] = useState("");
  const [sweetMessage, setSweetMessage] = useState("");
  const [acidity, setAcidity] = useState("");
  const [acidityMessage, setAcidityMessage] = useState("");
  const [acidityStrength, setAcidityStrength] = useState("");
  const [mouthfeel, setMouthfeel] = useState("");
  const [mouthfeelMessage, setMouthfeelMessage] = useState("");
  const [bodyStrength, setBodyStrength] = useState("");
  const [flavor, setFlavor] = useState("");
  const [flavorMessage, setFlavorMessage] = useState("");
  const [after, setAfter] = useState("");
  const [afterMessage, setAfterMessage] = useState("");
  const [balance, setBalance] = useState("");
  const [balanceMessage, setBalanceMessage] = useState("");
  const [overall, setOverall] = useState("");
  const [error, setError] = useState("");
  const [impression, setImpression] = useState("");
  const [date, setDate] = useState(Today);
  const [groupName, setGroupName] = useState("");
  const [isUser, setIsUser] = useState("");
  const [isPointVisible, setIsPointVisible] = useState({
    CoffeeName: false,
    Roast: false,
    Aroma: false,
    Defects: false,
    Cleancap: false,
    Sweet: false,
    Acidity: false,
    Mouthfeel: false,
    Flavor: false,
    After: false,
    Total: false,
    Balance: false,
    Overall: false,
    Impression: false,
  });

  const handlePointBtn = (pointName) => {
    setIsPointVisible((prevState) => ({
      ...prevState,
      [pointName]: !prevState[pointName],
    }));
  };

  const handlePointCoffeeNameBtn = () => handlePointBtn("CoffeeName");
  const handlePointRoastBtn = () => handlePointBtn("Roast");
  const handlePointAromaBtn = () => handlePointBtn("Aroma");
  const handlePointDefectsBtn = () => handlePointBtn("Defects");
  const handlePointCleancapBtn = () => handlePointBtn("Cleancap");
  const handlePointSweetBtn = () => handlePointBtn("Sweet");
  const handlePointAcidityBtn = () => handlePointBtn("Acidity");
  const handlePointMouthfeelBtn = () => handlePointBtn("Mouthfeel");
  const handlePointFlavorBtn = () => handlePointBtn("Flavor");
  const handlePointAfterBtn = () => handlePointBtn("After");
  const handlePointBalanceBtn = () => handlePointBtn("Balance");
  const handlePointOverallBtn = () => handlePointBtn("Overall");
  const handlePointTotalBtn = () => handlePointBtn("Total");
  const handlePointImpressionBtn = () => handlePointBtn("Impression");
  const router = useRouter();

  const data = context.data.groups;
  const options = [];
  data.forEach((name) => {
    options.push(
      <option key={name._id} value={name.groupname}>
        {name.groupname}
      </option>
    );
  });
  function RoastArticle() {
    const NumberRoast = Number(roast);
    if (NumberRoast >= 0 && NumberRoast <= 15) {
      return "light";
    } else if (NumberRoast > 15 && NumberRoast <= 30) {
      return "cinnamon";
    } else if (NumberRoast > 30 && NumberRoast <= 45) {
      return "medium";
    } else if (NumberRoast > 45 && NumberRoast <= 60) {
      return "hight";
    } else if (NumberRoast > 60 && NumberRoast <= 75) {
      return "city";
    } else if (NumberRoast > 75 && NumberRoast <= 90) {
      return "full city";
    } else if (NumberRoast > 90 && NumberRoast < 100) {
      return "french";
    } else if (NumberRoast === 100) {
      return "italian";
    }
  }

  const RoastSelect = RoastArticle();
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    try {
      const response = // フォームの入力値をサーバーに送信する
        await fetch(`${process.env.NEXT_PUBLIC_URL}/pages/api/create`, {
          // cache: "no-store",
          method: "POST",
          body: JSON.stringify({
            coffee: coffee,
            roast: roast,
            roastDegree: roastDegree,
            roastMessage: roastMessage,
            aromaDryStrength: aromaDryStrength,
            aromaCrustStrength: aromaCrustStrength,
            aromaBreakStrength: aromaBreakStrength,
            aromaDryQuality: aromaDryQuality,
            aromaCrustQuality: aromaCrustQuality,
            aromaBreakQuality: aromaBreakQuality,
            aromaMessage: aromaMessage,
            defects: point * score * 4,
            defectsMessage: defectsMessage,
            cleancap: cleancap,
            cleancapMessage: cleancapMessage,
            sweet: sweet,
            sweetMessage: sweetMessage,
            acidity: acidity,
            acidityMessage: acidityMessage,
            acidityStrength: acidityStrength,
            mouthfeel: mouthfeel,
            mouthfeelMessage: mouthfeelMessage,
            bodyStrength: bodyStrength,
            flavor: flavor,
            flavorMessage: flavorMessage,
            after: after,
            afterMessage: afterMessage,
            balance: balance,
            balanceMessage: balanceMessage,
            overall: overall,
            total: Number(sum) + Number(36),
            result: sum,
            impression: impression,
            username: username,
            date: date,
            groupname: groupName,
            userEmail: userEmail,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        });

      const jsonData = await response.json();
      alert(jsonData.message);

      return router.replace(`/pages/select/${isUser}`);
    } catch (error) {
      return alert("アイテム作成失敗");
    }
  };
  function defectsAnswer() {
    const answer = Number(point * score * 4);
    setDefects(answer);
  }

  return (
    <>
      <h1 className={styles.contents_title}>CREATE</h1>
      <div className={styles.edit_contents}>
        <form onSubmit={handleSubmit}>
          <div className={styles.edit_list_header}>
            <div className={styles.edit_item_value_box}>
              <span className={styles.edit_date}>{date}</span>
            </div>
            <div className={styles.edit_item_value_box}>
              <label htmlFor="group-name" className={styles.edit_item_title}>
                Group
              </label>
              <select
                name="group-name"
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              >
                <option></option>
                {options}
              </select>
            </div>
          </div>
          <div className={styles.edit_list}>
            {/* 選択式 */}
            <div className={`${styles.edit_item} ${styles.edit_username}`}>
              <label htmlFor="username" className={styles.edit_item_title}>
                user
              </label>
              <div className={styles.edit_item_value_box}>
                <input
                  className={styles.edit_input_name}
                  type="text"
                  name="username"
                  id="username"
                  width={"30"}
                  height={50}
                  placeholder="ユーザーネーム"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_coffee}`}>
              <label htmlFor="coffee" className={styles.edit_item_title}>
                1：beans
                {/* 珈琲豆 or 番号 */}
              </label>
              <div className={styles.edit_item_value_box}>
                <input
                  className={styles.edit_input_name}
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
              <div
                className={
                  isPointVisible["CoffeeName"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointCoffeeNameBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>豆の名前、又は、番号</p>
                </div>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_roast}`}>
              <label htmlFor="roast" className={styles.edit_item_title}>
                2：roast
                {/* ロースト */}
              </label>
              <div className={styles.edit_item_value_box}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  name="roast"
                  id="roast"
                  className={styles.edit_input_roast}
                  value={roast}
                  list="roast_value"
                  onChange={(e) => setRoast(e.target.value)}
                  required
                />
                <datalist id="roast_value">
                  <option value="0">light</option>
                  <option value="15">cinnamon</option>
                  <option value="30">medium</option>
                  <option value="45">hight</option>
                  <option value="60">city</option>
                  <option value="75">full city</option>
                  <option value="90">french</option>
                  <option value="100">italian</option>
                </datalist>
                <p className={styles.edit_roast_value}>
                  <output>
                    <span className={styles.smallFont}>{RoastSelect}</span>
                  </output>
                  <br />
                  {roast}%
                </p>
                <br />
                <label
                  htmlFor="roast-degree"
                  className={styles.edit_item_sub_title}
                >
                  roast level：
                </label>
                <select
                  name="roast-degree"
                  id="roast-degree"
                  value={roastDegree}
                  onChange={(e) => setRoastDegree(e.target.value)}
                  required
                >
                  <option></option>
                  <option value="light">light</option>
                  <option value="cinnamon">cinnamon</option>
                  <option value="medium">medium</option>
                  <option value="hight">hight</option>
                  <option value="city">city</option>
                  <option value="full city">full city</option>
                  <option value="french">french</option>
                  <option value="italian">italian</option>
                </select>
              </div>
              <div
                className={
                  isPointVisible["Roast"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointRoastBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    焙煎具合、パーセンテージによって焙煎度名が変化するので、
                    <wbr />
                    それに合わせて焙煎度の中から選んでください。
                  </p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="roast-message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="roast-message"
                  id="roast-message"
                  placeholder="ご自由にご記入ください。"
                  value={roastMessage}
                  onChange={(e) => setRoastMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_aroma}`}>
              <p className={styles.edit_item_title}>
                3：aroma
                {/* アロマ */}
              </p>
              <div className={styles.edit_item_value_box}>
                －３～３
                <br />
                <div className={styles.edit_item_dry_box}>
                  <div className={styles.edit_item_value_box}>
                    <p className={styles.edit_item_sub_title}>●dry</p>
                    {/* ドライ（強さ） */}
                    <p className={styles.edit_item_value}>
                      <label
                        htmlFor="aroma-dry-strength"
                        className={styles.edit_item_sub_title}
                      >
                        strength
                      </label>
                      <br />
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
                    </p>
                    {/* ドライ （質） */}
                    <p className={styles.edit_item_value}>
                      <label
                        htmlFor="aroma-dry-quality"
                        className={styles.edit_item_sub_title}
                      >
                        quality
                      </label>
                      <br />
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
                    </p>
                  </div>
                </div>
                <div className={styles.edit_item_crust_box}>
                  <div className={styles.edit_item_value_box}>
                    <p className={styles.edit_item_sub_title}>●crust</p>
                    {/* クラスト（強さ） */}
                    <p className={styles.edit_item_value}>
                      <label
                        htmlFor="aroma_crust-strength"
                        className={styles.edit_item_sub_title}
                      >
                        strength
                      </label>
                      <br />
                      <select
                        name="aroma_crust-strength"
                        id="aroma_crust-strength"
                        value={aromaCrustStrength}
                        onChange={(e) => setAromaCrustStrength(e.target.value)}
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
                    </p>
                    {/* クラスト（質） */}
                    <p className={styles.edit_item_value}>
                      <label
                        htmlFor="aroma_crust-quality"
                        className={styles.edit_item_sub_title}
                      >
                        quality
                      </label>
                      <br />
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
                    </p>
                  </div>
                </div>
                <div className={styles.edit_item_break_box}>
                  <div className={styles.edit_item_value_box}>
                    <p className={styles.edit_item_sub_title}>●break</p>
                    {/* ブレーク（強さ） */}
                    <p className={styles.edit_item_value}>
                      <label
                        htmlFor="aroma_break-strength"
                        className={styles.edit_item_sub_title}
                      >
                        strength
                      </label>
                      <br />
                      <select
                        name="aroma_break-strength"
                        id="aroma_break-strength"
                        value={aromaBreakStrength}
                        onChange={(e) => setAromaBreakStrength(e.target.value)}
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
                    </p>
                    {/*  ブレーク（質） */}
                    <p className={styles.edit_item_value}>
                      <label
                        htmlFor="aroma_break-quality"
                        className={styles.edit_item_sub_title}
                      >
                        quality
                      </label>
                      <br />
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
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={
                  isPointVisible["Aroma"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointAromaBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

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
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="aroma_message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="aroma_message"
                  id="aroma_message"
                  placeholder="ご自由にご記入ください。"
                  value={aromaMessage}
                  onChange={(e) => setAromaMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_defects}`}>
              <label htmlFor="defects" className={styles.edit_item_title}>
                4：defects {/*欠点・瑕疵 */}
              </label>
              <div className={styles.edit_item_value_box}>
                <p className={styles.edit_defects_explanation}>
                  欠点等が無き場合は、黄色の枠内を０と記入にしてください。
                  <br />
                  <span>＃×ｉ×４＝【　】</span>
                </p>
                <div className={styles.edit_defects_calc}>
                  <input
                    type="number"
                    className={styles.edit_input_defects}
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                    name="point"
                    required
                  />
                  ×
                  <select
                    type="number"
                    className={styles.edit_defects_score}
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
                    className={styles.edit_defects_answer}
                  >
                    {point * score * 4}
                  </output>
                </div>
                <input
                  type="number"
                  name="defects"
                  id="defects"
                  className={styles.edit_input_answer}
                  value={defects}
                  onChange={(e) => setDefects(e.target.value)}
                  required
                />
              </div>
              <div
                className={
                  isPointVisible["Defects"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointDefectsBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    スペシャルティコーヒーなどは、欠点・瑕疵がないことが多く『０』で進めることが多い
                  </p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="defects-message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="defects-message"
                  id="defects-message"
                  placeholder="ご自由にご記入ください。"
                  value={defectsMessage}
                  onChange={(e) => setDefectsMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_cleancap}`}>
              <label htmlFor="cleancap" className={styles.edit_item_title}>
                5：cleancap
                {/* カップのきれいさ */}
              </label>
              <div className={styles.edit_item_value_box}>
                <div className={styles.edit_item_value}>
                  ０～８
                  <br />
                  <select
                    type="number"
                    name="cleancap"
                    id="cleancap"
                    className={styles.select_box}
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
              </div>
              <div
                className={
                  isPointVisible["Cleancap"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointCleancapBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>味わいの透明度</p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="cleancap-message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="cleancap-message"
                  id="cleancap-message"
                  placeholder="ご自由にご記入ください。"
                  value={cleancapMessage}
                  onChange={(e) => setCleancapMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_sweet}`}>
              <label htmlFor="sweet" className={styles.edit_item_title}>
                6：sweet
                {/* 甘さ */}
              </label>
              <div className={styles.edit_item_value_box}>
                <div className={styles.edit_item_value}>
                  ０～８
                  <br />
                  <select
                    type="number"
                    name="sweet"
                    id="sweet"
                    className={styles.select_box}
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
              </div>
              <div
                className={
                  isPointVisible["Sweet"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointSweetBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    味わいに甘味の印象が強ければ強い程よいとされる
                  </p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="sweet-message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="sweet-message"
                  id="sweet-message"
                  placeholder="ご自由にご記入ください。"
                  value={sweetMessage}
                  onChange={(e) => setSweetMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_acidity}`}>
              <label htmlFor="acidity" className={styles.edit_item_title}>
                7：acidity
                {/* 酸の質 */}
              </label>
              <div className={styles.edit_item_value_box}>
                <div className={styles.edit_item_value}>
                  ０～８
                  <br />
                  <select
                    type="number"
                    name="acidity"
                    id="acidity"
                    className={styles.select_box}
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
                <div className={styles.edit_item_value}>
                  acid strength
                  <br />
                  <select
                    name="acidity"
                    value={acidityStrength}
                    onChange={(e) => setAcidityStrength(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <optgroup label="High">
                      <option value={"Level:5"}>
                        {"Lv.5：Extremely High Acidity"}
                      </option>
                      <option value={"Level:4"}>
                        {"Lv.4：Very High Acidity"}
                      </option>
                    </optgroup>
                    <optgroup label="Middle">
                      <option value={"level:3"}>
                        {"Lv.3：Middle Acidity"}
                      </option>
                    </optgroup>
                    <optgroup label="Low">
                      <option value={"Level:2"}>
                        {"Lv.2：Moderately Low Acidity"}
                      </option>
                      <option value={"Level:1"}>
                        {"Lv.1：Very Low Acidity"}
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div
                className={
                  isPointVisible["Acidity"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointAcidityBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    強い順から
                    <br />
                    Lv.5：Extremely High Acidity
                    <br /> Lv.4：Very High Acidity
                    <br /> Lv.3：Middle Acidity
                    <br />
                    Lv.2：Moderately Low Acidity
                    <br />
                    Lv.1：Very Low Acidity
                    <br />
                    酸の強さを計り、得点部分には質を評価。
                  </p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="acidity-message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="acidity-message"
                  id="acidity-message"
                  placeholder="ご自由にご記入ください。"
                  value={acidityMessage}
                  onChange={(e) => setAcidityMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_mouthfeel}`}>
              <label htmlFor="mouthfeel" className={styles.edit_item_title}>
                8：mouthfeel
                {/* 口に含んだ質感 */}
              </label>
              <div className={styles.edit_item_value_box}>
                <div className={styles.edit_item_value}>
                  ０～８
                  <br />
                  <select
                    type="number"
                    name="mouthfeel"
                    id="mouthfeel"
                    className={styles.select_box}
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
                <div className={styles.edit_item_value}>
                  body strength
                  <br />
                  <select
                    name="body"
                    value={bodyStrength}
                    onChange={(e) => setBodyStrength(e.target.value)}
                    required
                  >
                    <option defaultValue={null}>{null}</option>
                    <optgroup label="High">
                      <option value={"Level:5"}>{"Lv.5：Heavy Body"}</option>
                      <option value={"Level:4"}>{"Lv.4：Full Body"}</option>
                    </optgroup>
                    <optgroup label="Middle">
                      <option value={"level:3"}>{"Lv.3：Medium Body"}</option>
                    </optgroup>
                    <optgroup label="Low">
                      <option value={"Level:2"}>{"Lv.2：Light Body"}</option>
                      <option value={"Level:1"}>
                        {"Lv.1：Very Light Body"}
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div
                className={
                  isPointVisible["Mouthfeel"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointMouthfeelBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    舌触りの滑らかさ、強い順から
                    <br />
                    Lv.5：Heavy Body <br />
                    Lv.4：Full Body <br />
                    Lv.3：Medium Body <br />
                    Lv.2：Light Body <br />
                    Lv.1：Very Light Body
                  </p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="mouthfeel-message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="mouthfeel-message"
                  id="mouthfeel-message"
                  placeholder="ご自由にご記入ください。"
                  value={mouthfeelMessage}
                  onChange={(e) => setMouthfeelMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_flavor}`}>
              <label htmlFor="flavor" className={styles.edit_item_title}>
                9：flavor
                {/* フレーバー */}
              </label>
              <div className={styles.edit_item_value_box}>
                <div className={styles.edit_item_value}>
                  ０～８
                  <br />
                  <select
                    name="flavor"
                    type="number"
                    id="flavor"
                    className={styles.select_box}
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
                <div
                  className={
                    isPointVisible["Flavor"]
                      ? `${styles["edit_point"]} ${styles["active"]}`
                      : styles["edit_point"]
                  }
                >
                  <button
                    type="button"
                    className={styles.edit_point_btn}
                    onClick={handlePointFlavorBtn}
                  >
                    <Image
                      src="/images/exclamation_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </button>

                  <div className={styles.edit_point_memo}>
                    <p className={styles.edit_point_text}>風味の質を評価する</p>
                  </div>
                </div>
                <div className={styles.edit_item_messageBox}>
                  <label htmlFor="flavor-message">memo</label>
                  <br />
                  <textarea
                    className={styles.edit_item_message}
                    name="flavor-message"
                    id="flavor-message"
                    placeholder="ご自由にご記入ください。"
                    value={flavorMessage}
                    onChange={(e) => setFlavorMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={`${styles.edit_item} ${styles.edit_after}`}>
              <label htmlFor="after" className={styles.edit_item_title}>
                10：after
                {/* 後味の印象度 */}
              </label>
              <div className={styles.edit_item_value_box}>
                <div className={styles.edit_item_value}>
                  ０～８
                  <br />
                  <select
                    name="after"
                    type="number"
                    id="after"
                    className={styles.select_box}
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
              </div>
              <div
                className={
                  isPointVisible["After"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointAfterBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    後味は心地よいか、そうでないか評価。
                  </p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="after-message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="after-message"
                  id="after-message"
                  placeholder="ご自由にご記入ください。"
                  value={afterMessage}
                  onChange={(e) => setAfterMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_balance}`}>
              <label htmlFor="balance" className={styles.edit_item_title}>
                11：balance
                {/* バランス */}
              </label>
              <div className={styles.edit_item_value_box}>
                <div className={styles.edit_item_value}>
                  ０～８
                  <br />
                  <select
                    name="balance"
                    type="number"
                    id="balance"
                    className={styles.select_box}
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
              </div>
              <div
                className={
                  isPointVisible["Balance"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointBalanceBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    「５～１０」の要素に悪目立ちしているものがなく、
                    <wbr />
                    全体のバランスが良い程加点。
                  </p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                <label htmlFor="balance-message">memo</label>
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="balance-message"
                  id="balance-message"
                  placeholder="ご自由にご記入ください。"
                  value={balanceMessage}
                  onChange={(e) => setBalanceMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_overall}`}>
              <label htmlFor="overall" className={styles.edit_item_title}>
                12：overall
                {/* 総合評価 */}
              </label>
              <div className={styles.edit_item_value_box}>
                <div className={styles.edit_item_value}>
                  ０～８
                  <br />
                  <select
                    name="overall"
                    type="number"
                    id="overall"
                    className={styles.select_box}
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
              </div>
              <div
                className={
                  isPointVisible["Overall"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointOverallBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    味わいの奥行など項目にない点にも着目し、ここまでの評価に囚われず、主観で付ける。
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles.edit_item} ${styles.edit_total}`}>
              <label className={styles.edit_item_title}>13：TOTAL（+36）</label>
              <div className={styles.edit_result}>
                <p>下記の空白に項目４～１２を加算した数字が出力。</p>
                <div className={styles.edit_addition}>
                  <output className={styles.edit_sub_value}>
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
                  <span className={styles.edit_basic}>＋３６</span>
                </div>
              </div>
              <div
                className={
                  isPointVisible["Total"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointTotalBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    「４～１２」の得点に、定数３６点を足した１００点満点で評価。
                  </p>
                </div>
              </div>
              <div className={styles.edit_total_value}>
                <p>TOTAL</p>
                <output className={styles.edit_sub_value}>
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
            </div>
            <div className={`${styles.edit_item} ${styles.edit_impression}`}>
              <label htmlFor="impression" className={styles.edit_item_title}>
                14：Impression
              </label>
              <div
                className={
                  isPointVisible["Impression"]
                    ? `${styles["edit_point"]} ${styles["active"]}`
                    : styles["edit_point"]
                }
              >
                <button
                  type="button"
                  className={styles.edit_point_btn}
                  onClick={handlePointImpressionBtn}
                >
                  <Image
                    src="/images/exclamation_img.svg"
                    alt="エクスクラメーションボタン"
                    width={24}
                    height={24}
                    priority
                  />
                </button>

                <div className={styles.edit_point_memo}>
                  <p className={styles.edit_point_text}>
                    具体的な味の印象を記入。フレーバーの表現もカッピングの重要な目的。
                    <br />
                    冷めていく過程で、味わいがどのように変化したかも都度メモしておくとよい。
                  </p>
                </div>
              </div>
              <div className={styles.edit_item_messageBox}>
                memo
                <br />
                <textarea
                  className={styles.edit_item_message}
                  name="impression"
                  id="impression"
                  value={impression}
                  onChange={(e) => setImpression(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className={styles.edit_btn_box}>
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
