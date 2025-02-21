import Loading from "@/app/styles/LoadingAnimation.module.css";

export function LoadingAnimation() {
  return (
    <div className={Loading.coffee}>
      <div className={Loading.dripper}>
        <div className={Loading.dripper__top}></div>
        <div className={Loading.dripper__bottom}>
          <div className={Loading.dripper__bottom_1}></div>
          <div className={Loading.dripper__bottom_2}></div>
          <div className={Loading.dripper__bottom_3}></div>
        </div>
      </div>
      <div className={Loading.drop}>
        <div className={Loading.drop__top}>
          <div className={Loading.shine}></div>
        </div>
        <div className={Loading.drop__bottom}></div>
      </div>
    </div>
  );
}
