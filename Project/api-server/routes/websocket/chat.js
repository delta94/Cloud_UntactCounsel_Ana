/* token verify */
var config = require("../../config/config");
var jwt = require("jsonwebtoken");

/* socket */
var socket_io = require("socket.io");
var io = socket_io();

var socketApi = {};

/**
 *
 *   Chat
 *
 *  */
socketApi.io = io;

var room = [1, 2];
var manager = [];
var user = [];

//message author

io.on("connection", function (socket) {
  console.log("Global 로그인헀음");
  io.emit("chat-pull", "ww");
  socket.on("queue", (token) => {
    console.log("asd");
    console.log(token);
    // console.log(parseToken(token));
  });

  /* disconnect */
  socket.on("disconnect", function () {
    console.log("GLOBAL 디스커넥트했음");
  });

  socket.on("leaveRoom", (num, name) => {
    socket.leave(room[num], () => {
      console.log(name + " leave a " + room[num]);
      io.to(room[num]).emit("leaveRoom", num, name);
    });
  });

  socket.on("joinRoom", (num, name) => {
    socket.join(room[num], () => {
      console.log(name + " join a " + room[num]);
      io.to(room[num]).emit("joinRoom", num, name);
    });
  });

  socket.on("chat message", (num, name, msg) => {
    a = num;
    io.to(room[a]).emit("chat message", name, msg);
  });
});

module.exports = socketApi;

function parseToken(parse) {
  try {
    return jwt.verify(config.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return 0;
  }
}
