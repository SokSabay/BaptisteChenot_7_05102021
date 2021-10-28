const express = require("express");
const app = express();
// const Sequelize = require("sequelize");
require("./config/db");
const bodyParser = require("body-parser");

// _______________________________________________
//Logique CORS
 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(bodyParser.json()); 
app.get("/caca", (req, res) => {
  res.json({ message: "Bienvenue sur Groupomania" });
});
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const messageRoutes = require("./routes/message");

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
// app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;


// _______________________________________________
// Variables d'environement

// _______________________________________________
// Framework Express

// _______________________________________________
// Pacakge utilisé

// const path = require("path");
// const sauceRoutes = require("./routes/sauce");
// const userRoutes = require("./routes/user");
