const express = require("express");
const app = express();
const PORT = 3006;

const alphabets = {
  bigCharacters: {
    bigChar: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
  },
  smallCharacters: {
    smallChar: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
  },
};
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const specialSign = ["@", "#", "$", "*", "&", "_", "/", ".", "|", "?"];
let password = null;
const randomIndex = Math.floor(Math.abs(Math.random() * 10)).toString();
const randomIndexAlphabets = Math.floor(Math.abs(Math.random() * 26));

let i = Math.floor(Math.abs(Math.random() * (14 - 8 + 1) + 8));

const main_generator = async (alphabets, numbers, specialSign) => {
  for (i; i > 0; i--) {
    let randomNumber = numbers[randomIndex];
    let randomSpecialSign = specialSign[randomIndex];
    let randomSmallAlphabets =
      alphabets.smallCharacters.smallChar[randomIndexAlphabets];
    let randomBigAlphabets =
      alphabets.bigCharacters.bigChar[randomIndexAlphabets];
    password = randomBigAlphabets;
    password += randomNumber;
    password += randomSpecialSign;
    password += randomSmallAlphabets;
  }

  let randomNumber = numbers[randomIndex];
  let randomSpecialSign = specialSign[randomIndex];
  let randomSmallAlphabets =
    alphabets.smallCharacters.smallChar[randomIndexAlphabets];
  let randomBigAlphabets =
    alphabets.bigCharacters.bigChar[randomIndexAlphabets];
  password +=
    randomBigAlphabets +
    randomNumber +
    randomSmallAlphabets +
    randomSpecialSign;
};
main_generator(alphabets, numbers, specialSign);

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
