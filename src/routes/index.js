const express = require("express");
const authRoutes = require("./authRoutes");
const chatRoutes = require("./chatRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
