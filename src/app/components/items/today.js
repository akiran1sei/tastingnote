export function Today() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 月は0から始まるので、1を加える
  const day = today.getDate();
  const todaysDate = `${year}/${month}/${day}`;
  return todaysDate;
}
