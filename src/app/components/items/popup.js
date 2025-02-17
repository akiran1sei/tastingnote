import manual from "@/app/styles/manual.module.css";

export function Popup({ contexts, onClose }) {
  const toggleClose = () => {
    onClose(); // 親コンポーネントで Popup の表示状態を管理する
    // router.refresh(); // 必要に応じて router.refresh() を呼び出す
    console.log("Popup closed"); // router.refresh() が実行されたことを示すログ
  };

  return (
    <div className={manual.popup}>
      <div className={manual.popup__wrap}>
        <div className={manual.popup__cover}></div>
        <div className={manual.popup__contents}>
          <div className={manual.popup__text}>
            {/* contexts が文字列かどうかで処理を分岐 */}
            {typeof contexts === "string" ? contexts : contexts}
          </div>
          <div className={manual.popup__button__box}>
            <button
              type="button"
              className={manual.popup__close}
              onClick={toggleClose}
              aria-label="close" // aria-label を追加
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
