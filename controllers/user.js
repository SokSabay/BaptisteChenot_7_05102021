require("dotenv").config();
const randomToken = process.env.TOKEN;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models/");
const User = db.users;



exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        username: req.body.username,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })

    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          // res.cookie("jwt", jwt.sign({ userId: user.id }, randomToken, {
          //     expiresIn: "24h",
          //   }));
          res.status(200).json({
            userId: user.id,
            email: user.email,
            username: user.username,
            token: jwt.sign({ userId: user.id }, randomToken, {
              expiresIn: "24h",
            }),
            error: "Bien ouej'! Tu es maintenant connecté",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
