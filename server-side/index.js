const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});

const port = 3000;

io.on("connection", (socket) => {
  console.log("new connection made");

  socket.on("message-received", (data) => {
    io.sockets.emit("message-sent", data);
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});
