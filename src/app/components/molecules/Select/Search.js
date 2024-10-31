"use client";
import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import useReadGroups from "@/app/utils/useReadGroups";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import dotenv from "dotenv";
dotenv.config();
export function Search(context) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  const [checkbox, setCheckBox] = useState([]);
  const router = useRouter();
  const ReadGroups = useReadGroups();
  const [selectedGroup, setSelectedGroup] = useState(""); // 選択された値を保持
  const [defaultValue, setDefaultValue] = useState(context.data[1]);
  const dataId = context.data[0];
  const [isUser, setIsUser] = useState(context.data[0]);

  const [isUserId, setIsUserId] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");
  const [isUserName, setIsUserName] = useState("");
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const getUser = () => {
          const token = localStorage.getItem("token");
          const decodedToken = jwtDecode(token);
          // デコードされたトークンから必要な情報を取得
          const userData = {
            id: decodedToken.id,
            username: decodedToken.user,
            email: decodedToken.email,
            // その他の必要な情報
          };
          setIsLoggedIn(!!token);
          setIsUserId(userData.id);
          setIsUserEmail(userData.email);
          setIsUserName(userData.user);
        };
        return getUser();
      } else {
        console.log("トークンが見つかりません");
        return null;
      }
    } catch (error) {
      console.error("トークンのデコードに失敗しました:", error);
      return null;
    }
  }, []);

  const { data, error } = useSWR(
    `/pages/api/readall/${dataId}/${defaultValue}`,

    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
      refreshInterval: 0,
      dedupingInterval: 0,
    }
  );

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      if (!selectedGroup) {
        return router.push(
          `${process.env.NEXT_PUBLIC_URL}/pages/select/${isUser}`
        );
      }
      // URLを更新
      const newUrl = `${process.env.NEXT_PUBLIC_URL}/pages/select/${isUser}/${selectedGroup}`;

      return router.push(newUrl, undefined, { shallow: true });
    } catch (err) {
      console.error("Error during search:", err);
      return alert("検索に失敗しました");
    }
  };
  if (error) return <div>エラーが発生しました: {error.message}</div>;
  if (!data) return <div>データを取得中...</div>;

  const handleSearchClick = () => {
    // 親コンポーネントにメッセージを送信
    setShowSearchButton(!showSearchButton);
  };
  const handleDeleteClick = () => {
    // 親コンポーネントにメッセージを送信
    setShowDeleteButton(!showDeleteButton);
  };
  async function handleDeleteSubmit(e) {
    e.preventDefault();
    try {
      if (confirm("削除しますか？")) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/pages/api/delete/multiple/${isUserEmail}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
            method: "DELETE",

            body: JSON.stringify([...checkbox]),
          }
        );

        const json = await response.json();
        setShowDeleteButton(false);

        await router.push(`/pages/select/${isUser}?user=`);
        return alert(json.message);
      }
    } catch (err) {
      return alert("アイテム削除失敗/Select");
    }
  }
  return isLoggedIn ? (
    <>
      <header className={styles.select_header}>
        <nav className={styles.select_header_menu}>
          <ul className={styles.select_menu_list}>
            <li className={styles.select_header_menu_item}>
              <button
                type="button"
                className={styles.select_header_menu_btn}
                onClick={handleDeleteClick}
              >
                <Image
                  src="/images/delete_img.svg"
                  alt="削除"
                  width={48}
                  height={48}
                  priority
                />
              </button>
            </li>
            <li className={styles.select_header_menu_item}>
              <button
                type="button"
                className={styles.select_header_menu_btn}
                onClick={handleSearchClick}
              >
                <Image
                  src="/images/search_img.svg"
                  alt="検索ボタン"
                  width={24}
                  height={24}
                  priority
                />
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <h1 className={styles.contents_title}>SELECT</h1>
      <div className={styles.select_header_active_contents}>
        <ul className={styles.select_header_active_menu}>
          {showDeleteButton && (
            <li
              className={styles.select_header_active_menu_item}
              hidden={!showDeleteButton}
            >
              <button
                type="submit"
                onClick={handleDeleteSubmit}
                className={styles.select_delete_btn}
              >
                Delete
              </button>
            </li>
          )}
          {showSearchButton && (
            <li
              className={styles.select_header_active_menu_item}
              hidden={!showSearchButton}
            >
              <div className={styles.searchBarBox}>
                <div className={styles.searchBar}>
                  <label htmlFor="search" className={styles.searchBar_label}>
                    SEARCH
                  </label>
                  <select
                    name="search"
                    id="search"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className={styles.searchBar_select}
                  >
                    <optgroup label="Group">
                      <option value="">All</option>
                      {ReadGroups.map((group) => (
                        <option key={group._id} value={group.groupname}>
                          {group.groupname}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <button
                    type="button"
                    onClick={handleSearch}
                    className={styles.searchBar_button}
                  >
                    <Image
                      src="/images/search_img.svg"
                      alt="検索ボタン"
                      width={24}
                      height={24}
                      priority
                    />
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className={styles.select_list_box}>
        <div className={styles.select_wrap}>
          <ul className={styles.select_header_list}>
            <li
              className={`${styles.select_header_list_item} ${styles.select_index}`}
            >
              <span className={styles.select_title}>No.</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_coffee}`}
            >
              <span className={styles.select_title}>コーヒー豆</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_roast}`}
            >
              <span className={styles.select_title}>ロースト</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_aroma}`}
            >
              <span className={styles.select_title}>アロマ</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_defects}`}
            >
              <span className={styles.select_title}>欠点・瑕疵</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_cleancap}`}
            >
              <span className={styles.select_title}>
                カップの
                <br />
                綺麗さ
              </span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_sweet}`}
            >
              <span className={styles.select_title}>甘さ</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_acidity}`}
            >
              <span className={styles.select_title}>酸の質</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_mouthfeel}`}
            >
              <span className={styles.select_title}>
                口に含んだ
                <br />
                質感
              </span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_flavor}`}
            >
              <span className={styles.select_title}>フレーバー</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_after}`}
            >
              <span className={styles.select_title}>
                後味の
                <br />
                印象度
              </span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_balance}`}
            >
              <span className={styles.select_title}>ハーモニーの均衝性</span>
            </li>

            <li
              className={`${styles.select_header_list_item} ${styles.select_overall}`}
            >
              <span className={styles.select_title}>総合評価</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_total}`}
            >
              <span className={styles.select_title}>
                TOTAL
                <br />
                +36
              </span>
            </li>
          </ul>
          <div className={styles.select_beans_box}>
            {data.allItems.map((beans, index) => (
              <div className={styles.select_beans} key={beans._id}>
                {showDeleteButton ? (
                  <div className={styles.select_delete_list}>
                    <ul
                      className={`${styles.select_list} ${styles.select_checkbox}`}
                    >
                      <li
                        className={`${styles.select_list} ${styles.select_index}`}
                      >
                        {index + 1}
                        <input
                          type="checkbox"
                          className={styles.select_checkbox_input}
                          defaultValue={beans._id}
                          onChange={(e) =>
                            setCheckBox([...checkbox, e.target.value])
                          }
                          required
                        />
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_coffee}`}
                      >
                        <p className={styles.select_value}>
                          {beans.coffee.slice(0, 20)}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_roast}`}
                      >
                        <p className={styles.select_value}>
                          {beans.roastDegree} <br />
                          <output>
                            <input
                              type="range"
                              className={styles.select_input_roast}
                              value={beans.roast}
                              readOnly
                            />
                          </output>
                          <br />
                          {beans.roast}%
                        </p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_aroma}`}
                      >
                        <div className={styles.select_value}>
                          <div className={styles.select_aroma_box}>
                            <div className={styles.select_aroma_header}>
                              <div className={styles.select_aroma_headerTitle}>
                                ドライ
                              </div>
                              <div className={styles.select_aroma_headerTitle}>
                                クラスト
                              </div>
                              <div className={styles.select_aroma_headerTitle}>
                                ブレーク
                              </div>
                            </div>
                            <div className={styles.select_aroma_valueHeader}>
                              <div
                                className={styles.select_aroma_valueHeader_list}
                              ></div>
                              <div
                                className={styles.select_aroma_valueHeader_list}
                              >
                                強さ：
                              </div>
                              <div
                                className={styles.select_aroma_valueHeader_list}
                              >
                                質　：
                              </div>
                            </div>
                            <div
                              className={styles.select_aroma_valueListStrength}
                            >
                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaDryStrength}
                              </div>

                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaCrustStrength}
                              </div>

                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaBreakStrength}
                              </div>
                            </div>
                            <div
                              className={styles.select_aroma_valueListQuality}
                            >
                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaDryQuality}
                              </div>

                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaCrustQuality}
                              </div>

                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaBreakQuality}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_defects}`}
                      >
                        <p className={styles.select_value}>{beans.defects}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_cleancap}`}
                      >
                        <p className={styles.select_value}>{beans.cleancap}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_sweet}`}
                      >
                        <p className={styles.select_value}>{beans.sweet}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_acidity}`}
                      >
                        <p className={styles.select_value}>{beans.acidity}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_mouthfeel}`}
                      >
                        <p className={styles.select_value}>{beans.mouthfeel}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_flavor}`}
                      >
                        <p className={styles.select_value}>{beans.flavor}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_after}`}
                      >
                        <p className={styles.select_value}>{beans.after}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_balance}`}
                      >
                        <p className={styles.select_value}>{beans.balance}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_overall}`}
                      >
                        <p className={styles.select_value}>{beans.overall}</p>
                      </li>

                      <li
                        className={`${styles.select_list} ${styles.select_total}`}
                      >
                        <div className={styles.select_total_wrap}>
                          <p className={styles.select_value}>
                            <span className={styles.select_resultTxt}>
                              {beans.result}
                            </span>
                          </p>
                          <p className={styles.select_total_value} colSpan={2}>
                            <span className={styles.select_totalTxt}>
                              {beans.total}
                            </span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={`/pages/${beans._id}`}
                    scroll={false}
                    className={styles.select_beans_link}
                    passHref
                  >
                    <ul className={styles.select_list}>
                      <li
                        className={`${styles.select_list} ${styles.select_index}`}
                      >
                        {index + 1}
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_coffee}`}
                      >
                        <p className={styles.select_value}>
                          {beans.coffee.slice(0, 20)}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_roast}`}
                      >
                        <p className={styles.select_value}>
                          {beans.roastDegree} <br />
                          <output>
                            <input
                              type="range"
                              className={styles.select_input_roast}
                              value={beans.roast}
                              readOnly
                            />
                          </output>
                          <br />
                          {beans.roast}%
                        </p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_aroma}`}
                      >
                        <div className={styles.select_value}>
                          <div className={styles.select_aroma_box}>
                            <div className={styles.select_aroma_header}>
                              <div className={styles.select_aroma_headerTitle}>
                                ドライ
                              </div>
                              <div className={styles.select_aroma_headerTitle}>
                                クラスト
                              </div>
                              <div className={styles.select_aroma_headerTitle}>
                                ブレーク
                              </div>
                            </div>
                            <div className={styles.select_aroma_valueHeader}>
                              <div
                                className={styles.select_aroma_valueHeader_list}
                              ></div>
                              <div
                                className={styles.select_aroma_valueHeader_list}
                              >
                                強さ：
                              </div>
                              <div
                                className={styles.select_aroma_valueHeader_list}
                              >
                                質　：
                              </div>
                            </div>
                            <div
                              className={styles.select_aroma_valueListStrength}
                            >
                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaDryStrength}
                              </div>

                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaCrustStrength}
                              </div>

                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaBreakStrength}
                              </div>
                            </div>
                            <div
                              className={styles.select_aroma_valueListQuality}
                            >
                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaDryQuality}
                              </div>

                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaCrustQuality}
                              </div>

                              <div className={styles.select_aroma_valueIItem}>
                                {beans.aromaBreakQuality}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_defects}`}
                      >
                        <p className={styles.select_value}>{beans.defects}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_cleancap}`}
                      >
                        <p className={styles.select_value}>{beans.cleancap}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_sweet}`}
                      >
                        <p className={styles.select_value}>{beans.sweet}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_acidity}`}
                      >
                        <p className={styles.select_value}>{beans.acidity}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_mouthfeel}`}
                      >
                        <p className={styles.select_value}>{beans.mouthfeel}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_flavor}`}
                      >
                        <p className={styles.select_value}>{beans.flavor}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_after}`}
                      >
                        <p className={styles.select_value}>{beans.after}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_balance}`}
                      >
                        <p className={styles.select_value}>{beans.balance}</p>
                      </li>
                      <li
                        className={`${styles.select_list} ${styles.select_overall}`}
                      >
                        <p className={styles.select_value}>{beans.overall}</p>
                      </li>

                      <li
                        className={`${styles.select_list} ${styles.select_total}`}
                      >
                        <div className={styles.select_total_wrap}>
                          <p className={styles.select_value}>
                            <span className={styles.select_resultTxt}>
                              {beans.result}
                            </span>
                          </p>
                          <p className={styles.select_total_value} colSpan={2}>
                            <span className={styles.select_totalTxt}>
                              {beans.total}
                            </span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className={styles.sign_off_page}>
      <p className={styles.sign_off_text}>ログインしてください。</p>
    </div>
  );
}
const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};
