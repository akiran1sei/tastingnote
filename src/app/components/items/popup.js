import manual from "@/app/styles/manual.module.css";

export function Popup({ contexts, onClose }) {
  const toggleClose = () => {
    onClose(); // 親コンポーネントで Popup の表示状態を管理する
    // router.refresh(); // 必要に応じて router.refresh() を呼び出す
    console.log("Popup closed"); // router.refresh() が実行されたことを示すログ
  };

  return (
    <div className={manual.popup}>
      <div className={manual.popupWrap}>
        <div className={manual.popupCover}></div>
        <div className={manual.popupContents}>
          <div className={manual.popupText}>
            {/* contexts が文字列かどうかで処理を分岐 */}
            {typeof contexts === "string" ? contexts : contexts}
          </div>
          <div className={manual.popupButtonBox}>
            <button
              type="button"
              className={manual.popupClose}
              onClick={toggleClose}
              aria-label="close" // aria-label を追加
            >
              <span className={manual.popupMenuBar}></span>
              <span className={manual.popupMenuBar}></span>
              <span className={manual.visuallyHidden}>close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
