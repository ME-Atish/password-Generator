const express = require("express");
const app = express();
const PORT = 3006;

const mainGenerator = async (bigChar, sign, smallChar, num) => {
  const randomNumber = Math.floor(Math.random() * (14 - 8)) + 8;
  const exceptions = [
    34, 39, 40, 41, 44, 43, 45, 47, 57, 58, 59, 60, 61, 62, 91, 92, 93, 94, 96,
  ];
  const specialSigns = [35, 36, 37, 38, 42, 46, 63, 64];
  const numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
  const smallChars = [
    97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
  ];
  const bigChars = [
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
    84, 85, 86, 87, 88, 89, 90,
  ];
  let length = bigChar + sign + smallChar + num;
  const char = Array.from(
    { length: randomNumber }, // create array with random slot
    () => {
      let asciiCode;
      do {} while (exceptions.includes(asciiCode)); // exclude the exception number generated
      return asciiCode;
    }
  );
  let password = Buffer.from(char).toString(); // convert ascii code to string
  return password;
};

app.get("/passwordGenerator", async (req, res) => {
  const bigChar = Number(req.query.big);
  const smallChar = Number(req.query.small);
  const num = Number(req.query.num);
  const sign = Number(req.query.sign);
  if (bigChar && sign && smallChar && num) {
    password = await mainGenerator(bigChar, sign, smallChar, num);
  } else {
    res.send("Enter correct query string").status(400);
  }
  // res.send(password);
});

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
