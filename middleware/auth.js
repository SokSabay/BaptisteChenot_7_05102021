require("dotenv").config();
const randomToken = process.env.TOKEN;
const jwt = require("jsonwebtoken");
const db = require("../models/");
const User = db.users;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const decodedToken = jwt.verify(token, randomToken);

    const userId = decodedToken.userId;

    if (!userId) {
      throw "Invalid user ID";
    } else {
      User.findOne({ where: { id: userId } }).then((user) => {
        req.user = user;
        next();
      });
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
