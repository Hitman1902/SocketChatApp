const Message = require("../models/message.model");

function socketSetup(io) {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, message } = data;

        await Message.create({
          sender_id: senderId,
          receiver_id: receiverId,
          message,
        });

        io.emit("receive_message", data);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = socketSetup;
