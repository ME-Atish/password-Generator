const express = require("express");
const { getRandomChar } = require("./helper");
const app = express();
const PORT = 3006;

const mainGenerator = async (
  len,
  upperCharCount,
  lowerCharCount,
  specialCharCount,
  salt,
  pepper
) => {
  // Define character pools for each type
  const uppercase = [];
  const lowercase = [];
  const special = [];

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
    // define the possible range for remaining length, with no conflict with user's settings
    const possibleRangeForRemaining = [];
    if (!upperCharCount) possibleRangeForRemaining.push(...uppercase);
    if (!lowerCharCount) possibleRangeForRemaining.push(...lowercase);
    if (!specialCharCount) possibleRangeForRemaining.push(...special);
    result.push(
      ...getRandomChar(
        // [...uppercase, ...lowercase, ...special],
        possibleRangeForRemaining,
        remainingLength
      )
    );
  }

  // Shuffle the result array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  console.log(result.length);
  console.log(result);
  return salt + result.join("") + pepper;
};

app.get("/passgen", async (req, res) => {
  // decoding the query strings
  const len = +req.query.len;
  const upperCharCount = +req.query.uppers || 0;
  const lowerCharCount = +req.query.lowers || 0;
  const specialCharCount = +req.query.special || 0;
  const salt = req.query.salt ?? "";
  const pepper = req.query.pepper ?? "";

  // error if the requested length was below 8
  if (len < 8) {
    res
      .send("The length of password couldn't be less than 8 characters")
      .status(401);
    return;
  }

  // check if the provided setting request for a longer response than the supposed length
  if (upperCharCount + lowerCharCount + specialCharCount > len) {
    res
      .send(
        "The provided setting requests for longer response than supposed length"
      )
      .status(401);
    return;
  }

  // check if the overall length + salt/pepper aren't fit
  if (
    upperCharCount +
      lowerCharCount +
      specialCharCount +
      salt.length +
      pepper.length >
    len
  ) {
    res
      .send(
        "The overall length + salt/pepper aren't fit with each other—the salt/pepper are too long for your supposed length of password"
      )
      .status(401);
    return;
  }

  password = await mainGenerator(
    len,
    upperCharCount,
    lowerCharCount,
    specialCharCount,
    salt,
    pepper
  );
  res.json({ pass: password }).status(200);
});

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
