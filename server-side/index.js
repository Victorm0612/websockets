const express = require("express");

const app = express();
const httpServer = require("http").createServer(app);
// settings
app.set("port", process.env.PORT || 3000);

// start server
httpServer.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

// Default route to test running server.
app.get("/", (_, res) => {
  res.send("App is running");
});

const socketIO = require("socket.io");

//When server is ready, we pass to socketIO to start the communication channel
const io = socketIO(httpServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("addDoc", (data) => {
    io.sockets.emit("getData", data);
  });
});

module.exports = { io };
