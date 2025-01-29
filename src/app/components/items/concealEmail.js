// メールアドレスを難読化する関数
export function maskEmail(email) {
  if (!email || !email.includes("@")) {
    return email;
  }

  const [localPart, domain] = email.split("@");

  // ローカルパート（@前）の難読化パターン
  let maskedLocalPart;
  if (localPart.length <= 2) {
    maskedLocalPart = "*".repeat(localPart.length);
  } else {
    maskedLocalPart =
      localPart[0] +
      "*".repeat(localPart.length - 2) +
      localPart[localPart.length - 1];
  }

  // ドメイン部分（@後）の難読化パターン
  const domainParts = domain.split(".");
  const maskedDomain = domainParts
    .map((part, index) => {
      // 最後のドメイン部分（.com, .jpなど）はそのまま表示
      if (index === domainParts.length - 1) {
        return part;
      }
      // それ以外は最初と最後の文字を残して難読化
      if (part.length <= 2) {
        return part;
      }
      return part[0] + "*".repeat(part.length - 2) + part[part.length - 1];
    })
    .join(".");

  return `${maskedLocalPart}@${maskedDomain}`;
}
