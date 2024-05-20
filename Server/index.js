const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { sequelize } = require("./Models");
const codeBlockController = require("./Controllers/codeBlockController");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", codeBlockController);

// Store the mentor's socket ID
let mentorId = null;

// Socket.IO error handling
io.on("error", (error) => {
  console.error("Socket.io error:", error);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (room) => {
    socket.join(room);
  });

  if (mentorId === null) {
    mentorId = socket.id;
    socket.emit("mentorStatus", true); // Inform the client that they are the mentor
  } else {
    socket.emit("mentorStatus", false); // Inform the client that they are a student
  }

  socket.on("codeChange", (data) => {
    socket.to(data.id).emit("codeChange", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    if (mentorId === socket.id) {
      mentorId = null; // Reset mentorId if the mentor disconnects
    }
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
