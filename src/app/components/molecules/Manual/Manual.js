import Image from "next/image";
import manual from "@/app/styles/manual.module.css";
import { EditManualComponent } from "@/app/components/molecules/Manual/EditManual/EditManual";
import { SelectManualComponent } from "./SelectManual/SelectManual";
export function ManualComponent() {
  return (
    <>
      <div className={manual.manual__contents}>
        <div className={manual.manual__wrap}>
          <h1 className={manual.contents__title}>Manual</h1>
          {/* <EditManualComponent /> */}
          <SelectManualComponent />
        </div>
      </div>
    </>
  );
}
