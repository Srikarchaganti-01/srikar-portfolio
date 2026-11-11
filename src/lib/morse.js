const TABLE = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....",
  6: "-....", 7: "--...", 8: "---..", 9: "----.",
};

/** "Srikar" → "... .-. .. -.- .- .-.". Words are separated by " / ". Unknown characters are skipped. */
export function toMorse(text) {
  return String(text)
    .toUpperCase()
    .split(/\s+/)
    .map((word) =>
      [...word]
        .map((char) => TABLE[char])
        .filter(Boolean)
        .join(" "),
    )
    .filter(Boolean)
    .join(" / ");
}
