const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controller/message.controller");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/send", authenticateToken, sendMessage);

module.exports = router;
