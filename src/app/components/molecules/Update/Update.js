"use client";
import styles from "../../../styles/Contents.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Today } from "../../items/today";
import { HomeBtn } from "@/app/components/buttons/HomeBtn";
import { CreateBtn } from "@/app/components/buttons/CreateBtn";
import Image from "next/image";
import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode";
export function Update(data) {
  const singleData = data.data;
  const router = useRouter();
  dotenv.config();
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
  const [isUser, setIsUser] = useState("");
  const [error, setError] = useState("");
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
  }, []);

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
    groupname: singleData.groupname,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // フォームの入力値をサーバーに送信する

    try {
      // バリデーション

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/pages/api/update/${singleData._id}`,
        {
          method: "PUT",
          cache: "no-store",
          body: JsonBody,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );

      const jsonData = await res.json();
      router.refresh({ shallow: true });
      alert(jsonData.message);
      return router.replace(`/pages/select/${isUser}?user=`);
    } catch (error) {
      return alert("アイテム編集失敗");
    }
  }

  function defectsAnswer() {
    const answer = Number(point * score * 4);
    return setDefects(answer);
  }

  return (
    <>
      <h1 className={styles.contents_title}>UP DATE</h1>
      <div className={styles.edit_contents}>
        <form onSubmit={handleSubmit}>
          <div className={styles.edit_wrap}>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>Date</label>
              </div>
              <div className={styles.edit_contents_data}>{date}</div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="group-name">Group</label>
              </div>
              <div className={styles.edit_contents_data}>
                {singleData.groupname}
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="username">User</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="coffee">Beans</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="roast">Roast</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>Aroma</label>
              </div>
              <div className={styles.edit_contents_data}>
                <div border="0" className={styles.edit_contents_aroma}>
                  <div className={styles.edit_contents_aroma_row}>
                    <div
                      className={styles.edit_contents_aroma_data_header}
                    ></div>
                    <div className={styles.edit_contents_aroma_data_header}>
                      Strong
                    </div>
                    <div className={styles.edit_contents_aroma_data_header}>
                      Quality
                    </div>
                  </div>

                  <div className={styles.edit_contents_aroma_data}>
                    <label>Dry</label>

                    <div className={styles.edit_contents_aroma_data}>
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
                    <div className={styles.edit_contents_aroma_data}>
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

                  <div className={styles.edit_contents_aroma_data}>
                    <label>Crust</label>

                    <div className={styles.edit_contents_aroma_data}>
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
                    <div className={styles.edit_contents_aroma_data}>
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

                  <div className={styles.edit_contents_aroma_data}>
                    <label>Break</label>
                    <div className={styles.edit_contents_aroma_data}>
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
                    <div className={styles.edit_contents_aroma_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="defects">Defects</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="cleancap">CleanCap</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="sweet">Sweet</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="acidity">Acidity</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>AcidityStrength</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="mouthfeel">Mouthfeel</label>
              </div>
              <div className={styles.edit_contents_data}>
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

            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>BodyStrength</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="flavor">Flavor</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="after">After</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="balance">Balance</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="overall">OverAll</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>Result</label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>
                  TOTAL
                  <br />
                  (+36点)
                </label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="impression">Impression</label>
              </div>
              <div className={styles.edit_contents_data}>
                <textarea
                  className={styles.edit_item_message}
                  name="impression"
                  id="impression"
                  value={impression}
                  onChange={(e) => setImpression(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data}>
                <textarea
                  className={styles.edit_item_message}
                  name="memo"
                  id="memo"
                  value={Memo}
                  placeholder="ご自由にご記入ください。"
                  onChange={(e) => setMemo(e.target.value)}
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
