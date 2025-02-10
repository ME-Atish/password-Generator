const express = require("express");
const app = express();
const PORT = 3006;
const Pg = require("./PsswordGenerator");
const { query, validationResult } = require("express-validator");

app.get(
  "/passgen",
  [
    query("len").isAlphanumeric().withMessage("Invalid input!"),
    query("uppers").isAlphanumeric().optional().withMessage("Invalid input!"),
    query("lowers").isAlphanumeric().optional().withMessage("Invalid input!"),
    query("special").isAlphanumeric().optional().withMessage("Invalid input!"),
    query("number").isAlphanumeric().optional().withMessage("Invalid input!"),
    query("exl").isAlphanumeric().optional().withMessage("Invalid input!"),
    query("salt").isAlphanumeric().optional().withMessage("Invalid input!"),
    query("pepper").isAlphanumeric().optional().withMessage("Invalid input!"),
  ],
  async (req, res) => {
    // Decoding the query strings
    const len = +req.query.len;
    const upperCharCount = +req.query.uppers || 0;
    const lowerCharCount = +req.query.lowers || 0;
    const specialCharCount = +req.query.special || 0;
    const numberCharCount = +req.query.number || 0;
    const excludeChars = req.query.exl || "";
    const salt = req.query.salt ?? "";
    const pepper = req.query.pepper ?? "";

    // ensure that the inputs are all sanitized
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // error if the requested length was below 8
    if (len < 8) {
      res
        .send("The length of password couldn't be less than 8 characters")
        .status(401);
      return;
    }

    // apply limit for requested passwords that are longer than 225 characters
    if (len > 255) {
      res
        .send("We cannot produce passwords that are longer than 255 characters")
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

    const pg = new Pg(
      len,
      upperCharCount,
      lowerCharCount,
      specialCharCount,
      numberCharCount,
      excludeChars,
      salt,
      pepper
    );
    const password = pg.next(excludeChars, salt, pepper);
    res.json({ pass: password }).status(200);
  }
);

app.listen(PORT || 3006, () => {
  console.log(`sample app running at port ${PORT}`);
});
