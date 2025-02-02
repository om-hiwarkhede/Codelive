const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { ACTIONS } = require("./src/assets/Actions");

const server = http.createServer(app);
const UserSocketMap = {};
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function getAllConnectedClient(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: UserSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log(`A new connection is connected with the ID ${socket.id}`);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    UserSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClient(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    io.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: UserSocketMap[socket.id],
      });
    });
    delete UserSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
