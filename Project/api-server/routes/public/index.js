const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("login");
  res.json({ statusCode: 200, msg: "hello" });
});

module.exports = router;
