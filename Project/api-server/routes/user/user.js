const express = require("express");
const router = express.Router();

router.get("*", (req, res, next) => {
  console.log("user");
  res.json({ statusCode: 200, msg: "hello" });
});

module.exports = router;
