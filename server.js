const express = require("express");
const { getRandomChar } = require("./helper");
const app = express();
const PORT = 3006;

const mainGenerator = async (
  len,
  upperCharCount,
  lowerCharCount,
  specialCharCount
) => {
  // Define character pools for each type
  const uppercase = [];
  const lowercase = [];
  const special = [];
  const numbers = [];

  for (let i = 48; i <= 57; i++) numbers.push(String.fromCharCode(i)); // 0-9
  for (let i = 65; i <= 90; i++) uppercase.push(String.fromCharCode(i)); // A-Z
  for (let i = 97; i <= 122; i++) lowercase.push(String.fromCharCode(i)); // a-z
  for (let i = 33; i <= 47; i++) special.push(String.fromCharCode(i)); // Special chars before 0-9
  for (let i = 58; i <= 64; i++) special.push(String.fromCharCode(i)); // Special chars between digits and A-Z
  for (let i = 91; i <= 96; i++) special.push(String.fromCharCode(i)); // Special chars between Z and a

  const result = [
    ...getRandomChar(uppercase, upperCharCount),
    ...getRandomChar(lowercase, lowerCharCount),
    ...getRandomChar(special, specialCharCount),
  ];

  // If length allows, fill the rest with random characters (numbers, etc.)
  const remainingLength = len - result.length;
  if (remainingLength > 0) {
    result.push(
      ...getRandomChar(
        [...uppercase, ...lowercase, ...special, ...numbers],
        remainingLength
      )
    );
  }

  // Shuffle the result array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("");
};

app.get("/passgen", async (req, res) => {
  // decoding the query strings
  const len = +req.query.len;
  const upperCharCount = +req.query.uppers;
  const lowerCharCount = +req.query.lowers;
  const specialCharCount = +req.query.special;

  // if the requested length for password was below 8
  if (len < 8) {
    res
      .send("The length of password couldn't be less than 8 characters")
      .status(401);
    return;
  }

  password = await mainGenerator(
    len,
    upperCharCount,
    lowerCharCount,
    specialCharCount
  );
  res.send(password).status(200);
});

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
