const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: true,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// list of users mapped by ip
const users = {};

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("login", (user) => {
    const ip = socket.conn.remoteAddress;
    users[ip] = user;
    console.log("users updated", user);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
