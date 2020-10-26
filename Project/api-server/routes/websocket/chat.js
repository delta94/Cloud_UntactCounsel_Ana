/* token verify */
var config = require("../../config/config");
var jwt = require("jsonwebtoken");

/* socket */
var socket_io = require("socket.io");
var io = socket_io();

const ChatDB = require("../database/chat");
const UserDB = require("../database/user");

var socketApi = {};

/**
 *
 *   Chat
 *
 *  */
socketApi.io = io;

var room = [];
var manager = [];
var user = [];

//message author

io.on("connection", function (socket) {
  console.log("Global 로그인헀음");
  io.emit("chat-pull", "ww");

  socket.on("queue", async (info) => {
    let err, usersoc, mansoc, room_num;
    [err, info] = await parseToken(info, socket.id);
    if (err) io.to(info.sid).emit("err", err);
    else {
      if (info.rank == 1) {
        usersoc = info;
        if (manager.length > 0) {
          mansoc = manager[0];
          manager.splice(0, 1);
          [err, room_num] = await ChatDB.createChat(usersoc.sid, mansoc.sid);
          io.to(usersoc.sid).emit("queue_match", room_num);
          io.to(mansoc.sid).emit("queue_match", room_num);
        } else {
          user.push(info);
        }
      } else if (info.rank == 99) {
        mansoc = info;
        if (user.length > 0) {
          usersoc = user[0];
          user.splice(0, 1);
          [err, room_num] = await ChatDB.createChat(usersoc.sid, mansoc.sid);
          io.to(usersoc.sid).emit("queue_match", room_num);
          io.to(mansoc.sid).emit("queue_match", room_num);
        } else {
          manager.push(info);
        }
      } else {
        /* exception */
        console.log("queue err");
      }
    }
  });

  socket.on("chat_join", async (info) => {
    console.log("join");
    let err, room_num;
    room_num = JSON.parse(info).room_num;
    [err, info] = await parseToken(info);
    socket.join(room_num);
  });

  socket.on("chat_push", async (info) => {
    let err, msg, room_num;
    msg = JSON.parse(info).msg;
    room_num = JSON.parse(info).room_num;
    [err, info] = await parseToken(info, socket.id);
    if (err) io.to(info.sid).emit("err", err);
    else {
      console.log("push");
      await ChatDB.doChat(room_num, msg, info.id);
      io.to(room_num).emit("chat_pull", msg, info.username);
    }
  });

  // if (info) {
  //   await UserDB.updateSocket(info.id, socket.id);
  //   if (info.rank == 1) {
  //     if (manager.length > 0) {
  //       /* user lazy join */
  //       let room_num = await ChatDB.createChat(info.id, manager[0].id);
  //       let manager_socket = await UserDB.getSocket(manager[0].id);
  //       room.push({ room: room_num, user: [socket.id, manager_socket] });
  //       socket.join(room_num, () => {
  //         io.to(socket.id).emit("joinRoom", room_num);
  //         io.to(manager_socket).emit("joinRoom", room_num);
  //       });
  //       manager.splice(0, 1);
  //     } else {
  //       user.push(info);
  //     }
  //   } else if (info.rank == 99) {
  //     /* manager lazy join */
  //     if (user.length > 0) {
  //       let room_num = await ChatDB.createChat(user[0].id, info.id);
  //       let manager_socket = await UserDB.getSocket(manager[0].id);
  //       room.push({ room: room_num, user: [socket.id, manager_socket] });
  //       socket.join(room_num, () => {
  //         io.to(socket.id).emit("joinRoom", room_num);
  //         io.to(manager_socket).emit("joinRoom", room_num);
  //       });
  //     } else {
  //       manager.push(info);
  //     }
  //   }
  //   }
  // });

  /* disconnect */
  socket.on("disconnect", () => {
    console.log("GLOBAL 디스커넥트했음");
  });

  socket.on("leaveRoom", (num, name) => {
    socket.leave(room[num], () => {
      console.log(name + " leave a " + room[num]);
      io.to(room[num]).emit("leaveRoom", name);
    });
  });

  // socket.on("joinRoom", (num, name) => {
  //   socket.join(room[num], () => {
  //     console.log(name + " join a " + room[num]);
  //     io.to(room[num]).emit("joinRoom", num, name);
  //   });

  // socket.on("chat_push", (info, num, msg) => {
  //   info = parseToken(info);
  //   io.to(num).emit("chat_pull", msg);
  // });
});

module.exports = socketApi;

async function parseToken(info, id) {
  try {
    let obj = jwt.verify(JSON.parse(info).token, config.JWT_SECRET);
    obj.sid = id;
    return [null, obj];
  } catch (e) {
    console.log(e);
    return [true, id];
  }
}
