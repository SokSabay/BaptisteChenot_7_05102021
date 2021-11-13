const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");

router.post("/", messageCtrl.addMessage);
router.get("/", messageCtrl.getAllMessage);
router.get("/post/:id", messageCtrl.getMessagePost);
router.delete("/:id", messageCtrl.deleteMessage);
router.put("/:id", messageCtrl.modifyComment);

module.exports = router;
