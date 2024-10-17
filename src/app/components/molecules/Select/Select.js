"use client";
import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import useReadGroups from "@/app/utils/useReadGroups";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode";
export function Select(context) {
  dotenv.config();
  const limitedData = context.data.allItems;
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState("");
  const [checkbox, setCheckBox] = useState([]);
  const router = useRouter();
  const ReadGroups = useReadGroups();
  const [SearchData, setSearchData] = useState(ReadGroups);
  const [isUser, setIsUser] = useState("");
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
    setIsUserEmail(UserInformation.email);
  }, []);

  const { data, error } = useSWR(`/pages/api/group/chioce`, fetcher, {
    initial: true, // 初回レンダリング時に必ず更新
    onBackgroundUpdate: true, // バックグラウンドで再読み込み
  });
  if (error) return <div>エラーが発生しました: {error.message}</div>;
  if (!data) return <div>データを取得中...</div>;

  const GroupOptions = [];
  data.groups.map((group) => {
    GroupOptions.push(
      <option key={group._id} value={group.groupname}>
        {group.groupname}
      </option>
    );
  });

  const handleSearch = async (value) => {
    return router.replace(
      `${process.env.NEXT_PUBLIC_URL}/pages/select/${isUser}?user=${value}`
    );
  };

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
        await location.reload();
        return alert(json.message);
      }
    } catch (err) {
      return alert("アイテム削除失敗/Select");
    }
  }
  return (
    <>
      <header className={styles.select_header}>
        <nav className={styles.select_header_menu}>
          <ul className={styles.select_menu_list}>
            <li className={styles.select_header_menu_item}>
              <button
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
            <li
              className={styles.select_header_menu_item}
              onClick={handleSearchClick}
            >
              <Image
                src="/images/search_img.svg"
                alt="検索ボタン"
                width={24}
                height={24}
                priority
              />
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
                    value={SearchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    className={styles.searchBar_select}
                  >
                    <optgroup label="Group">
                      <option value={""}>All</option>
                      {GroupOptions}
                    </optgroup>
                  </select>
                  <button
                    onClick={() => handleSearch(SearchData)}
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
              className={`${styles.select_header_list_item} ${styles.select_item_index}`}
            >
              <span className={styles.select_item_title}>No.</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_coffee}`}
            >
              <span className={styles.select_item_title}>コーヒー豆</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_roast}`}
            >
              <span className={styles.select_item_title}>ロースト</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_aroma}`}
            >
              <span className={styles.select_item_title}>アロマ</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_defects}`}
            >
              <span className={styles.select_item_title}>欠点・瑕疵</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_cleancap}`}
            >
              <span className={styles.select_item_title}>
                カップの
                <br />
                綺麗さ
              </span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_sweet}`}
            >
              <span className={styles.select_item_title}>甘さ</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_acidity}`}
            >
              <span className={styles.select_item_title}>酸の質</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_mouthfeel}`}
            >
              <span className={styles.select_item_title}>
                口に含んだ
                <br />
                質感
              </span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_flavor}`}
            >
              <span className={styles.select_item_title}>フレーバー</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_after}`}
            >
              <span className={styles.select_item_title}>
                後味の
                <br />
                印象度
              </span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_balance}`}
            >
              <span className={styles.select_item_title}>
                ハーモニーの均衝性
              </span>
            </li>

            <li
              className={`${styles.select_header_list_item} ${styles.select_item_overall}`}
            >
              <span className={styles.select_item_title}>総合評価</span>
            </li>
            <li
              className={`${styles.select_header_list_item} ${styles.select_item_total}`}
            >
              <span className={styles.select_item_title}>
                TOTAL
                <br />
                +36
              </span>
            </li>
          </ul>
          <div className={styles.select_beans_box}>
            {limitedData.map((beans, index) => (
              <div className={styles.select_beans} key={beans._id}>
                {showDeleteButton ? (
                  <div className={styles.select_delete_list}>
                    <ul
                      className={`${styles.select_list} ${styles.select_checkbox}`}
                    >
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_index}`}
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
                        className={`${styles.select_item_list} ${styles.select_item_coffee}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.coffee.slice(0, 20)}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_roast}`}
                      >
                        <p className={styles.select_item_value}>
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
                        className={`${styles.select_item_list} ${styles.select_item_aroma}`}
                      >
                        <div className={styles.select_item_value}>
                          <table
                            border="0"
                            className={styles.select_item_aroma_table}
                          >
                            <tbody>
                              <tr
                                className={styles.select_item_aroma_table_row}
                              >
                                <th className={styles.select_item_yellowTxt}>
                                  ドライ
                                </th>
                                <th className={styles.select_item_yellowTxt}>
                                  クラスト
                                </th>
                                <th className={styles.select_item_yellowTxt}>
                                  ブレーク
                                </th>
                              </tr>
                              <tr
                                className={styles.select_item_aroma_table_row}
                              >
                                <td>
                                  {beans.aromaDryStrength}|
                                  {beans.aromaDryQuality}
                                </td>
                                <td>
                                  {beans.aromaCrustStrength}|
                                  {beans.aromaCrustQuality}
                                </td>
                                <td>
                                  {beans.aromaBreakStrength}|
                                  {beans.aromaBreakQuality}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_defects}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.defects}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_cleancap}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.cleancap}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_sweet}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.sweet}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_acidity}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.acidity}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_mouthfeel}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.mouthfeel}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_flavor}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.flavor}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_after}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.after}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_balance}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.balance}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_overall}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.overall}
                        </p>
                      </li>

                      <li
                        className={`${styles.select_item_list} ${styles.select_item_total}`}
                      >
                        <div className={styles.select_item_total_wrap}>
                          <p className={styles.select_item_value}>
                            <span className={styles.select_item_resultTxt}>
                              {beans.result}
                            </span>
                          </p>
                          <p
                            className={styles.select_item_total_value}
                            colSpan={2}
                          >
                            <span className={styles.select_item_totalTxt}>
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
                        className={`${styles.select_item_list} ${styles.select_item_index}`}
                      >
                        {index + 1}
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_coffee}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.coffee.slice(0, 20)}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_roast}`}
                      >
                        <p className={styles.select_item_value}>
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
                        className={`${styles.select_item_list} ${styles.select_item_aroma}`}
                      >
                        <div className={styles.select_item_value}>
                          <table
                            border="0"
                            className={styles.select_item_aroma_table}
                          >
                            <tbody>
                              <tr
                                className={styles.select_item_aroma_table_row}
                              >
                                <th className={styles.select_item_yellowTxt}>
                                  ドライ
                                </th>
                                <th className={styles.select_item_yellowTxt}>
                                  クラスト
                                </th>
                                <th className={styles.select_item_yellowTxt}>
                                  ブレーク
                                </th>
                              </tr>
                              <tr
                                className={styles.select_item_aroma_table_row}
                              >
                                <td>
                                  {beans.aromaDryStrength}|
                                  {beans.aromaDryQuality}
                                </td>
                                <td>
                                  {beans.aromaCrustStrength}|
                                  {beans.aromaCrustQuality}
                                </td>
                                <td>
                                  {beans.aromaBreakStrength}|
                                  {beans.aromaBreakQuality}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_defects}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.defects}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_cleancap}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.cleancap}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_sweet}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.sweet}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_acidity}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.acidity}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_mouthfeel}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.mouthfeel}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_flavor}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.flavor}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_after}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.after}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_balance}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.balance}
                        </p>
                      </li>
                      <li
                        className={`${styles.select_item_list} ${styles.select_item_overall}`}
                      >
                        <p className={styles.select_item_value}>
                          {beans.overall}
                        </p>
                      </li>

                      <li
                        className={`${styles.select_item_list} ${styles.select_item_total}`}
                      >
                        <div className={styles.select_item_total_wrap}>
                          <p className={styles.select_item_value}>
                            <span className={styles.select_item_resultTxt}>
                              {beans.result}
                            </span>
                          </p>
                          <p
                            className={styles.select_item_total_value}
                            colSpan={2}
                          >
                            <span className={styles.select_item_totalTxt}>
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
  );
}
const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};
