import { io } from "../index";

// For key value pairs (username - id)
const users = new Map();


// Broadcast emits an action for all connected clients.
io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  addUser(username, socket.id);

// List of connected users
  socket.broadcast.emit("user-list", [...users.keys()]);
  socket.emit("user-list", [...users.keys()]);

// Emits a message for all clients connected 
  socket.on("message", (message) => socket.broadcast.emit("message-broadcast", {message: message, username: username}));

// User leaves
  socket.on("disconnect", () => deleteUser(username, socket.id));
});

// Adds an user to the map. Set is used to make sure to not repeat ids.
//Its possible to have two people with the same name but their id will be different
const addUser = (username, id) => {
  !users.has(username) ? users.set(username, new Set(id)) : users.get(username).add(id);
};

// If user exists and theres no ids, will be deleted.
const deleteUser = (username) => {
  if (users.has(username) && users.get(username).size === 0) {
    users.delete(username);
  }
};
