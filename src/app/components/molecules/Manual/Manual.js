"use client";
import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
import { useState, useEffect } from "react";
import { EditManualComponent } from "./EditManual/EditManual";
import { SelectManualComponent } from "./SelectManual/SelectManual";
import { NewUserComponent } from "./NewUser/NewUserComponent";
export function ManualComponent() {
  const [activeTab, setActiveTab] = useState("tab1");
  const content = {
    tab1: (
      <div className={manual.edit__page}>
        <NewUserComponent />
      </div>
    ),

    tab2: (
      <div className={manual.select__page}>
        <SelectManualComponent />
      </div>
    ),
    tab3: (
      <div className={manual.edit__page}>
        <EditManualComponent />
      </div>
    ),
  };

  return (
    <>
      <div className={manual.container}>
        <div className={manual.wrap}>
          <h1 className={manual.contents__title}>Manual</h1>
          <div className={manual.nav__box}>
            <nav className={manual.nav}>
              <ul className={manual.nav__list}>
                <li className={manual.nav__item}>
                  <span role="button" onClick={() => setActiveTab("tab1")}>
                    New user
                  </span>
                </li>
                <li className={manual.nav__item}>
                  <span role="button" onClick={() => setActiveTab("tab2")}>
                    Select
                  </span>
                </li>
                <li className={manual.nav__item}>
                  <span role="button" onClick={() => setActiveTab("tab3")}>
                    Create/Update
                  </span>
                </li>
              </ul>
            </nav>
          </div>
          <div className={manual.contents}>{content[activeTab]}</div>
        </div>
      </div>
    </>
  );
}
