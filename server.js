const alphabets = [
  {
    bigCall: [
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
  {
    smallCall: [
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
];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const randomNumber = Math.floor(Math.random() * 10);
const specialSign = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "*",
  "&",
  "_",
  "-",
  "/",
  ".",
  "|",
  "?",
];
let password = null;

const main_generator = async (alphabet, numbers, specialSign) => {
    let findIndex = numbers.findIndex((num) => {
        num == randomNumber
    })
};
