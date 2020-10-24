const express = require("express");
const router = express.Router();

const db = require("../database/user");

router.get("/", (req, res, next) => {
  console.log("signup");
  res.json({ statusCode: 200, msg: "hello" });
});

router.post("/", async (req, res, next) => {
  let [err, token, rank] = await db.createUser(
    req.body.username,
    req.body.password
  );
  if (!err) {
    res.json({ statusCode: 200, token, rank });
  } else {
    res.json({ statusCode: 400, token });
  }
});

module.exports = router;
