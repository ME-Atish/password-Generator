const express = require("express");
const app = express();
const PORT = 3006;

const specialSigns = [35, 36, 37, 38, 42, 46, 63, 64];
const numbers = [48 , 49 , 50 ,51 , 52 , 53 , 54 , 55 , 56 , 57]
const smallChars = [97 , 98 , 99 , 100 , 101 , 102 , 103 , 104 , 105 , 106 ,107 , 108 , 109 , 110 , 111 , 112 , 113 , 114 , 115 , 116 , 117 , 118 , 119 , 120 , 121 , 122]

const mainGenerator = async () => {
  const randomNumber = Math.floor(Math.random() * (14 - 8)) + 8;
  const exceptions = [
    34, 39, 40, 41, 44, 43, 45, 47, 57, 58, 59, 60, 61, 62, 91, 92, 93, 94, 96,
  ];

  const char = Array.from(
    { length: randomNumber }, // create array with random slot
    () => {
      let asciiCode;
      do {
        asciiCode = Math.floor(Math.random() * (122 - 35 + 1)) + 35; // create random ASCII code between 35 to 122
      } while (exceptions.includes(asciiCode)); // exclude the exception number generated
      return asciiCode;
    }
  );
  let password = Buffer.from(char).toString(); // convert ascii code to string
  return password;
};

app.get("/passwordGenerator", async (req, res) => {
  password = await mainGenerator();
  res.send(password);
});

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
