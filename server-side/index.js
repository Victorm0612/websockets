const express = require("express");

const app = express();
const httpServer = require("http").createServer(app);
// settings
app.set("port", process.env.PORT || 3000);

//When server is ready, we pass to socketIO to start the communication channel
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

// Default route to test running server.
app.get("/", (_, res) => {
  res.send("App is running");
});

// For key value pairs (username - id)
const users = new Map();
// Broadcast emits an action for all connected clients.
io.on("connection", (socket) => {
  let username = socket.handshake.query.username;
  addUser(username, socket.id);

  socket.broadcast.emit("user-list", [...users.keys()]);
  socket.emit("user-list", [...users.keys()]);

  socket.on("message", (msg) => {
    socket.broadcast.emit("message-broadcast", {
      message: msg,
      username: username,
    });
  });

  socket.on("disconnect", () => {
    deleteUser(username);
  });
});

// Adds an user to the map. Set is used to make sure to not repeat ids.
//Its possible to have two people with the same name but their id will be different
const addUser = (username, id) => {
  !users.has(username)
    ? users.set(username, new Set(id))
    : users.get(username).add(id);
};

// If user exists and theres no ids, will be deleted.
const deleteUser = (username) => {
  if (users.has(username) && users.get(username).size === 0) {
    users.delete(username);
  }
};

// start server
httpServer.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
