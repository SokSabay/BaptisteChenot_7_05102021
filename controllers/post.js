// Import Product Model
const fs = require("fs");
const db = require("../models/");

const Post = db.posts;


exports.addPost = async (req, res) => {
  console.log(req.body);
  Post.create({
    title: req.body.title,
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: req.body.id,
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
// exports.modifyPost = async (req, res) => {
//   try {
//     await Post.update(req.body, {
//       where: {
//         id: req.params.id,
//       },

//     });
//     res.json({
//       message: "Product Updated",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.modifyPost = (req, res) => {
  console.log(
    "📋  Modification de l'articles n°" + req.params.id + " demandée 📜"
  );
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
     
        data.title = req.body.title;
  
        data.imageUrl =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        data
          .save()
          .then(
            console.log("✏️  Article n°" + req.params.id + " modifié ! ✔️")
          );
        res.send(data);
      
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
      });
    });
};










// exports.modifyPost =  (req, res) => {
// Post.update(req.body, {
//   where: {
//     id: req.params.id,
//   },
//   // title: req.body.title,

//   // imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
// })
//   .then(console.log("Message modifié"))
//   .catch(() => {
//     res.status(500).send({
//       message:
//         "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
//     });
//   });
    
// };

// exports.modifySauce = (req, res, next) => {
//   const sauceObject = req.file ?
//   {
//     ...JSON.parse(req.body.sauce),
//     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   } : { ...req.body };
//   Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//   .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//   .catch(error => res.status(400).json({ error }));
// };

// Delete product by id
exports.deletePost = async (req, res) => {
 Post.findOne({
   where: {
     id: req.params.id,
   },
 })
   .then((data) => {
     console.log(data);
     // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
