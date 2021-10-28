const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

router.post("/", postCtrl.addPost);
router.get("/", postCtrl.getAllPost);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);

module.exports = router;
// router.post();
