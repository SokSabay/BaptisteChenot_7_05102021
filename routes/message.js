const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middleware/auth");

router.post("/", auth, messageCtrl.addMessage);
router.get("/", auth, messageCtrl.getAllMessage);
router.get("/post/:id", auth, messageCtrl.getMessagePost);
router.delete("/:id", auth, messageCtrl.deleteComment);
router.put("/:id", auth, messageCtrl.modifyComment);

module.exports = router;
