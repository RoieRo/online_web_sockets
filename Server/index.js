const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { sequelize } = require("./Models");
const codeBlockController = require("./Controllers/codeBlockController");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", codeBlockController);

// Set up socket.io for real-time communication
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const port = process.env.PORT || 3001;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database sync complete");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.on("listening", () => {
  console.log("Server is listening");
});
