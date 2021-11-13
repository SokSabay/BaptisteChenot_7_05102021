const db = require("../models/");
const Message = db.messages;

exports.addMessage = (req, res, next) => {
  console.log("test");
  Message.create({
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.body.userId,
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

exports.getMessagePost = (req, res) => {
  Message.findAll({
    where: { postId: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.send({ message: "Pas de message pour ce post" });
      } else {
        res.send(data);
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Erreur server",
      });
    });
};

exports.modifyComment = async (req, res) => {
  try {
    await Message.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Product Updated",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.deleteMessage = (req, res, next) => {};
