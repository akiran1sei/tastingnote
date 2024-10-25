"use client";

import styles from "@/app/styles/Contents.module.css";
import React, { useState, useEffect } from "react";
import { Today } from "../../items/today";
import { useRouter } from "next/navigation";
import { HomeBtn } from "@/app/components/buttons/HomeBtn";
import { CreateBtn } from "@/app/components/buttons/CreateBtn";
import dotenv from "dotenv";

import { jwtDecode } from "jwt-decode";
import Image from "next/image";

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

  const [aromaDryStrength, setAromaDryStrength] = useState("");
  const [aromaCrustStrength, setAromaCrustStrength] = useState("");
  const [aromaBreakStrength, setAromaBreakStrength] = useState("");
  const [aromaDryQuality, setAromaDryQuality] = useState("");
  const [aromaCrustQuality, setAromaCrustQuality] = useState("");
  const [aromaBreakQuality, setAromaBreakQuality] = useState("");
  const [defects, setDefects] = useState("0");
  const [point, setPoint] = useState("0");
  const [score, setScore] = useState("0");

  const [cleancap, setCleancap] = useState("");
  const [sweet, setSweet] = useState("");
  const [acidity, setAcidity] = useState("");

  const [acidityStrength, setAcidityStrength] = useState("");
  const [mouthfeel, setMouthfeel] = useState("");

  const [bodyStrength, setBodyStrength] = useState("");
  const [flavor, setFlavor] = useState("");

  const [after, setAfter] = useState("");
  const [afterMessage, setAfterMessage] = useState("");
  const [balance, setBalance] = useState("");
  const [Memo, setMemo] = useState("");
  const [overall, setOverall] = useState("");
  const [error, setError] = useState("");
  const [impression, setImpression] = useState("");
  const [date, setDate] = useState(Today);
  const [groupName, setGroupName] = useState("");
  const [isUser, setIsUser] = useState("");

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
            memo: Memo,
            after: after,
            afterMessage: afterMessage,
            balance: balance,
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

      return router.replace(`/pages/select`);
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
          <div className={styles.edit_wrap}>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>
                  <span className={styles.edit_contents_item_number}>1</span>
                  日付
                </label>
              </div>
              <div className={styles.edit_contents_data}>{date}</div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="group-name">
                  <span className={styles.edit_contents_item_number}>2</span>
                  グループ名
                </label>
              </div>
              <div className={styles.edit_contents_data}>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="username">
                  <span className={styles.edit_contents_item_number}>3</span>
                  ユーザー
                </label>
              </div>
              <div className={styles.edit_contents_data}>
                <input
                  className={styles.edit_input_medium}
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
                <label htmlFor="coffee">
                  <span className={styles.edit_contents_item_number}>4</span>
                  コーヒー豆
                </label>
              </div>
              <div className={styles.edit_contents_data}>
                <input
                  className={styles.edit_input_medium}
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>豆の名前、又は、番号</p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="roast">
                  <span className={styles.edit_contents_item_number}>5</span>
                  ロースト
                </label>
              </div>
              <div
                className={`${styles.edit_contents_data} ${styles.edit_contents_roast}`}
              >
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
                  <option value="0">ライト</option>
                  <option value="15">シナモン</option>
                  <option value="30">ミディアム</option>
                  <option value="45">ハイ</option>
                  <option value="60">シティ</option>
                  <option value="75">フルシティ</option>
                  <option value="90">フレンチ</option>
                  <option value="100">イタリアン</option>
                </datalist>
                <p className={styles.edit_output_value}>
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
                  className={styles.edit_select_value}
                  onChange={(e) => setRoastDegree(e.target.value)}
                  required
                >
                  <option></option>
                  <option value="ライト">ライト</option>
                  <option value="シナモン">シナモン</option>
                  <option value="ミディアム">ミディアム</option>
                  <option value="ハイ">ハイ</option>
                  <option value="シティ">シティ</option>
                  <option value="フルシティ">フルシティ</option>
                  <option value="フレンチ">フレンチ</option>
                  <option value="イタリアン">イタリアン</option>
                </select>
              </div>
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  焙煎具合、パーセンテージによって焙煎度名が変化するので、
                  <wbr />
                  それに合わせて焙煎度の中から選んでください。なお、パーセンテージは目安になっています。
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>
                  <span className={styles.edit_contents_item_number}>6</span>
                  アロマ
                </label>
              </div>
              <div className={styles.edit_contents_data}>
                <div border="0" className={styles.edit_contents_aroma}>
                  <div className={styles.edit_contents_aroma_row}>
                    <div
                      className={styles.edit_contents_aroma_data_header}
                    ></div>
                    <div className={styles.edit_contents_aroma_data_header}>
                      強さ
                    </div>
                    <div className={styles.edit_contents_aroma_data_header}>
                      質
                    </div>
                  </div>

                  <div className={styles.edit_contents_aroma_data}>
                    <label>ドライ</label>

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
                    <label>クラスト</label>

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
                    <label>ブレーク</label>
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="defects">
                  <span className={styles.edit_contents_item_number}>7</span>
                  欠点・瑕疵
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
              </div>
              <div className={styles.edit_contents_data}>
                <div className={styles.edit_defects_calc}>
                  <input
                    type="number"
                    className={styles.edit_input_small}
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
                  className={styles.edit_input_small}
                  value={defects}
                  onChange={(e) => setDefects(e.target.value)}
                  required
                />
              </div>
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  スペシャルティコーヒーなどは、欠点・瑕疵がないことが多く『０』で進めることが多い
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="cleancap">
                  <span className={styles.edit_contents_item_number}>8</span>
                  カップの綺麗さ
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>味わいの透明度</p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="sweet">
                  <span className={styles.edit_contents_item_number}>9</span>
                  甘さ
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  味わいに甘味の印象が強ければ強い程よいとされる
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="acidity">
                  <span className={styles.edit_contents_item_number}>10</span>
                  酸の質
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
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
                <label>
                  <span className={styles.edit_contents_item_number}>10-1</span>
                  酸の強さ
                </label>
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
                    <option value={"High２"}>{"High２"}</option>
                    <option value={"High１"}>{"High１"}</option>
                  </optgroup>
                  <optgroup label="Middle">
                    <option value={"Middle"}>{"Middle"}</option>
                  </optgroup>
                  <optgroup label="Light">
                    <option value={"Light2"}>{"Light2"}</option>
                    <option value={"Light1"}>{"Light1"}</option>
                  </optgroup>
                </select>
              </div>
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  強い順から、
                  <br />
                  High2→High1→Middle
                  <br />
                  →Light2→Light1、
                  <br />
                  酸の強さを計る
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="mouthfeel">
                  <span className={styles.edit_contents_item_number}>11</span>
                  口に含んだ質感
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
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
                <label>
                  <span className={styles.edit_contents_item_number}>11-1</span>
                  ボディの強さ
                </label>
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
                    <option value={"High２"}>{"High２"}</option>
                    <option value={"High１"}>{"High１"}</option>
                  </optgroup>
                  <optgroup label="Middle">
                    <option value={"Middle"}>{"Middle"}</option>
                  </optgroup>
                  <optgroup label="Light">
                    <option value={"Light2"}>{"Light2"}</option>
                    <option value={"Light1"}>{"Light1"}</option>
                  </optgroup>
                </select>
              </div>

              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  舌触りの滑らかさ強い順から,
                  <br />
                  High2→High1→Middle
                  <br />
                  →Light2→Light1である。
                </p>
              </div>
            </div>

            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="flavor">
                  <span className={styles.edit_contents_item_number}>12</span>
                  フレーバー
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>風味の質を評価する</p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="after">
                  <span className={styles.edit_contents_item_number}>13</span>
                  後味の印象度
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  後味は心地よいか、そうでないか評価。
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="balance">
                  <span className={styles.edit_contents_item_number}>14</span>
                  ハーモニーの均衝性
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  「7～13」の要素に悪目立ちしているものがなく、
                  <wbr />
                  全体のバランスが良い程加点。
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="overall">
                  <span className={styles.edit_contents_item_number}>15</span>
                  総合評価
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
                      alt="エクスクラメーションボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </span>
                </label>
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  味わいの奥行など項目にない点にも着目し、ここまでの評価に囚われず、主観で付ける。
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>
                  <span className={styles.edit_contents_item_number}>16</span>
                  小計
                </label>
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  <span className={styles.edit_contents_item_mark}>
                    <Image
                      src="/images/priority_high_img.svg"
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
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label>
                  <span className={styles.edit_contents_item_number}>17</span>
                  TOTAL (+36点)
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  小計項目の得点に定数３６点を足して出た数字。
                  <br />
                  １００点満点で評価。
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="impression">
                  <span className={styles.edit_contents_item_number}>18</span>
                  味の印象度
                </label>
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
              <div className={styles.edit_point_memo}>
                <p className={styles.edit_point_text}>
                  具体的な味の印象を記入。フレーバーの表現もカッピングの重要な目的。
                  <br />
                  冷めていく過程で、味わいがどのように変化したかも都度メモしておくとよい。
                </p>
              </div>
            </div>
            <div className={styles.edit_contents_item}>
              <div className={styles.edit_contents_data_header}>
                <label htmlFor="memo">
                  <span className={styles.edit_contents_item_number}>19</span>
                  memo
                </label>
              </div>
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
          </div>
        </form>
      </div>
    </>
  );
}
