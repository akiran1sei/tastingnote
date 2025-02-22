// components/NewUserSection.js
import manual from "@/app/styles/manual.module.css";
import Image from "next/image";

function NewUserSection({ title, text, imageUrl, imageAlt, imageCaption }) {
  return (
    <section className={manual.section}>
      <h2 className={manual.subTitle}>
        <span className={manual.fontYellow}>{title}</span>
      </h2>
      {text}
      <figure className={`${manual.imgBox} ${manual.newuser__img}`}>
        <Image src={imageUrl} alt={imageAlt} width={500} height={560} />
        <figcaption className={manual.imgBox__caption}>
          {imageCaption}
        </figcaption>
      </figure>
    </section>
  );
}

export function NewUserComponent() {
  return (
    <div className={`${manual.newUser} ${manual.container}`}>
      <NewUserSection
        title="New User"
        text={
          <p className={manual.text}>
            新しくテイスティングデータを作るには、
            <span className={manual.image__popup}>左上にある3本線</span>
            をクリックし、 出てきたメニュー欄の
            <strong className={manual.fontYellow}>”Group”</strong>をクリック。
          </p>
        }
        imageUrl="/images/png/menu-list-img.png"
        imageAlt="メニューリストの画像"
        imageCaption="メニューリスト"
      />
      <NewUserSection
        title="Group Create"
        text={
          <p className={manual.text}>
            クリックすると作成するデータのグループ分けするために必要なグループネームを作成する
            <strong className={manual.fontYellow}>”Group Create”</strong>
            という項目がありますのでそこで作成をしてください。グループネームを作成後に、同ページにある
            <strong className={manual.fontYellow}>”NewPage”</strong>
            をクリックいたしますとデータの新規作成するページ（Create）にページ遷移致します。
          </p>
        }
        imageUrl="/images/png/group-img.png"
        imageAlt="グループページの画像"
        imageCaption="グループページ"
      />
      <section className={manual.section}>
        <p className={manual.text}>
          基本的にグループネームを作成していないとテイスティングデータは作成できませんので、必ず作成しますようお願いします。
        </p>
        <p className={manual.text}>
          あと、<strong className={manual.fontYellow}>”Group Create”</strong>
          の下に、<strong className={manual.fontYellow}>”Group Delete”</strong>
          という項目がありますが、こちらは作成したグループネームを削除する項目になります。
        </p>
      </section>
    </div>
  );
}
