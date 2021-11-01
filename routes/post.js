const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post");

router.post("/", auth, postCtrl.addPost);
router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
// router.post();
