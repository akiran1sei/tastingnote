import { Span } from "next/dist/trace";

export function ManualComponent() {
  return (
    <>
      <ol>
        <li className="manual">
          <span className="ManualComponent"> No.:</span>
          <span className="ManualComponent">
            作成した順番, Beans:豆の名前、又は、番号
          </span>
        </li>
        <li className="manual">
          <span className="ManualComponent">Roast:</span>
          <span className="ManualComponent">
            焙煎度によるパーセンテージと焙煎度の名前
          </span>
        </li>
        <li className="manual">
          <span className="ManualComponent">Aroma:</span>
          <span className="ManualComponent">
            ”dry”・”crust”・”break”に分かれる。”dry”は粉の状態からの香り、”crust”は湯を注いだ直後の香り、
            ”break”は混ぜた後の香りで、強さ（左）と質（右）で評価している。評価点数は、”-3”～”3”（-3,-2,-1,0,1,2,3）間で付けられる,
          </span>
        </li>
        <li className="manual">
          <span className="ManualComponent">Defects:</span>
          <span className="ManualComponent">「傷」「欠点」のこと</span>
        </li>
        <li className="manual">
          <span className="ManualComponent">Clean Cap:</span>
          <span className="ManualComponent">味わいの透明度</span>
        </li>
        <li className="manual">
          <span className="ManualComponent">Sweet:</span>
          <span className="ManualComponent">豆の甘み</span>
        </li>
        <li className="manual">
          <span className="ManualComponent">Acidity:</span>
          <span className="ManualComponent">
            酸の質とその強さのことで、酸の質は点数で評価され、酸の強さは5段階で表されこのページでは縦長で表されている、
            下から｛L2・L1・M・H1・H2｝となっており、
            ”L”はLow、”M”はMedium、”H”はHighのそれぞれの略称で下から高い順に上がっている
          </span>
        </li>
        <li className="manual">
          Mouthfeel:<span className="ManualComponent"></span>
          <span className="ManualComponent">
            口当たりの評価とコクの強弱で、口当たりの評価は点数評価で、コクの強弱は上記の”Acidity”の酸の強さと同じ評価方法を取っています
          </span>
        </li>
        <li className="manual">
          <span className="ManualComponent">Flavor:</span>
          <span className="ManualComponent">風味の質を評価</span>
        </li>
        <li className="manual">
          <span className="ManualComponent">After:</span>
          <span className="ManualComponent">後味の印象</span>
        </li>
        <li className="manual">
          <span className="ManualComponent">Balance:</span>
          <span className="ManualComponent">
            ”Defects”・”CleanCap”・”Sweet”・”Acidity”・”Mouthfeel”・”Flavor”・”After”の項目での”全体のバランス”
          </span>
        </li>
        <li className="manual">
          <span className="ManualComponent">OverAll:</span>
          <span className="ManualComponent">
            味わいの奥行など項目にない点にも着目し、ここまでの評価に囚われず、主観で付けられている,
          </span>
        </li>
        <li className="manual">
          <span className="ManualComponent">TOTAL:</span>
          <span className="ManualComponent">
            付けられた点数を合計し、基礎点数である（36点）を加えた点数
          </span>
        </li>
      </ol>
    </>
  );
}
