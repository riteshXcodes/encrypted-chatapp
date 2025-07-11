const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/message");
const onlineUsers = new Map();
const path = require("path");

require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.get("/api/messages", async (req, res) => {
  const { sender, receiver } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender } 
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(" Error in fetching messages:", err);
    res.status(500).json({ error: "Failed to load messages" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(" New client connected:", socket.id);

  socket.on("register_user", (username) => {
    onlineUsers.set(username, socket.id); // ✅ Save which user is using which socket
    io.emit("online_users", Array.from(onlineUsers.keys()));
    console.log("🟢 Registered:", username, "→", socket.id);
  });

  socket.on("send_message", async (data) => {
    console.log("Message received:", data);
    try {
      const newMessage = new Message({
        message: data.encryptedMessage,
        sender: data.sender,
        receiver: data.receiver,
        time: data.time,
        encryptedAESKey: data.encryptedAESKey,
        iv: data.iv,
      });

      await newMessage.save();

      if (data.sender === data.receiver) return;

      const receiverSocketId = onlineUsers.get(data.receiver);
      console.log("🔄 Message data:", data);
      console.log("📡 Receiver socket:", onlineUsers.get(data.receiver));

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", {
          sender: data.sender,
          encryptedMessage: data.encryptedMessage,
          time: data.time,
          encryptedAESKey: data.encryptedAESKey,
          iv: data.iv,
          isLocked: data.isLocked,
        });
      }
    } catch (err) {
      console.log("Error saving message:", err);
    }
  });

  socket.on("typing", ({ sender, receiver }) => {
  const receiverSocketId = onlineUsers.get(receiver);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("show_typing", sender);
  }
});

socket.on("message_read", ({ sender, time }) => {
  const senderSocketId = onlineUsers.get(sender);
  if (senderSocketId) {
    io.to(senderSocketId).emit("mark_as_read", time); 
  }
});


  socket.on("disconnect", () => {
    for (const [username, id] of onlineUsers.entries()) {
      if (id === socket.id) {
        onlineUsers.delete(username);
        break;
      }
    }
    io.emit("online_users", Array.from(onlineUsers.keys()));
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
