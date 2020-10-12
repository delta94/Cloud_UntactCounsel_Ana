var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ statusCode: 200, msg: "hello" });
});

module.exports = router;
