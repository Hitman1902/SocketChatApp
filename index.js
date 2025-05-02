const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const helmet = require("helmet");
const globalRoutes = require("./src/routes/index");
const sequelize = require("./src/config/db");
const socketSetup = require("./src/socket/socket");

dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
  cors: { origin: "*" },
});
app.use(helmet());
app.use(express.json());

app.use("/api", globalRoutes);

socketSetup(io);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected and models synced");
    server.listen(process.env.DB_PORT || 5000, () => {
      console.log(`Server running on port ${process.env.DB_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
