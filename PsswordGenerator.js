const { getRandomChar, shuffle } = require("./helper");

class PasswordGenerator {
  uppercase = [];

  lowercase = [];

  specials = [];

  numbers = [];

  excludes = {
    uppers: [],
    lowers: [],
    specials: [],
    numbers: [],
  };

  constructor(
    len,
    upperCharCount,
    lowerCharCount,
    specialCharCount,
    numberCharCount,
  ) {
    this.len = len;
    this.upperCharCount = upperCharCount;
    this.lowerCharCount = lowerCharCount;
    this.specialCharCount = specialCharCount;
    this.numberCharCount = numberCharCount;
  }

  next(excludeChars, salt, pepper) {
    // Define character pools for each type
    this.createPool(65, 90, this.uppercase); // A-Z
    this.createPool(97, 122, this.lowercase); // a-z
    this.createPool(48, 57, this.numbers); // 0-9
    this.createPool(33, 47, this.specials); // Special chars before 0-9
    this.createPool(58, 64, this.specials); // Special chars between digits and A-Z
    this.createPool(91, 96, this.specials); // Special chars between Z and a

    this.categorizeExcludes(excludeChars);

    // Redefine and filter pools
    const filteredUppercase = this.uppercase.filter(
      (char) => !this.excludes.uppers.includes(char)
    );
    const filteredLowercase = this.lowercase.filter(
      (char) => !this.excludes.lowers.includes(char)
    );
    const filteredSpecialChars = this.specials.filter(
      (char) => !this.excludes.specials.includes(char)
    );
    const filteredNumbers = this.numbers.filter(
      (char) => !this.excludes.numbers.includes(char)
    );

    // Generate a result
    const result = [
      ...getRandomChar(filteredUppercase, this.upperCharCount),
      ...getRandomChar(filteredLowercase, this.lowerCharCount),
      ...getRandomChar(filteredSpecialChars, this.specialCharCount),
      ...getRandomChar(filteredNumbers, this.numberCharCount),
    ];

    // If length allows, fill the rest with random characters (numbers, etc.)
    const remainingLength = this.len - result.length;
    if (remainingLength > 0) {
      // define the possible range for remaining length, with no conflict with user's settings
      const possibleRangeForRemaining = [];
      if (!this.upperCharCount)
        possibleRangeForRemaining.push(...filteredUppercase);
      if (!this.lowerCharCount)
        possibleRangeForRemaining.push(...filteredLowercase);
      if (!this.specialCharCount)
        possibleRangeForRemaining.push(...filteredSpecialChars);
      if (!this.numberCharCount)
        possibleRangeForRemaining.push(...filteredNumbers);
      result.push(...getRandomChar(possibleRangeForRemaining, remainingLength));
    }

    // Shuffle the result array
    shuffle(result);

    return salt + result.join("") + pepper;
  }

  createPool(start, end, target) {
    for (let i = start; i <= end; i++) target.push(String.fromCharCode(i));
  }

  categorizeExcludes(excludeChars) {
    for (let i = 0; i < excludeChars.length; i++) {
      if (
        excludeChars.charCodeAt(i) <= 90 &&
        excludeChars.charCodeAt(i) >= 65 &&
        !this.excludes.uppers.includes(excludeChars[i])
      ) {
        this.excludes.uppers.push(excludeChars[i]);
      } else if (
        excludeChars.charCodeAt(i) >= 97 &&
        excludeChars.charCodeAt(i) <= 122 &&
        !this.excludes.lowers.includes(excludeChars[i])
      ) {
        this.excludes.lowers.push(excludeChars[i]);
      } else if (
        (excludeChars.charCodeAt(i) <= 47 &&
          excludeChars.charCodeAt(i) >= 33 &&
          !this.excludes.specials.includes(excludeChars[i])) ||
        (excludeChars.charCodeAt(i) <= 64 &&
          excludeChars.charCodeAt(i) >= 58 &&
          !this.excludes.specials.includes(excludeChars[i])) ||
        (excludeChars.charCodeAt(i) <= 96 &&
          excludeChars.charCodeAt(i) >= 91 &&
          !this.excludes.specials.includes(excludeChars[i]))
      ) {
        this.exclude.specials.push(excludeChars[i]);
      } else if (
        excludeChars.charCodeAt(i) <= 57 &&
        excludeChars.charCodeAt(i) >= 48 &&
        !this.excludes.numbers.includes(excludeChars[i])
      ) {
        this.excludes.numbers.push(excludeChars[i]);
      }
    }
  }

  justTest() {
    console.log("you've got the power!");
  }
}

module.exports = PasswordGenerator;
