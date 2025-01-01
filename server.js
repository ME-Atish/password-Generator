const express = require("express");
const app = express();
const PORT = 3006;

const mainGenerator = async () => {
  // const randomNumber = Math.floor(Math.random() * (14 - 8)) + 8;

  // Exclude special characters: :, ;, <, =, >, [, \, ], ^, `
  const exceptions = [58, 59, 60, 61, 62, 91, 92, 93, 94, 96];

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

app.get("/passgen", async (req, res) => {
  password = await mainGenerator();
  res.send(password);
});

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
