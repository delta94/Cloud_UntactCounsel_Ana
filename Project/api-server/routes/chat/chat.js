const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const ChatDB = require("../database/chat");
const UserDB = require("../database/user");

const config = require("../../config/config");

var queue = [];

router.get("/", async (req, res, next) => {
  console.log("login");
  res.json({ statusCode: 200, msg: "hello" });
});

router.post("/queue-in", async (req, res, next) => {
  let who = await jwt.verify(req.body.token, config.JWT_SECRET);
  let manager, user, num, err;
  if (queue.length > 0) {
    if (queue[0].rank != who.rank) {
      if (who.rank == 1) {
        user = who.id;
        manager = queue[0].id;
      }
      if (who.rank == 99) {
        user = queue[0].id;
        manager = who.id;
      }
      /* make room */
      [err, num] = await ChatDB.createChat(user, manager);
      queue.splice(0, 1);
      console.log("hello");
    } else {
      if (queue.indexOf(who) != -1) queue.push(who);
      err = true;
    }
  } else {
    err = true;
    queue.push(who);
  }
  console.log(queue);
  if (!err) {
    res.json({ statusCode: 200, num });
  } else {
    res.json({ statusCode: 400, msg: "not yet" });
  }
});

module.exports = router;
