import strength from "@/app/styles/Strength.module.css";
export function Strength(context) {
  const strengthData = context.data;
  console.log(strengthData);
  if (strengthData === "H2") {
    return (
      <>
        <span className={strength.img_column}>
          <span className={`${strength.img_row} ${strength.H2}`}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
        </span>
        <span className={strength.text_column}>{strengthData}</span>
      </>
    );
  } else if (strengthData === "H1") {
    return (
      <>
        <span className={strength.img_column}>
          <span className={strength.img_row}></span>
          <span className={`${strength.img_row} ${strength.H1}`}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
        </span>
        <span className={strength.text_column}>{strengthData}</span>
      </>
    );
  } else if (strengthData === "M") {
    return (
      <>
        <span className={strength.img_column}>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={`${strength.img_row} ${strength.M}`}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
        </span>
        <span className={strength.text_column}>{strengthData}</span>
      </>
    );
  } else if (strengthData === "L1") {
    return (
      <>
        <span className={strength.img_column}>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={`${strength.img_row} ${strength.L1}`}></span>
          <span className={strength.img_row}></span>
        </span>
        <span className={strength.text_column}>{strengthData}</span>
      </>
    );
  } else if (strengthData === "L2") {
    return (
      <>
        <span className={strength.img_column}>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={strength.img_row}></span>
          <span className={`${strength.img_row} ${strength.L2}`}></span>
        </span>
        <span className={strength.text_column}>{strengthData}</span>
      </>
    );
  }
}
