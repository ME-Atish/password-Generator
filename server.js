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
const randomIndexTwo = Math.floor(Math.abs(Math.random() * 5));
const randomIndexAlphabets = Math.floor(Math.abs(Math.random() * 26));
const randomIndexAlphabetsTwo = Math.floor(Math.abs(Math.random() * 13));

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

    let randomNumber2 = numbers[randomIndexTwo];
    let randomSpecialSign2 = specialSign[randomIndexTwo];
    let randomSmallAlphabets2 =
      alphabets.smallCharacters.smallChar[randomIndexAlphabetsTwo];
    let randomBigAlphabets2 =
      alphabets.bigCharacters.bigChar[randomIndexAlphabetsTwo];
    password += randomSpecialSign2;
    password += randomBigAlphabets2;
    password += randomNumber2;
    password += randomSmallAlphabets2;
  }
};
main_generator(alphabets, numbers, specialSign);

app.get("/passwordGenerator", (req, res) => {
  res.send(password).status(200);
});

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
