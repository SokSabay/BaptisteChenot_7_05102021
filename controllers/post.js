// Import Product Model
const Post = require("../models/Post");

// Get all products
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
      where: { id: req.params.id }
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
    }



// Create a new product
exports.addPost = (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    attachment: req.body.attachment,
  })
    .then(() => {
      res.status(201).send({ message: "💾 Article enregistré ✔️" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "💥 Impossible d'enregistrer l'article 💥",
      });
    });
  // try {
  //   await Post.create({
  //     title: req.body.title,
  //     content: req.body.content,
  //     attachment: req.body.content
  //   });
  //   res.json({
  //     message: "Product Created",
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};

// Update product by id
exports.modifyPost = async (req, res) => {
  try {
    await Post.update(req.body, {
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

// Delete product by id
exports.deletePost = async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Product Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
