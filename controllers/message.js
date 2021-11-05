const db = require("../models/");
const Message = db.messages;

exports.addMessage = (req, res, next) => {
  console.log("test");
  Message.create({
    comment: req.body.comment,
  })
    .then(() => {
      res.status(201).send({ message: "💾 Message enregistré ✔️" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "💥 Impossible d'enregistrer le message 💥",
      });
    });
};
exports.getAllMessage = (req, res, next) => {
  Message.findAll()
    .then((data) => {
      res.send(data);
    })
    .then(console.log("📡 📜  Liste envoyée ✔️"))
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
      });
    });
};
exports.deleteMessage = (req, res, next) => {};
