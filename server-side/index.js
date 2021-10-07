const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const allClients = [];
io.on("connection", (socket) => {
  console.log("new connection made");
  allClients.push(socket.id);

  socket.on("message-received", (data) => {
    socket.broadcast.emit("message-sent", data);
  });

  socket.on("disconnect", () => {
    console.log("OK!! Good bye! :) ", socket.id);
    let i = allClients.indexOf(socket);
    allClients.splice(i, 1);
    console.log("We have: ", ...allClients);
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});
