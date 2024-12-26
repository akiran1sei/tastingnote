"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/styles/Contents.module.css";

import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";
import PDF from "@/app/components/buttons/Export/PDF";

const SelectHeader = React.memo(
  ({ onDeleteClick, onSearchClick, onExportClick }) => {
    return (
      <header className={styles.select_header}>
        <nav className={styles.select_header_menu}>
          <ul className={styles.select_menu_list}>
            <li className={styles.select_header_menu_item}>
              <button
                type="button"
                className={styles.select_header_menu_btn}
                onClick={onDeleteClick}
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
                onClick={onSearchClick}
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
            <li className={styles.select_header_menu_item}>
              <button
                type="button"
                className={styles.select_header_menu_btn}
                onClick={onExportClick}
              >
                <Image
                  src="/images/export_img.svg"
                  alt="エクスポートボタン"
                  width={24}
                  height={24}
                  priority
                />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
);

SelectHeader.displayName = "SelectHeader";

const BeanListItem = React.memo(
  ({ beans, index, showControls, onSelect, isSelected }) => {
    const BeanContent = () => (
      <ul className={styles.select_list_box}>
        <li className={`${styles.select_list} ${styles.select_index}`}>
          {index + 1}
        </li>
        <li className={`${styles.select_list} ${styles.select_coffee}`}>
          <p className={styles.select_value}>{beans.coffee.slice(0, 20)}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_roast}`}>
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
        <li className={`${styles.select_list} ${styles.select_aroma}`}>
          <div className={styles.select_value}>
            <div className={styles.select_aroma_box}>
              <div className={styles.select_aroma_header}>
                <div className={styles.select_aroma_headerTitle}>ドライ</div>
                <div className={styles.select_aroma_headerTitle}>クラスト</div>
                <div className={styles.select_aroma_headerTitle}>ブレーク</div>
              </div>
              <div className={styles.select_aroma_valueHeader}>
                <div className={styles.select_aroma_valueHeader_list}></div>
                <div className={styles.select_aroma_valueHeader_list}>
                  強さ：
                </div>
                <div className={styles.select_aroma_valueHeader_list}>
                  質　：
                </div>
              </div>
              <div className={styles.select_aroma_valueListStrength}>
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
              <div className={styles.select_aroma_valueListQuality}>
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
        <li className={`${styles.select_list} ${styles.select_defects}`}>
          <p className={styles.select_value}>{beans.defects}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_cleancap}`}>
          <p className={styles.select_value}>{beans.cleancap}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_sweet}`}>
          <p className={styles.select_value}>{beans.sweet}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_acidity}`}>
          <p className={styles.select_value}>{beans.acidity}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_mouthfeel}`}>
          <p className={styles.select_value}>{beans.mouthfeel}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_flavor}`}>
          <p className={styles.select_value}>{beans.flavor}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_after}`}>
          <p className={styles.select_value}>{beans.after}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_balance}`}>
          <p className={styles.select_value}>{beans.balance}</p>
        </li>
        <li className={`${styles.select_list} ${styles.select_overall}`}>
          <p className={styles.select_value}>{beans.overall}</p>
        </li>

        <li className={`${styles.select_list} ${styles.select_total}`}>
          <div className={styles.select_total_wrap}>
            <p className={styles.select_value}>
              <span className={styles.select_resultTxt}>{beans.result}</span>
            </p>
            <p className={styles.select_total_value} colSpan={2}>
              <span className={styles.select_totalTxt}>{beans.total}</span>
            </p>
          </div>
        </li>
      </ul>
    );

    return (
      <div className={styles.select_beans}>
        {showControls ? (
          <div className={styles.select_delete_list}>
            <BeanContent />
          </div>
        ) : (
          <Link
            href={`/pages/${beans._id}`}
            scroll={false}
            className={styles.select_beans_link}
          >
            <BeanContent />
          </Link>
        )}
      </div>
    );
  }
);

BeanListItem.displayName = "BeanListItem";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function Search({ data }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [userState, setUserState] = useState({
    name: "",
    email: "",
    isLoading: true,
  });

  const [uiState, setUiState] = useState({
    showDeleteButton: false,
    showSearchButton: false,
    showExportButton: false,
  });

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [checkbox, setCheckBox] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [defaultValue, setDefaultValue] = useState(data[1]);

  const { data: readallData, error: readallError } = useSWR(
    userState.email ? `/api/readall/${userState.email}/${defaultValue}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
    }
  );

  const { data: groupData, error: groupError } = useSWR(
    `/api/group/choice`,
    fetcher
  );

  const handleButtonClick = (buttonType) => {
    setUiState({
      showDeleteButton: buttonType === "delete",
      showSearchButton: buttonType === "search",
      showExportButton: buttonType === "export",
    });
    setSelectedItems(new Set());
    setCheckBox([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const newUrl = selectedGroup
        ? `/pages/select/${userState.email}/${selectedGroup}`
        : `/pages/select/${userState.email}`;
      router.push(newUrl);
    } catch (err) {
      console.error("検索エラー:", err);
      alert("検索に失敗しました");
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    if (!confirm("削除しますか？")) return;

    try {
      const response = await fetch(`/api/delete/multiple/${userState.email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify([...checkbox]),
      });

      const json = await response.json();
      setUiState((prev) => ({ ...prev, showDeleteButton: false }));
      router.push(`/pages/select/${userState.email}?user=`);
      alert(json.message);
    } catch (err) {
      alert("アイテム削除に失敗しました");
    }
  };

  const handleItemSelect = (e) => {
    const value = e.target.value;
    setSelectedItems((prev) => {
      const newSelected = new Set(prev);
      if (e.target.checked) {
        newSelected.add(value);
      } else {
        newSelected.delete(value);
      }
      return newSelected;
    });

    setCheckBox((prev) => {
      if (e.target.checked) {
        return [...prev, value];
      }
      return prev.filter((item) => item !== value);
    });
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserState({
        name: session.user.name,
        email: session.user.email,
        isLoading: false,
      });
    } else if (status === "unauthenticated") {
      setUserState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [session, status]);

  if (readallError || groupError) {
    return <div>エラーが発生しました</div>;
  }

  if (userState.isLoading) {
    return <LoadingSkeleton />;
  }

  if (status === "unauthenticated") {
    return <Uncertified />;
  }

  if (!readallData || !groupData) {
    return <div>データを取得中...</div>;
  }

  return (
    <>
      <SelectHeader
        onDeleteClick={() => handleButtonClick("delete")}
        onSearchClick={() => handleButtonClick("search")}
        onExportClick={() => handleButtonClick("export")}
      />
      <h1 className={styles.contents_title}>SELECT</h1>

      <div className={styles.select_header_active_contents}>
        <ul className={styles.select_header_active_menu}>
          {uiState.showDeleteButton && (
            <li className={styles.select_header_active_menu_item}>
              <button
                type="submit"
                onClick={handleDeleteSubmit}
                className={styles.select_menu_btn_white}
              >
                Delete
              </button>
            </li>
          )}
          {uiState.showExportButton && (
            <li className={styles.select_header_active_menu_item}>
              <span>
                エラーがでましたら、リロードをしていただくか
                <br />
                キャッシュを削除して対応してください。
              </span>
              <br />
              <PDF data={checkbox} />
            </li>
          )}
          {uiState.showSearchButton && (
            <li className={styles.select_header_active_menu_item}>
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
                      {groupData.groups
                        .filter((g) => g.email.includes(userState.email))
                        .map((g) => (
                          <option key={g._id} value={g.groupname}>
                            {g.groupname}
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
            {readallData.allItems.map((beans, index) => (
              <BeanListItem
                key={beans._id}
                beans={beans}
                index={index}
                showControls={
                  uiState.showDeleteButton || uiState.showExportButton
                }
                onSelect={handleItemSelect}
                isSelected={selectedItems.has(beans._id.toString())}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
