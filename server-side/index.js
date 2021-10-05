const express = require("express");
const cors = require("cors");
const app = express();
const httpServer = require("http").createServer(app);

// Enable CORS
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

// Default route to test running server.
app.get("/", (_, res) => {
  res.send("App is running");
});

// Initialize server
httpServer.listen(3000, () => {
  console.log("SERVER RUNNING");
});

module.exports = { io };
