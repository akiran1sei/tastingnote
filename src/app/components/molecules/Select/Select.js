"use client";
import styles from "@/app/styles/Pages.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import CSV from "@/app/components/buttons/Export/CSV";
import PDF from "@/app/components/buttons/Export/PDF";

import { useSession } from "next-auth/react";
import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";
import { Strength } from "../../items/strength";

export function SelectComponent({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchData = searchParams.get("search") || " ";
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [showExportButton, setShowExportButton] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [checkbox, setCheckBox] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(searchData || "undefined"); // 選択された値を保持
  const [defaultValue, setDefaultValue] = useState("");
  console.log(searchData);
  const { data: groupData, error: groupError } = useSWR(
    "/api/group/choice",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );
  const { data: readAllData, error: readAllError } = useSWR(
    `/api/readall/${userInfo.email}/${defaultValue}`,

    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
      refreshInterval: 0,
      dedupingInterval: 0,
    }
  );
  const options = groupData?.groups
    ?.map((e) => {
      if (e.email.includes(userInfo.email)) {
        return (
          <option key={e._id} value={e.groupname}>
            {e.groupname}
          </option>
        );
      }
      return null;
    })
    .filter(Boolean);
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      setIsClicked(true);
      console.log(Boolean(selectedGroup));
      if (!selectedGroup) {
        return router.replace(`/pages/select?search=`);
      }
      // URLを更新

      const newUrl = `/pages/select?search=${selectedGroup}`;

      return router.replace(newUrl, undefined, { shallow: true });
    } catch (err) {
      console.error("Error during search:", err);
      return alert("検索に失敗しました");
    }
  };

  const handleSearchClick = () => {
    // 親コンポーネントにメッセージを送信
    setShowSearchButton(!showSearchButton);
    setShowExportButton(false);
    setShowDeleteButton(false);
  };
  const handleDeleteClick = () => {
    // 親コンポーネントにメッセージを送信
    setShowDeleteButton(!showDeleteButton);
    setShowExportButton(false);
    setShowSearchButton(false);
    setSelectedItems(new Set());
    setCheckBox([]);
  };
  const handleExportClick = () => {
    setShowExportButton(!showExportButton);
    setShowDeleteButton(false);
    setShowSearchButton(false);
    setSelectedItems(new Set());
    setCheckBox([]);
  };
  async function handleDeleteSubmit(e) {
    e.preventDefault();
    try {
      if (confirm("削除しますか？")) {
        const response = await fetch(`/api/delete/multiple/${userInfo.email}`, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
          method: "DELETE",

          body: JSON.stringify([...checkbox]),
        });

        const json = await response.json();
        setShowDeleteButton(false);

        await router.push(`/pages/select?user=`);
        return alert(json.message);
      }
    } catch (err) {
      return alert("アイテム削除失敗/Select");
    }
  }

  const handleChange = (e) => {
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

    // checkboxステートの更新
    if (e.target.checked) {
      setCheckBox((prev) => [...prev, value]);
    } else {
      setCheckBox((prev) => prev.filter((item) => item !== value));
    }
  };
  useEffect(() => {
    if (isClicked) {
      setDefaultValue(selectedGroup);
    }
  }, [selectedGroup, isClicked]);
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
      if (groupData && readAllData) {
        // AND条件に変更
        console.log("all Ok");
        setIsLoading(false);
        setIsClicked(false);
      }
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session, status, readAllData, groupData]);

  if (isLoading) return <LoadingSkeleton />;
  if (status === "unauthenticated") return <Uncertified />;
  if (!groupData || !readAllData) return <div>データを取得中...</div>;
  if (readAllError || groupError) return <div>エラーが発生しました</div>;
  return (
    <>
      <header className={styles.select__header}>
        <nav className={styles.select__header__nav}>
          <ul className={styles.select__nav__list}>
            <li className={styles.select__nav__item}>
              <button
                type="button"
                className={styles.select__nav__btn}
                onClick={handleDeleteClick}
              >
                <Image
                  src="/images/svg/delete_img.svg"
                  alt="削除"
                  width={48}
                  height={48}
                  priority
                />
              </button>
            </li>
            <li className={styles.select__nav__item}>
              <button
                type="button"
                className={styles.select__nav__btn}
                onClick={handleSearchClick}
              >
                <Image
                  src="/images/svg/search_img.svg"
                  alt="検索ボタン"
                  width={24}
                  height={24}
                  priority
                />
              </button>
            </li>
            <li className={styles.select__nav__item}>
              <button
                type="button"
                className={styles.select__nav__btn}
                onClick={handleExportClick}
              >
                <Image
                  src="/images/svg/export_img.svg"
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
      <h1 className={styles.contents__title}>SELECT</h1>

      <div className={styles.select__header__active}>
        <ul className={styles.select__nav__list__active}>
          {showDeleteButton && (
            <li
              className={styles.select__nav__item__active}
              hidden={!showDeleteButton}
            >
              <button
                type="submit"
                onClick={handleDeleteSubmit}
                className={`${styles.btn__white} ${styles.nav__btn}`}
              >
                Delete
              </button>
            </li>
          )}
          {showExportButton && (
            <>
              <li
                className={styles.select__nav__item__active}
                hidden={!showExportButton}
              >
                <span>
                  エラーがでましたら、リロードをしていただくか
                  <br />
                  キャッシュを削除して対応してください。
                </span>
                <br />
                <PDF data={checkbox} />
              </li>
              <li
                className={styles.select__nav__item__active}
                hidden={!showExportButton}
              >
                <CSV data={checkbox} />
              </li>
            </>
          )}
          {showSearchButton && (
            <li
              className={styles.select__nav__item__active}
              hidden={!showSearchButton}
            >
              <div className={styles.select__search}>
                <div className={styles.search__box}>
                  <label htmlFor="search" className={styles.search__box__label}>
                    SEARCH
                  </label>
                  <select
                    name="search"
                    id="search"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className={styles.search__box__select}
                  >
                    <optgroup label="Group">
                      <option value="">All</option>
                      {options}
                    </optgroup>
                  </select>
                  <button
                    type="button"
                    onClick={handleSearch}
                    className={styles.search__box__button}
                  >
                    <Image
                      src="/images/svg/search_img.svg"
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

      <div className={styles.select__contents}>
        <div className={styles.select__scroll__container}>
          <ul className={styles.select__beans__list}>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__index}`}
            >
              <span className={styles.select__beans__list__title}>No.</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__coffee}`}
            >
              <span className={styles.select__beans__list__title}>Beans</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__roast}`}
            >
              <span className={styles.select__beans__list__title}>Roast</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__aroma}`}
            >
              <span className={styles.select__beans__list__title}>Aroma</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__defects}`}
            >
              <span className={styles.select__beans__list__title}>Defects</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__cleancap}`}
            >
              <span className={styles.select__beans__list__title}>
                Clean
                <br />
                Cap
              </span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__sweet}`}
            >
              <span className={styles.select__beans__list__title}>Sweet</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__acidity}`}
            >
              <span className={styles.select__beans__list__title}>Acidity</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__mouthfeel}`}
            >
              <span className={styles.select__beans__list__title}>
                Mouthfeel
              </span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__flavor}`}
            >
              <span className={styles.select__beans__list__title}>Flavor</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__after}`}
            >
              <span className={styles.select__beans__list__title}>After</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__balance}`}
            >
              <span className={styles.select__beans__list__title}>Balance</span>
            </li>

            <li
              className={`${styles.select__beans__list__item} ${styles.select__overall}`}
            >
              <span className={styles.select__beans__list__title}>OverAll</span>
            </li>
            <li
              className={`${styles.select__beans__list__item} ${styles.select__total}`}
            >
              <span className={styles.select__beans__list__title}>
                TOTAL
                <br />
                +36
              </span>
            </li>
          </ul>
          <div className={styles.select__beans__value}>
            {readAllData.allItems.map((beans, index) => (
              <div className={styles.select__beans} key={beans._id}>
                {showDeleteButton || showExportButton ? (
                  <div className={styles.select__delete_list}>
                    <ul
                      className={`${styles.select__list} ${styles.select__checkbox}`}
                    >
                      <li
                        className={`${styles.select__list} ${styles.select__index}`}
                      >
                        {index + 1}
                        <input
                          type="checkbox"
                          className={styles.select__checkbox__input}
                          defaultValue={[beans._id]}
                          onChange={handleChange}
                          checked={selectedItems.has([beans._id].toString())}
                          required
                        />
                      </li>

                      <li
                        className={`${styles.select__list} ${styles.select__coffee}`}
                      >
                        <p className={styles.select__value}>
                          {beans.coffee.slice(0, 20)}
                        </p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__roast}`}
                      >
                        <p className={styles.select__value}>
                          {beans.roastDegree} <br />
                          <output>
                            <input
                              type="range"
                              className={styles.select__input__roast}
                              value={beans.roast}
                              readOnly
                            />
                          </output>
                          <br />
                          {beans.roast}%
                        </p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__aroma}`}
                      >
                        <div className={styles.select__value}>
                          <div className={styles.aroma__box}>
                            <div className={styles.aroma__header}>
                              <div className={styles.aroma__header__title}>
                                Dry
                              </div>
                              <div className={styles.aroma__header__title}>
                                Crust
                              </div>
                              <div className={styles.aroma__header__title}>
                                Break
                              </div>
                            </div>
                            <div className={styles.aroma__value}>
                              <div className={styles.aroma__value__list}></div>
                              <div className={styles.aroma__value__list}>
                                strong:
                              </div>
                              <div className={styles.aroma__value__list}>
                                quality:
                              </div>
                            </div>
                            <div className={styles.aroma__value__strength}>
                              <div className={styles.aroma__value__Item}>
                                {beans.aromaDryStrength}
                              </div>

                              <div className={styles.aroma__value__Item}>
                                {beans.aromaCrustStrength}
                              </div>

                              <div className={styles.aroma__value__Item}>
                                {beans.aromaBreakStrength}
                              </div>
                            </div>
                            <div className={styles.aroma_value__Quality}>
                              <div className={styles.aroma__value__Item}>
                                {beans.aromaDryQuality}
                              </div>

                              <div className={styles.aroma__value__Item}>
                                {beans.aromaCrustQuality}
                              </div>

                              <div className={styles.aroma__value__Item}>
                                {beans.aromaBreakQuality}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__defects}`}
                      >
                        <p className={styles.select__value}>{beans.defects}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__cleancap}`}
                      >
                        <p className={styles.select__value}>{beans.cleancap}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__sweet}`}
                      >
                        <p className={styles.select__value}>{beans.sweet}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__acidity}`}
                      >
                        <p className={styles.select__value}>{beans.acidity}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__mouthfeel}`}
                      >
                        <p className={styles.select__value}>
                          {beans.mouthfeel}
                        </p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__flavor}`}
                      >
                        <p className={styles.select__value}>{beans.flavor}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__after}`}
                      >
                        <p className={styles.select__value}>{beans.after}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__balance}`}
                      >
                        <p className={styles.select__value}>{beans.balance}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__overall}`}
                      >
                        <p className={styles.select__value}>{beans.overall}</p>
                      </li>

                      <li
                        className={`${styles.select__list} ${styles.select__total}`}
                      >
                        <div className={styles.select__total__wrap}>
                          <p className={styles.select__value}>
                            <span className={styles.select__result__text}>
                              {beans.result}
                            </span>
                          </p>
                          <p
                            className={styles.select__total__value}
                            colSpan={2}
                          >
                            <span className={styles.select__total__text}>
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
                    className={styles.select__beans__link}
                    passHref
                  >
                    <ul className={styles.select__list}>
                      <li
                        className={`${styles.select__list} ${styles.select__index}`}
                      >
                        {index + 1}
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__coffee}`}
                      >
                        <p className={styles.select__value}>
                          {beans.coffee.slice(0, 20)}
                        </p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__roast}`}
                      >
                        <p className={styles.select__value}>
                          {beans.roastDegree} <br />
                          <output>
                            <input
                              type="range"
                              className={styles.select__input__roast}
                              value={beans.roast}
                              readOnly
                            />
                          </output>
                          <br />
                          {beans.roast}%
                        </p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__aroma}`}
                      >
                        <div className={styles.select__value}>
                          <div className={styles.aroma__box}>
                            <div className={styles.aroma__header}>
                              <div className={styles.aroma__header__title}>
                                Dry
                              </div>
                              <div className={styles.aroma__header__title}>
                                Crust
                              </div>
                              <div className={styles.aroma__header__title}>
                                Break
                              </div>
                            </div>
                            <div className={styles.aroma__value}>
                              {/* <div className={styles.aroma__value__list}></div> */}
                              <div className={styles.aroma__value__list}>S</div>
                              <div className={styles.aroma__value__list}>Q</div>
                            </div>

                            <div className={styles.aroma__value__strength}>
                              <div className={styles.aroma__value__Item}>
                                {beans.aromaDryStrength}
                              </div>

                              <div className={styles.aroma__value__Item}>
                                {beans.aromaCrustStrength}
                              </div>

                              <div className={styles.aroma__value__Item}>
                                {beans.aromaBreakStrength}
                              </div>
                            </div>
                            <div className={styles.aroma_value__Quality}>
                              <div className={styles.aroma__value__Item}>
                                {beans.aromaDryQuality}
                              </div>

                              <div className={styles.aroma__value__Item}>
                                {beans.aromaCrustQuality}
                              </div>

                              <div className={styles.aroma__value__Item}>
                                {beans.aromaBreakQuality}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__defects}`}
                      >
                        <p className={styles.select__value}>{beans.defects}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__cleancap}`}
                      >
                        <p className={styles.select__value}>{beans.cleancap}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__sweet}`}
                      >
                        <p className={styles.select__value}>{beans.sweet}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__acidity}`}
                      >
                        <p className={styles.select__value}>
                          <span className={styles.select__value__text}>
                            {beans.acidity}
                          </span>
                          <span
                            className={`${styles.select__value__text} ${styles.select__acidity_strength}`}
                          >
                            <Strength data={beans.acidityStrength} />
                          </span>
                        </p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__mouthfeel}`}
                      >
                        <p className={styles.select__value}>
                          <span className={styles.select__value__text}>
                            {beans.mouthfeel}
                          </span>
                          <span
                            className={`${styles.select__value__text} ${styles.select__body_strength}`}
                          >
                            <Strength data={beans.bodyStrength} />
                          </span>
                        </p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__flavor}`}
                      >
                        <p className={styles.select__value}>{beans.flavor}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__after}`}
                      >
                        <p className={styles.select__value}>{beans.after}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__balance}`}
                      >
                        <p className={styles.select__value}>{beans.balance}</p>
                      </li>
                      <li
                        className={`${styles.select__list} ${styles.select__overall}`}
                      >
                        <p className={styles.select__value}>{beans.overall}</p>
                      </li>

                      <li
                        className={`${styles.select__list} ${styles.select__total}`}
                      >
                        <div className={styles.select__total__wrap}>
                          <p className={styles.select__value}>
                            <span className={styles.select__result__text}>
                              {beans.result}
                            </span>
                          </p>
                          <p
                            className={styles.select__total__value}
                            colSpan={2}
                          >
                            <span className={styles.select__total__text}>
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
