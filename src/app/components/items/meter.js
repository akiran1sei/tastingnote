import styles from "@/app/styles/Contents.module.css";
import React, { useEffect, useState } from "react";
export function meter() {
  // const [useBody, setBody] = useState("");
  // const [useAcidity, setAcidity] = useState("");
  // useEffect(() => {
  //   Data.map((e) => {
  //     if (e.bodyStrength === "Heavy") {
  //       return setBody(90);
  //     } else if (e.bodyStrength === "Full") {
  //       return setBody(70);
  //     } else if (e.bodyStrength === "Medium") {
  //       return setBody(50);
  //     } else if (e.bodyStrength === "Light") {
  //       return setBody(30);
  //     } else if (e.bodyStrength === "Very Light") {
  //       return setBody(10);
  //     }
  //   });
  // }, [location.reload]);

  // useEffect(() => {
  //   Data.map((e) => {
  //     if (e.acidityStrength === "Extremely High") {
  //       return setAcidity(90);
  //     } else if (e.acidityStrength === "FulVery Highl") {
  //       return setAcidity(70);
  //     } else if (e.acidityStrength === "Middle") {
  //       return setAcidity(50);
  //     } else if (e.acidityStrength === "Moderately Low") {
  //       return setAcidity(30);
  //     } else if (e.acidityStrength === "Very Low") {
  //       return setAcidity(10);
  //     }
  //   });
  // }, [location.reload]);
  return (
    <div
      className={`${styles.meter_box_landscape} ${styles.meter_box_portrait}`}
    ></div>
  );
}
