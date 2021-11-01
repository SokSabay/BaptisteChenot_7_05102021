// Import Product Model

const db = require("../models/");


const Post = db.posts;
const User = db.users;
// Get all products

exports.addPost = (req, res) => {
 
  Post.create({
    title: req.body.title,
    content: req.body.content,
    attachment: req.body.attachment,
    // userId : req.User.id,
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

// Create a new product

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

// Permet de liker disliker un post
exports.like = (req, res, next) => {
  if (req.body.like === 1) {
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then((post) => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then((post) => res.status(200).json({ message: "Dislike ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.usersLiked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then((post) => {
              res.status(200).json({ message: "Like supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then((post) => {
              res.status(200).json({ message: "Dislike supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
