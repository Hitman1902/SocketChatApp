const { success, error } = require("../helpers/responsibleHelper");
const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;

    await Message.create({
      sender_id: senderId,
      receiver_id: receiverId,
      message,
    });

    success(res, "Message sent");
  } catch (err) {
    console.error("Send Message Error:", err);
    error(res, "Failed to send message");
  }
};
