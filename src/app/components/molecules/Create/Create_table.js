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
export function BeansCreateTable(context) {
  dotenv.config();
  useEffect(() => {
    const getUser = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("トークンが見つかりません");
        return null;
      }

      try {
        const decodedToken = jwtDecode(token);
        // デコードされたトークンから必要な情報を取得
        const userData = {
          id: decodedToken.id,
          username: decodedToken.user,
          email: decodedToken.email,
          // その他の必要な情報
        };

        return userData;
      } catch (error) {
        console.error("トークンのデコードに失敗しました:", error);
        return null;
      }
    };
    const UserInformation = getUser();
    setIsUser(UserInformation.id);
    setUserEmail(UserInformation.email);
    setUserName(UserInformation.username);
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

  //   const handlePointBtn = (pointName) => {
  //     setIsPointVisible((prevState) => ({
  //       ...prevState,
  //       [pointName]: !prevState[pointName],
  //     }));
  //   };

  //   const handlePointCoffeeNameBtn = () => handlePointBtn("CoffeeName");
  //   const handlePointRoastBtn = () => handlePointBtn("Roast");
  //   const handlePointAromaBtn = () => handlePointBtn("Aroma");
  //   const handlePointDefectsBtn = () => handlePointBtn("Defects");
  //   const handlePointCleancapBtn = () => handlePointBtn("Cleancap");
  //   const handlePointSweetBtn = () => handlePointBtn("Sweet");
  //   const handlePointAcidityBtn = () => handlePointBtn("Acidity");
  //   const handlePointMouthfeelBtn = () => handlePointBtn("Mouthfeel");
  //   const handlePointFlavorBtn = () => handlePointBtn("Flavor");
  //   const handlePointAfterBtn = () => handlePointBtn("After");
  //   const handlePointBalanceBtn = () => handlePointBtn("Balance");
  //   const handlePointOverallBtn = () => handlePointBtn("Overall");
  //   const handlePointTotalBtn = () => handlePointBtn("Total");
  //   const handlePointImpressionBtn = () => handlePointBtn("Impression");
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

      return router.replace(`/pages/select/${isUser}?user=`);
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
          <div className={styles.edit_table}>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>Date</div>
              <div className={styles.edit_table_data}>{date}</div>
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="group-name">Group</label>
              </div>
              <div className={styles.edit_table_data}>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="username">User</label>
              </div>
              <div className={styles.edit_table_data}>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="coffee">Beans</label>
              </div>
              <div className={styles.edit_table_data}>
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
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="roast">Roast</label>
              </div>
              <div className={styles.edit_table_data}>
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
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label>Aroma</label>
              </div>
              <div className={styles.edit_table_data}>
                <div border="0" className={styles.table_aroma}>
                  <div className={styles.table_aroma_row}>
                    <div className={styles.table_aroma_data_header}></div>
                    <div className={styles.table_aroma_data_header}>Strong</div>
                    <div className={styles.table_aroma_data_header}>
                      Quality
                    </div>
                  </div>

                  <div className={styles.table_aroma_data}>
                    <label>Dry</label>

                    <div className={styles.table_aroma_data}>
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
                    <div className={styles.table_aroma_data}>
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

                  <div className={styles.table_aroma_data}>
                    <label>Crust</label>

                    <div className={styles.table_aroma_data}>
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
                    </div>
                    <div className={styles.table_aroma_data}>
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

                  <div className={styles.table_aroma_data}>
                    <label>Break</label>
                    <div className={styles.table_aroma_data}>
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
                    </div>
                    <div className={styles.table_aroma_data}>
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
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="defects">Defects</label>
              </div>
              <div className={styles.edit_table_data}>
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
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="cleancap">CleanCap</label>
              </div>
              <div className={styles.edit_table_data}>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="sweet">Sweet</label>
              </div>
              <div className={styles.edit_table_data}>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="acidity">Acidity</label>
              </div>
              <div className={styles.edit_table_data}>
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
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label>AcidityStrength</label>
              </div>
              <div className={styles.edit_table_data}>
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
                    <option value={"level:3"}>{"Lv.3：Middle Acidity"}</option>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="mouthfeel">Mouthfeel</label>
              </div>
              <div className={styles.edit_table_data}>
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
            </div>

            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label>BodyStrength</label>
              </div>
              <div className={styles.edit_table_data}>
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
                    <option value={"Level:1"}>{"Lv.1：Very Light Body"}</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="flavor">Flavor</label>
              </div>
              <div className={styles.edit_table_data}>
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
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="after">After</label>
              </div>
              <div className={styles.edit_table_data}>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="balance">Balance</label>
              </div>
              <div className={styles.edit_table_data}>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label htmlFor="overall">OverAll</label>
              </div>
              <div className={styles.edit_table_data}>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label>Result</label>
              </div>
              <div className={styles.edit_table_data}>
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
              </div>
            </div>
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>
                <label>
                  TOTAL
                  <br />
                  (+36点)
                </label>
              </div>
              <div className={styles.edit_table_data}>
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
            <div className={styles.edit_table_row}>
              <div className={styles.edit_table_data_header}>Impression</div>
              <div className={styles.edit_table_data}>
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
