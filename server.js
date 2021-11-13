const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const messageRoutes = require("./routes/message");
require("dotenv").config();
require("./config/db");
const requireAuth = require("./middleware/auth");

const cors = require("cors");
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));



app.use(bodyParser.json());


app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;

// _______________________________________________
// Logique CORS

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Auth-Token"
//   );
//   next();
// });
