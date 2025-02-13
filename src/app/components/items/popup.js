import manual from "@/app/styles/manual.module.css";
export function Popup(contexts) {
  //   console.log(contexts);

  return (
    <div className={manual.popup}>
      <div className={manual.popup__wrap}>
        <div className={manual.popup__cover}></div>
        <div className={manual.popup__contents}>
          <div className={manual.popup__text}>{contexts}</div>
          <div className={manual.popup__button__box}>
            <button
              type="button"
              className={manual.popup__button}
              //   onClick={toggleMenu}
            >
              <span className={manual.popup__menu_bar}></span>

              <span className={manual.popup__menu_bar}></span>
              <span className={manual.visuallyHidden}>close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
