const express = require("express");
const { getRandomChar } = require("./helper");
const app = express();
const PORT = 3006;

const mainGenerator = async (
  len,
  upperCharCount,
  lowerCharCount,
  specialCharCount,
  numberCharCount,
  excludeChars,
  salt,
  pepper
) => {
  // Define character pools for each type
  const uppercase = [];
  const lowercase = [];
  const specials = [];
  const numbers = [];
  const exclude = {
    uppers: [],
    lowers: [],
    specials: [],
    numbers: [],
  };

  for (let i = 65; i <= 90; i++) uppercase.push(String.fromCharCode(i));
  // A-Z
  for (let i = 97; i <= 122; i++) lowercase.push(String.fromCharCode(i)); // a-z
  for (let i = 48; i <= 57; i++) numbers.push(String.fromCharCode(i)); // number between 0-9
  for (let i = 33; i <= 47; i++) specials.push(String.fromCharCode(i)); // Special chars before 0-9
  for (let i = 58; i <= 64; i++) specials.push(String.fromCharCode(i)); // Special chars between digits and A-Z
  for (let i = 91; i <= 96; i++) specials.push(String.fromCharCode(i)); // Special chars between Z and a

  // Categorize and add excluded characters
  for (let i = 0; i < excludeChars.length; i++) {
    if (
      excludeChars.charCodeAt(i) <= 90 &&
      excludeChars.charCodeAt(i) >= 65 &&
      !exclude.uppers.includes(excludeChars[i])
    ) {
      exclude.uppers.push(excludeChars[i]);
    } else if (
      excludeChars.charCodeAt(i) >= 97 &&
      excludeChars.charCodeAt(i) <= 122 &&
      !exclude.lowers.includes(excludeChars[i])
    ) {
      exclude.lowers.push(excludeChars[i]);
    } else if (
      (excludeChars.charCodeAt(i) <= 47 &&
        excludeChars.charCodeAt(i) >= 33 &&
        !exclude.specials.includes(excludeChars[i])) ||
      (excludeChars.charCodeAt(i) <= 64 &&
        excludeChars.charCodeAt(i) >= 58 &&
        !exclude.specials.includes(excludeChars[i])) ||
      (excludeChars.charCodeAt(i) <= 96 &&
        excludeChars.charCodeAt(i) >= 91 &&
        !exclude.specials.includes(excludeChars[i]))
    ) {
      exclude.specials.push(excludeChars[i]);
    } else if (
      excludeChars.charCodeAt(i) <= 57 &&
      excludeChars.charCodeAt(i) >= 48 &&
      !exclude.numbers.includes(excludeChars[i])
    ) {
      exclude.numbers.push(excludeChars[i]);
    }
  }

  // Redefine and filter pools
  const filteredUppercase = uppercase.filter(
    (char) => !exclude.uppers.includes(char)
  );
  const filteredLowercase = lowercase.filter(
    (char) => !exclude.lowers.includes(char)
  );
  const filteredSpecialChars = specials.filter(
    (char) => !exclude.specials.includes(char)
  );
  const filteredNumbers = numbers.filter(
    (char) => !exclude.numbers.includes(char)
  );

  // Generate a result
  const result = [
    ...getRandomChar(filteredUppercase, upperCharCount),
    ...getRandomChar(filteredLowercase, lowerCharCount),
    ...getRandomChar(filteredSpecialChars, specialCharCount),
    ...getRandomChar(filteredNumbers, numberCharCount),
  ];

  // If length allows, fill the rest with random characters (numbers, etc.)
  const remainingLength = len - result.length;
  if (remainingLength > 0) {
    // define the possible range for remaining length, with no conflict with user's settings
    const possibleRangeForRemaining = [];
    if (!upperCharCount) possibleRangeForRemaining.push(...filteredUppercase);
    if (!lowerCharCount) possibleRangeForRemaining.push(...filteredLowercase);
    if (!specialCharCount)
      possibleRangeForRemaining.push(...filteredSpecialChars);
    if (!numberCharCount) possibleRangeForRemaining.push(...filteredNumbers);
    result.push(...getRandomChar(possibleRangeForRemaining, remainingLength));
  }

  // Shuffle the result array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return salt + result.join("") + pepper;
};

app.get("/passgen", async (req, res) => {
  // decoding the query strings
  const len = +req.query.len;
  const upperCharCount = +req.query.uppers || 0;
  const lowerCharCount = +req.query.lowers || 0;
  const specialCharCount = +req.query.special || 0;
  const numberCharCount = +req.query.number || 0;
  const excludeChars = req.query.exl || "";
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
  if (
    upperCharCount + lowerCharCount + specialCharCount + numberCharCount >
    len
  ) {
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
      numberCharCount +
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
    numberCharCount,
    excludeChars,
    salt,
    pepper
  );
  res.json({ pass: password }).status(200);
});

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
