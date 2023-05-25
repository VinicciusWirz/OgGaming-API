export default function genDefUsername() {
  const min = 0;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const numberString = randomNumber.toString().padStart(6, "0");
  return `user${numberString}`;
}
