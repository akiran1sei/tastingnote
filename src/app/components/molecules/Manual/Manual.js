"use client";
import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
import { useState, useEffect } from "react";
import { EditManualComponent } from "./EditManual/EditManual";
import { SelectManualComponent } from "./SelectManual/SelectManual";
export function ManualComponent() {
  const [activeTab, setActiveTab] = useState("tab1");
  const content = {
    tab1: (
      <div className={manual.manual__select__page}>
        <SelectManualComponent />
      </div>
    ),
    tab2: (
      <div className={manual.manual__edit__page}>
        <EditManualComponent />
      </div>
    ),
  };

  return (
    <>
      <div className={manual.manual__container}>
        <div className={manual.manual__wrap}>
          <h1 className={manual.contents__title}>Manual</h1>
          <div className={manual.manual__nav__box}>
            <ul className={manual.manual__nav__list}>
              <li className={manual.manual__nav__item}>
                <button onClick={() => setActiveTab("tab1")}>Select</button>
              </li>
              <li className={manual.manual__nav__item}>
                <button onClick={() => setActiveTab("tab2")}>
                  Create/Update
                </button>
              </li>
            </ul>
          </div>
          <div className={manual.manual__contents}>{content[activeTab]}</div>
        </div>
      </div>
    </>
  );
}
