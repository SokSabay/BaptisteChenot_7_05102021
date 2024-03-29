// Import Product Model
const fs = require("fs");
const db = require("../models/");

const Post = db.posts;

exports.addPost = async (req, res) => {
  console.log(req.body);
  Post.create({
    title: req.body.title,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    userId: req.user.id,
  })
    .then(() => {
      res.status(201).send({ message: "💾 Article enregistré ✔️" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "💥 Impossible d'enregistrer l'article 💥",
      });
    });
};

exports.getAllPost = (req, res) => {
  console.log("📋  Liste des articles demandée 📜");
  Post.findAll()
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

// Get product by id
exports.getOnePost = (req, res) => {
  Post.findAll({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.send({ message: "⚠️ Article(s) inexistant(s) ⚠️" });
      } else {
        res.send(data);
      }
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
      });
    });
};

exports.modifyPost = (req, res) => {
  console.log(
    "📋  Modification de l'articles n°" + req.params.id + " demandée 📜"
  );
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
      data.title = req.body.title;
      if (req.file) {
        data.imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }

      data
        .save()
        .then(console.log("✏️  Article n°" + req.params.id + " modifié ! ✔️"));
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
      });
    });
};

// Delete product by id
exports.deletePost = async (req, res) => {
  const condition = {
    id: req.params.id,
  };

  if (!req.user.isAdmin) {
    condition.userId = req.user.id;
  }
  Post.findOne({
    where:condition,
  })
    .then((data) => {
      console.log(data);
      const oldImg = "./images/" + data.imageUrl.split("/images/")[1];
      fs.unlinkSync(oldImg);
      data.destroy().then(() => {
        console.log("💣  Article supprimé ! ✔️");
        res.send({ message: "💣  Article supprimé ! ✔️" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
