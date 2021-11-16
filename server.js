// _______________________________________________
// Framework Express
const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const messageRoutes = require("./routes/message");

require("dotenv").config();
require("./config/db");

const cors = require("cors");
const app = express();

// Utilisation de la logique CORS .env pour l'URL du client
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
